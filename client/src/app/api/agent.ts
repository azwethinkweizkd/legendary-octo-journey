import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../routes/routes";
import { PaginatedResponse } from "../models/pagination";

import "react-toastify/dist/ReactToastify.css";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (res: AxiosResponse) => res.data;

axios.interceptors.response.use(
	async (res) => {
		if (import.meta.env.DEV) await sleep();
		const pagination = res.headers["pagination"];
		if (pagination) {
			res.data = new PaginatedResponse(res.data, JSON.parse(pagination));
			return res;
		}
		return res;
	},
	(err: AxiosError) => {
		const { data, status } = err.response as AxiosResponse;
		switch (status) {
			case 400:
				if (data.errors) {
					const modelStateErrors: string[] = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modelStateErrors.push(data.errors[key]);
						}
					}
					throw modelStateErrors.flat();
				}
				toast.error(data.title);
				break;
			case 401:
				toast.error(data.title);
				break;
			case 403:
				toast.error("You are not allowed to do that!");
				break;
			case 500:
				router.navigate("/server-error", { state: { error: data } });
				break;
			default:
				break;
		}
		return Promise.reject(err.response);
	}
);

const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body: object) => axios.post(url, body).then(responseBody),
	put: (url: string, body: object) => axios.put(url, body).then(responseBody),
	delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
	list: () => requests.get("products"),
	details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
	get400Error: () => requests.get("buggy/bad-request"),
	get401Error: () => requests.get("buggy/unauthorized"),
	get404Error: () => requests.get("buggy/not-found"),
	get500Error: () => requests.get("buggy/server-error"),
	getValidationError: () => requests.get("buggy/validation-error"),
};

const agent = {
	Catalog,
	TestErrors,
};

export default agent;
