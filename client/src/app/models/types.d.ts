export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	pictureId: string;
	type: string;
	brand: string;
	qntyInStock: number;
}

export interface Basket {
	id: number;
	buyerId: string;
	items: Item[];
}

export interface BasketItem {
	productId: number;
	name: string;
	price: number;
	pictureId: string;
	brand: string;
	type: string;
	quantity: number;
}
