import { Modal } from '@components/modal';
import './style.scss';
import { Button } from '@ui/button';
import { QuestionIcon } from '@icons/QuestionIcon';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cancelOrder } from '@api/services/tickets';
import { useTypedSelector } from '@store/hooks/baseHooks';

interface ReturnTicketModalProps {
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	orderId: string;
}

export const ReturnTicketModal: React.FC<ReturnTicketModalProps> = ({ setActive, orderId }) => {
	const queryClient = useQueryClient();
	const token = useTypedSelector((state) => state.user.token);
	const deleteTicket = useQuery({ queryKey: ['cancelOrder'], queryFn: async () => cancelOrder(token, orderId) });
	const onCancelClick = (): void => {
		deleteTicket.refetch();
		queryClient.refetchQueries({ queryKey: ['tickets'] });
		setActive(false);
	};
	return (
		<Modal>
			<div className="return-ticket-modal">
				<QuestionIcon />
				<p className="return-ticket-modal__text">Вернуть билет</p>
				<Button
					style={{ backgroundColor: '#fff', color: '#344051', border: '1px #CED2DA solid' }}
					onClick={onCancelClick}
				>
					Вернуть билет
				</Button>
				<Button
					onClick={() => {
						setActive(false);
					}}
				>
					Отменить
				</Button>
			</div>
		</Modal>
	);
};
