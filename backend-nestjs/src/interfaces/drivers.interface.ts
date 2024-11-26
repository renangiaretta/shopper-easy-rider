import { IReview } from './reviews.interface';

export interface IDriver {
	id: number;
	name: string;
	description: string;
	vehicle: string;
	rideFare: number;
	min_distance: number;
	review: IReview;
}
