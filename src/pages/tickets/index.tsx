import { PageLayout } from '@components/pageLayout';
import './style.scss';
import { TicketCard } from '@components/ticketCard';
import { useTypedSelector } from '@store/hooks/baseHooks';
import { useQuery } from '@tanstack/react-query';
import { getAllTickets } from '@api/services/tickets';
import { ReturnTicketModal } from '@components/returnTicketModal';
import { useState } from 'react';

export const TicketsPage: React.FC = () => {
	const token = useTypedSelector((state) => state.user.token);
	const [modal, setModal] = useState(false);
	const [orderId, setOrderId] = useState('');
	const tickets = useQuery({ queryKey: ['tickets'], queryFn: async () => getAllTickets(token), enabled: true });
	return (
		<PageLayout>
			<div className="tickets-page">
				<h1 className="tickets-page__title">Билеты</h1>
				<div className="tickets-page__tickets-container">
					{tickets.isSuccess
						? tickets.data.data.orders.map((order) =>
								order.tickets.map((ticket, index) => (
									<TicketCard
										key={index}
										date={ticket.seance.date}
										time={ticket.seance.time}
										filmId={ticket.filmId}
										column={ticket.column}
										row={ticket.row}
										code="8888"
										status={order.status}
										onClick={() => {
											setModal(true);
											setOrderId(order.orderNumber.toString());
										}}
									/>
								)),
							)
						: ''}
				</div>
				{modal ? <ReturnTicketModal setActive={setModal} orderId={orderId} /> : ''}
			</div>
		</PageLayout>
	);
};
