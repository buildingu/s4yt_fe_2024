import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom"
import {connect} from 'react-redux';
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';
import UserForm from "@components/forms/user";
import s from './styles.module.css';

interface Props {
	
}

const Register:React.FC<Props> = ({}) => {
	const [queryParameters] = useSearchParams();
	const data = queryParameters.has('email') ? {player:{},email:queryParameters.get('email')} : [];
	const referral = queryParameters.has('referral') ? queryParameters.get('referral') : null;

	return (
		<Layout>
			<Header />
			<Content>
				<UserForm user={data} referral={referral} />
			</Content>
		</Layout>
	)
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps,mapDispatchToProps)(Register);