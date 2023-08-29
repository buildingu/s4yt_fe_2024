import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';

interface Props {
	local:Array<String>,
	view:Function,
	restricted:Boolean
}

const Gate:React.FC<Props> = ({local,view,restricted}) => {
	const allow = (restricted && local.token || !restricted && !local.token) ? true : false;
	const redirect = !restricted ? '/' : '/login';
	
	return (allow ? <>
		{view}
	</> : <Navigate to={redirect} />)
}

const mapStateToProps = ({ local }) => ({ local });
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps,mapDispatchToProps)(Gate);