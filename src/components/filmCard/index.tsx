import { CompactFilmCard, type CompactFilmProps } from './compactFilmCard';
import { StandartFilmCard, type StandartFilmCardProps } from './standartFilmCard';
import './style.scss';

interface FilmCardProps {
	variant: 'compact' | 'standart';
	data: StandartFilmCardProps | CompactFilmProps;
}

export const FilmCard: React.FC<FilmCardProps> = ({ variant, data }) => {
	return <>{variant === 'compact' ? <CompactFilmCard {...data} /> : <StandartFilmCard subtitle="" {...data} />}</>;
};
