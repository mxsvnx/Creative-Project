import { formatRating } from '../../utils/formatRating';
import './style.scss';

interface StarRateProps {
	rating: number;
}

export const StarRate: React.FC<StarRateProps> = ({ rating }) => {
	const stars = formatRating(rating);

	return (
		<div className="star-rate">
			{stars.map((e, index) => (
				<span key={index} className={`star-rate__star ${e ? 'checked' : ''}`}></span>
			))}
		</div>
	);
};
