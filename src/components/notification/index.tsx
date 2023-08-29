import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setNotification} from '@actions/notifications';
import s from './styles.module.css';

interface Props {
	notification:Array<String>,
	setNotification: Function
}

const Notification:React.FC<Props> = ({ notification,setNotification }) => {
	useEffect(() => {
		if(notification.display && notification.timed){
			setTimeout(() => {
				setNotification({...notification,display:false})
			},2500);
		}
	},[notification.display]);

	return (<>
		{notification.display && <div className={notification.error ? s.container + ' ' + s.error : s.container}>
			{ notification.content }
		</div>}
	</>)
}

const mapStateToProps = ({ notification }) => ({ notification });
const mapDispatchToProps = (dispatch) => ({
	setNotification: (data) => dispatch(setNotification(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(Notification);