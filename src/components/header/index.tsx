import React from 'react';
import s from './styles.module.css';

interface Props {
	children?: any
}

const Header:React.FC<Props> = ({ children }) => {

	return (
		<div className={s.container}>
			{!children && <img src="/assets/s4yt.png" alt="s4yt" className={s.logo} />}
			{children}
		</div>
	)
}

export default Header