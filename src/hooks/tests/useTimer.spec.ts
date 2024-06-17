import { useTimer } from '../useTimer';
import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';

describe('hooks', () => {
	describe('useTimer', () => {
		test('time is running out', async () => {
			const { result } = renderHook(() => useTimer(3));
			const time = new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 1000);
			});

			await time;
			expect(result.current[0]).approximately(2, 1);
		});
	});
});
