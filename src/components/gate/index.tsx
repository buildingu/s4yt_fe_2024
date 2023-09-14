import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {getConfiguration} from '@actions/configuration';

interface Props {
	local:Array<String>,
	view:Object,
	restricted:Boolean,
	getConfiguration:Function
}

const Gate:React.FC<Props> = ({local,configuration,view,restricted,getConfiguration}) => {
	const allow = (restricted && local.token || !restricted && !local.token) ? true : false;
	const redirect = !restricted ? '/profile' : '/login';

	useEffect(() => {
		if(!configuration.loaded){
			getConfiguration();
		}
	},[]);
	
	return (configuration.loaded ? (allow ? <>
		{view}
	</> : <Navigate to={redirect} />) : null)
}

const mapStateToProps = ({ local,configuration }) => ({ local,configuration });
const mapDispatchToProps = (dispatch) => ({
	getConfiguration: () => dispatch(getConfiguration())
});

export default connect(mapStateToProps,mapDispatchToProps)(Gate);