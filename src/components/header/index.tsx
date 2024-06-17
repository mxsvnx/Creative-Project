import { Link } from 'react-router-dom';
import { LoginIcon } from '@icons/LoginIcon';
import { LogoutIcon } from '@icons/LogoutIcon';
import { useTypedSelector, useTypedDispatch } from '@store/hooks/baseHooks';
import './style.scss';
import { setToken } from '@store/user/userSlice';

export const Header: React.FC = () => {
	const tokenDispatch = useTypedDispatch();
	const token = useTypedSelector((state) => state.user.token);

	const onLogout = (): void => {
		tokenDispatch(setToken(''));
	};
	return (
		<header className="header">
			<div className="header__container">
				<nav className="header__menu">
					<Link to="/afisha" className="header__logo">
						<img src="../Logo.png" alt="" className="logo__image" />
					</Link>
					<ul className="header__menu-list">
						<li className="header__menu-item">
							<Link to={token ? '/profile' : '/'} className="header__menu-link">
								Профиль
							</Link>
						</li>
						<li className="header__menu-item">
							<Link to={token ? '/tickets' : '/'} className="header__menu-link">
								Билеты
							</Link>
						</li>
					</ul>
				</nav>
				{token ? (
					<button className="header__button" onClick={onLogout}>
						<LoginIcon className="button__image" fill="#000000" />
						<p className="button__text">Выйти</p>
					</button>
				) : (
					<Link to={'/'}>
						<button className="header__button">
							<LogoutIcon className="button__image" fill="#000000" />
							<p className="button__text">Войти</p>
						</button>
					</Link>
				)}
			</div>
		</header>
	);
};
