import type { ComponentPropsWithoutRef } from 'react';
import './style.scss';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button {...props} className="button">
			{props.children}
		</button>
	);
};
