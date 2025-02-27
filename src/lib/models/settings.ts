export interface Setting {
	id: string;
	label: string;
	description: string;
	type: 'boolean' | 'number' | 'string';
	default: boolean | number | string;
}

export type Settings = {
	[key: string]: boolean | number | string;
};
