export const formatRating = (rating: number): number[] => {
	const result = [0, 0, 0, 0, 0];

	rating = Math.round(rating / 2);

	for (let i = 0; i < 5; i++) {
		if (rating <= i) {
			result[i] = 0;
		} else {
			result[i] = 1;
		}
	}

	return result;
};
