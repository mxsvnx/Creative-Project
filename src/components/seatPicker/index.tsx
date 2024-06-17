import { type PlaceType, type Place } from '@api/services/films';
import './style.scss';
import { Seat } from '@components/seat';

interface TicketPickerProps {
	data: Place[][];
	onClick: (indext: number, type: PlaceType, price: number) => void;
}

export const SeatPicker: React.FC<TicketPickerProps> = ({ data, onClick }) => {
	return (
		<div className="ticket-picker">
			<div className="ticket-picker__screen">
				<p className="screen__text">Экран</p>
				<div className="screen__line"></div>
			</div>
			<div className="ticket-picker__seats">
				<p className="seats__row-text">Ряд</p>
				{data.map((row, index) => (
					<div key={index} className="seats__row">
						<span className="seats__row-number">{index}</span>
						{row.map((col, index) => (
							<Seat
								key={index}
								index={col.index}
								type={col.type}
								price={col.price}
								onClick={() => {
									onClick(col.index, col.type, col.price);
								}}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
