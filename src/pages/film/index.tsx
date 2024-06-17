import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { TicketSummary } from '@components/ticketSummary';
import { FilmCard } from '@components/filmCard';
import { PageLayout } from '@components/pageLayout';
import { type Tab, Tabs } from '@components/tabs';

import { getFilmById, getFilmScheduleById } from '@api/services/films';

import { useTabsFromSchedule } from '@hooks/useTabsFromSchedule';

import { useTypedDispatch } from '@store/hooks/baseHooks';
import { clearPlaces, setDate, setTime } from '@store/tickets/ticketsSlice';

import './style.scss';

export const FilmPage: React.FC = () => {
	const { filmId } = useParams();
	const [tabsDate, setTabsDate] = useState<Tab[]>({});
	const dispatchTicket = useTypedDispatch();

	const film = useQuery({
		queryKey: ['film'],
		queryFn: async () => getFilmById(filmId),
		enabled: true,
	});
	const schedule = useQuery({
		queryKey: ['shedule'],
		queryFn: async () => getFilmScheduleById(filmId),
		enabled: true,
	});

	const onTabClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
		dispatchTicket(setDate(e.currentTarget.innerText));
		dispatchTicket(setTime(''));
		dispatchTicket(clearPlaces());
	};

	useEffect(() => {
		if (schedule.isSuccess) {
			setTabsDate(useTabsFromSchedule(schedule.data?.data.schedules, dispatchTicket));
		}
	}, [schedule.isSuccess]);

	return (
		<PageLayout>
			{film.isSuccess ? (
				<FilmCard
					data={{
						coverImageUrl: film.data.data.film.img,
						genre: film.data.data.film.genres[0],
						year: film.data.data.film.releaseDate,
						title: film.data.data.film.name,
						rating: film.data.data.film.userRatings.kinopoisk,
						subtitle: film.data.data.film.description,
					}}
					variant="standart"
				/>
			) : (
				''
			)}
			<div className="film__schedule">
				{schedule.isSuccess && tabsDate.length > 0 ? (
					<div className="schedule">
						<h1 className="shedule__title">Расписание</h1>
						<Tabs onClick={onTabClick} data={tabsDate} />
					</div>
				) : (
					''
				)}
				<TicketSummary />
			</div>
		</PageLayout>
	);
};
