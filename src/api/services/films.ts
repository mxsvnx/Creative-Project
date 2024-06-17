import { axiosClient } from '../client';

export interface Film {
	id: number;
	img: string;
	genres: string[];
	country: { name: string };
	releaseDate: string;
	name: string;
	description: string;
	userRatings: { kinopoisk: number };
}

interface GetAllFilmsDto {
	data: {
		success: boolean;
		reason: string;
		films: Film[];
	};
}

export enum PlaceType {
	BLOCKED = 'BLOCKED',
	ECONOM = 'ECONOM',
	COMFORT = 'COMFORT',
}

export interface Place {
	index: number;
	price: number;
	type: PlaceType;
}

export interface Seance {
	time: string;
	hall: {
		name: string;
		places: Place[][];
	};
}

export interface Schedule {
	date: string;
	seances: Seance[];
}

interface GetFilmScheduleById {
	schedules: Schedule[];
}

export const getAllFilms = async (): Promise<GetAllFilmsDto> => {
	return axiosClient.get('/cinema/today');
};

export const getFilmById = async (filmId: number): Promise<{ data: { film: Film } }> => {
	return axiosClient.get(`/cinema/film/${filmId}`);
};

export const getFilmScheduleById = async (filmId: number): Promise<{ data: GetFilmScheduleById }> => {
	return axiosClient.get(`/cinema/film/${filmId}/schedule`);
};
