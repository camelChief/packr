export enum ActionType {
	Button,
	Link
}

export interface Action {
	type: ActionType;
	reference: string;
	icon: any;
	class: string;
	validIf?: string;
}

export interface PageData {
	title: string;
	breadcrumbs?: string[];
	useBackButton?: boolean;
	backButtonUrl?: string;
	backButtonIcon?: any;
	actions?: Action[];
}
