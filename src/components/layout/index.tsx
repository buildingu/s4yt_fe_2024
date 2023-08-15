import React from 'react';
import Notification from '@components/notification';
import s from './styles.module.css';

interface Props {
	children?: any
}

const Layout:React.FC<Props> = ({ children }) => {

	return (<>
		<div className={s.container}>
			{children}
		</div>
		<Notification />
	</>)
}

export default Layout