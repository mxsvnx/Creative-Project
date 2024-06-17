import { Header } from '@components/header';
import './style.scss';

interface PageLayoutProps {
	children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<div className="page-content">{children}</div>
		</>
	);
};
