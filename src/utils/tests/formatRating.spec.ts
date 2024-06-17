import { formatRating } from '../formatRating';
import { describe, test, expect } from 'vitest';

describe('hooks', () => {
	describe('useRating', () => {
		test('int rating', () => {
			const rating = formatRating(6);
			expect(rating).toMatchObject([1, 1, 1, 0, 0]);
		});
		test('float rating', () => {
			const rating = formatRating(6.6);
			expect(rating).toMatchObject([1, 1, 1, 0, 0]);
		});
		test('negative rating', () => {
			const rating = formatRating(-6);
			expect(rating).toMatchObject([0, 0, 0, 0, 0]);
		});
	});
});
