import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { type Film, getAllFilms } from '@api/services/films';

import { PageLayout } from '@components/pageLayout';
import { FilmCard } from '@components/filmCard';

import './style.scss';

export const AfishaPage: React.FC = () => {
	const films = useQuery({
		queryKey: ['films'],
		queryFn: getAllFilms,
		enabled: true,
	});
	const navigate = useNavigate();
	return (
		<PageLayout>
			<div className="afisha">
				<h1 className="afisha__header-text">Афиша</h1>
				<div className="afisha__card-container">
					{films.isSuccess
						? films.data.data.films.map((film: Film) => (
								<FilmCard
									key={film.id}
									variant="compact"
									data={{
										coverImageUrl: film.img,
										genre: film.genres[0],
										year: film.releaseDate,
										title: film.name,
										rating: film.userRatings.kinopoisk,
										onClick: () => {
											navigate(`/film/${film.id}`);
										},
									}}
								/>
							))
						: ''}
				</div>
			</div>
		</PageLayout>
	);
};
