import { Button } from '@ui/button';
import { useTypedSelector } from '@store/hooks/baseHooks';
import './style.scss';

export const TicketSummary: React.FC = () => {
	const tickets = useTypedSelector((state) => state.tickets);
	return (
		<div className="ticket-summary">
			<div className="ticket-summary__order-info">
				<p className="order-info__title">Зал</p>
				<p className="order-info__subtitle">{tickets.hall}</p>
			</div>
			<div className="ticket-summary__order-info">
				<p className="order-info__title">Дата и время</p>
				<p className="order-info__subtitle">
					{tickets.date} {tickets.time}
				</p>
			</div>
			<div className="ticket-summary__order-info">
				<p className="order-info__title">Места</p>
				<p className="order-info__subtitle">{tickets.places.map((e) => e.index + ' ')}</p>
			</div>
			<div className="ticket-summary__order-info">
				<p className="order-info__price">
					Сумма:
					{tickets.places.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)} ₽
				</p>
			</div>
			<div className="ticket-summary__order-info">
				<Button>Купить</Button>
			</div>
		</div>
	);
};
