import { StarRate } from '@components/starRate';
import { Button } from '@ui/button/index';
import { BACKEND_URL } from '@api/client';
import './style.scss';

export interface CompactFilmProps {
	coverImageUrl: string;
	genre: string;
	year: string;
	title: string;
	rating: number;
	onClick?: () => void;
}

export const CompactFilmCard: React.FC<CompactFilmProps> = ({ coverImageUrl, genre, year, title, rating, onClick }) => {
	return (
		<div className="film-card--compact">
			<div
				className="film-card__cover--compact"
				style={{
					backgroundImage: `url("${BACKEND_URL}${coverImageUrl}")`,
				}}
			>
				<div className="cover__info">
					<p className="cover__genre">{genre}</p>
					<p className="cover__location">{year}</p>
				</div>
			</div>
			<h2 className="film-card__title--compact">{title}</h2>
			<StarRate rating={rating} />
			<p className="film-card__rating--compact">Kinopoisk - {rating}</p>
			<Button onClick={onClick}>Подробнее</Button>
		</div>
	);
};
