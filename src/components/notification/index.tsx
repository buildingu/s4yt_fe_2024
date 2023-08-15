import React from 'react';
import {connect} from 'react-redux';
import s from './styles.module.css';

interface Props {
	notification:Array<String>
}

const Notification:React.FC<Props> = ({ notification }) => {
	return (<>
		{notification.display && <div className={notification.class ? s.container + ' ' + notification.class : s.container}>
			{ notification.content }
		</div>}
	</>)
}

const mapStateToProps = ({ notification }:{ notification:Array<String> }) => ({ notification });
const mapDispatchToProps = (dispatch: Function) => ({ });

export default connect(mapStateToProps,mapDispatchToProps)(Notification);