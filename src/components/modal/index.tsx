import './style.scss';

interface ModalProps {
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
	return (
		<div className="modal-bg">
			<div className="modal">{children}</div>
		</div>
	);
};
