import { useState } from 'react';
import './style.scss';

interface Seance {
	time: string;
	content: React.ReactNode;
}

export interface Hall {
	name: string;
	seances: Seance[];
}

interface TimePickerProps {
	data: Hall[];
	onClick: (e: React.MouseEvent<HTMLButtonElement>, hall: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ data, onClick }) => {
	const [active, setActive] = useState<{
		hallIndex: number;
		index: number;
	}>({ hallIndex: 0, index: 0 });
	return (
		<>
			<div className="time-picker">
				{data.map((hall, hallIndex) => (
					<>
						<p key={hall.name} className="time-picker__name">
							{hall.name}
						</p>
						<div className="time-picker__seances">
							{hall.seances.map((seance, index) => (
								<button
									key={index}
									onClick={(e) => {
										onClick(e, hall.name);
										setActive({ hallIndex, index });
									}}
									className={`seance__time-button ${active.index === index && active.hallIndex === hallIndex ? '--active-time' : ''}`}
								>
									{seance.time}
								</button>
							))}
						</div>
					</>
				))}
			</div>
			<div className="time-picker__content">{data[active.hallIndex].seances[active.index].content}</div>
		</>
	);
};
