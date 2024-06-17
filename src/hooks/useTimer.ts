import { useEffect, useState } from 'react';

export const useTimer = (time: number): [number, React.Dispatch<React.SetStateAction<number>>] => {
	const [timer, setTimer] = useState<number>(time);

	useEffect(() => {
		const interval = setInterval(() => {
			if (timer > 0) {
				setTimer(timer - 1);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [timer]);

	return [timer, setTimer];
};
