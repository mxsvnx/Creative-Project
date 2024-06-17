import { Button } from '@ui/button';
import './style.scss';
import { useQuery } from '@tanstack/react-query';
import { getFilmById } from '@api/services/films';

interface TicketProps {
	date: string;
	time: string;
	filmId: string;
	column: number;
	row: number;
	status: string;
	code: string;
	onClick: () => void;
}

export const TicketCard: React.FC<TicketProps> = ({ date, time, filmId, code, column, row, status, onClick }) => {
	const film = useQuery({
		queryKey: ['film', filmId],
		queryFn: async () => getFilmById(parseInt(filmId)),
		enabled: true,
	});
	return (
		<div className="ticket-card">
			<div className="ticket-card__time-info">
				<p className="time-info__date">{date}</p>
				<p className="time-info__time">{time}</p>
			</div>
			<div className="ticket-card__film-info">
				{film.isSuccess ? <p className="film-info__film-name">{film.data?.data.film.name}</p> : ''}
				<p className="film-info__places">
					{row} ряд, {column}
				</p>
			</div>
			<div className="ticket-card__ticket-info">
				<span className="ticket-info__pay-status">{status}</span>
				<p className="ticket-info__code">{code}</p>
			</div>
			<Button style={{ backgroundColor: '#fff', color: '#344051', border: '1px #CED2DA solid' }} onClick={onClick}>
				Вернуть билет
			</Button>
		</div>
	);
};
