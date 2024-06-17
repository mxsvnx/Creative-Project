import { useState } from 'react';
import './style.scss';

export interface Tab {
	title: string;
	content: React.ReactNode;
}

interface TabsProps {
	data: Tab[];
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Tabs: React.FC<TabsProps> = ({ data, onClick }) => {
	const [active, setActive] = useState(0);
	return (
		<>
			<div className="tabs">
				{data.map((e, index) => (
					<button
						key={index}
						onClick={(e) => {
							onClick(e);
							setActive(index);
						}}
						className={`tab ${active === index ? '--active' : ''}`}
					>
						{e.title}
					</button>
				))}
			</div>
			<div className="tab-content">{data[active].content}</div>
		</>
	);
};
