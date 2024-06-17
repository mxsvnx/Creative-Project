import { StarRate } from '@components/starRate';
import { BACKEND_URL } from '@api/client';
import './style.scss';

export interface StandartFilmCardProps {
	coverImageUrl: string;
	genre: string;
	year: string;
	title: string;
	rating: number;
	subtitle: string;
	onClick?: () => void;
}

export const StandartFilmCard: React.FC<StandartFilmCardProps> = ({
	coverImageUrl,
	genre,
	year,
	title,
	rating,
	subtitle,
}) => {
	return (
		<div className="film-card--standart">
			<div
				className="film-card__cover--standart"
				style={{
					backgroundImage: `url("${BACKEND_URL}${coverImageUrl}")`,
				}}
			>
				<div className="cover__info">
					<p className="cover__genre">{genre}</p>
					<p className="cover__location">{year}</p>
				</div>
			</div>
			<div className="film-card__info">
				<h2 className="film-card__title--standart">{title}</h2>
				<StarRate rating={rating} />
				<p className="film-card__rating">Kinopoisk - {rating}</p>
				<p className="film-card__subtitle">{subtitle}</p>
			</div>
		</div>
	);
};
