import type { Tab } from '@components/tabs';
import { SeatPicker } from '@components/seatPicker';
import { type Hall } from '@components/timePicker';
import { TimePicker } from '@components/timePicker';

import { type PlaceType, type Schedule } from '@api/services/films';

import { type UnknownAction, type ThunkDispatch } from '@reduxjs/toolkit';
import { type TicketsState, setTime, setPlaces, clearPlaces, setHall } from '@store/tickets/ticketsSlice';

export const useTabsFromSchedule = (
	schedule: Schedule[],
	dispatchTickets: ThunkDispatch<TicketsState, undefined, UnknownAction>,
): Tab[] => {
	const tabsData: Tab[] = [];

	const onTimeClick = (e: React.MouseEvent<HTMLButtonElement>, hall: string): void => {
		dispatchTickets(setTime(e.currentTarget.innerText));
		dispatchTickets(setHall(hall));
		dispatchTickets(clearPlaces());
	};

	const onSeatClick = (index: number, type: PlaceType, price: number): void => {
		dispatchTickets(
			setPlaces({
				index,
				type,
				price,
			}),
		);
	};

	schedule.forEach((e) => {
		const halls = new Set<string>();
		const content: Hall[] = [];

		e.seances.forEach((hall) => {
			halls.add(hall.hall.name);
		});

		let counter = 0;

		halls.forEach((hall) => {
			content.push({ name: hall, seances: [] });
			e.seances.forEach((seance) => {
				let seatCounter = 1;

				if (seance.hall.name === hall) {
					seance.hall.places.forEach((e) => {
						e.forEach((seat) => {
							seat.index = seatCounter;
							seatCounter++;
						});
					});

					content[counter].seances.push({
						time: seance.time,
						content: (
							<>
								<h1
									style={{
										marginTop: '48px',
										marginBottom: '20px',
									}}
								>
									Выбор места
								</h1>
								<SeatPicker onClick={onSeatClick} data={seance.hall.places} />
							</>
						),
					});
				}
			});
			counter++;
		});

		tabsData.push({
			title: e.date,
			content: <TimePicker onClick={onTimeClick} data={content} />,
		});
	});

	return tabsData;
};
