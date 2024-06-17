import { useEffect, useState } from 'react';
import { type PlaceType } from '@api/services/films';
import { useTypedSelector } from '@store/hooks/baseHooks';
import './style.scss';

interface SeatProps {
	index: number;
	type: PlaceType;
	price: number;
	onClick: (indext: number, type: PlaceType, price: number) => void;
}

export const Seat: React.FC<SeatProps> = ({ index, onClick, type, price }) => {
	const [active, setActive] = useState(false);
	const ticket = useTypedSelector((state) => state.tickets);

	useEffect(() => {
		setActive(false);
	}, [ticket.date, ticket.hall, ticket.time]);
	return (
		<span
			key={index}
			onClick={() => {
				if (type !== 'BLOCKED') {
					onClick(index, type, price);
					setActive(!active);
				}
			}}
			className={`seats__seat --${type} ${active ? '--active-seat' : ''}`}
		></span>
	);
};
