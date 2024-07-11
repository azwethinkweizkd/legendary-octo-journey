import { Checkbox, FormControlLabel, FormGroup, Skeleton } from "@mui/material";
import { useState } from "react";

interface Props {
	items: string[];
	checked?: string[];
	onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: Props) {
	const [checkedItems, setCheckedItems] = useState(checked || []);

	function handleChecked(value: string) {
		const currentIdx = checkedItems.findIndex((item) => item === value);
		let newChecked: string[] = [];
		if (currentIdx === -1) newChecked = [...checkedItems, value];
		else newChecked = checkedItems.filter((item) => item !== value);
		setCheckedItems(newChecked);
		onChange(newChecked);
	}

	return (
		<>
			{!items ? (
				<Skeleton variant="rounded" animation="wave" width={210} height={60} />
			) : (
				<FormGroup>
					{items?.map((item) => (
						<FormControlLabel
							control={
								<Checkbox
									checked={checkedItems.indexOf(item) !== -1}
									onClick={() => handleChecked(item)}
								/>
							}
							label={item}
							key={item}
						/>
					))}
				</FormGroup>
			)}
		</>
	);
}
