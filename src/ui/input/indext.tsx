import type { ComponentProps } from 'react';
import './style.scss';

interface InputProps extends ComponentProps<'input'> {}

export const Input: React.FC<InputProps> = (props) => {
	return <input type="text" className="input" {...props} />;
};
