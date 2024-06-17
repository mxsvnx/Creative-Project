import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';

import { createOtpCode, signIn } from '@api/services/auth';

import { useTypedDispatch } from '@store/hooks/baseHooks';
import { setToken } from '@store/user/userSlice';

import { Button } from '@ui/button';
import { Input } from '@ui/input/indext';

import { useTimer } from '@hooks/useTimer';

import './style.scss';
import { PageLayout } from '@components/pageLayout';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
	const [phone, setPhone] = useState<string>('');
	const [code, setCode] = useState<string>('');
	const [timer, setTimer] = useTimer(0);
	const userDispatch = useTypedDispatch();
	const navigate = useNavigate();

	const createCode = useQuery({
		queryKey: ['code'],
		queryFn: async () => createOtpCode(phone),
	});
	const userAuth = useQuery({
		queryKey: ['signin'],
		queryFn: async () => signIn(phone, parseInt(code)),
	});

	const resendCodeClass = classNames({
		'auth__resend-text--disabled': timer > 0,
		'auth__resend-text--enabled': timer === 0,
	});

	const onPhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (!/[0-9]/.test(e.key)) {
			e.preventDefault();
		}
	};
	const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (Number.isInteger(parseInt(e.target.value))) {
			setPhone(e.target.value);
		}
	};
	const onCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setCode(e.target.value);
	};
	const sendCode = (): void => {
		if (timer === 0) {
			createCode.refetch();
			setTimer(120);
		}
	};
	const onSignIn = (): void => {
		userAuth.refetch().then((response) => {
			userDispatch(setToken(response.data?.data.token));
			navigate('/afisha');
		});
	};

	return (
		<PageLayout>
			<div className="auth">
				<h1 className="auth__header-text">Авторизация</h1>
				<p className="auth__subtitle-text">Введите номер телефона для входа в личный кабинет</p>
				<Input
					placeholder="Телефон"
					onKeyDown={(e) => {
						onPhoneKeyDown(e);
					}}
					onChange={onPhoneChange}
				/>
				{createCode.isSuccess ? (
					<>
						<Input placeholder="Проверочный код" onChange={onCodeChange} />
						{userAuth.isError ? <p className="auth__input-error">Неверный код</p> : ''}
						<Button onClick={onSignIn}>Войти</Button>
						<p onClick={sendCode} className={resendCodeClass}>
							Запросить код {timer > 0 ? `повторно можно через ${timer} секунд` : ''}{' '}
						</p>
					</>
				) : (
					<Button onClick={sendCode}>Продолжить</Button>
				)}
			</div>
		</PageLayout>
	);
};
