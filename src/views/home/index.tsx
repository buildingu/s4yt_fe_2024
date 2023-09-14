import React from 'react';
import {connect} from 'react-redux';
import {useNavigate} from "react-router-dom";
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';

interface Props {

}

const Home:React.FC<Props> = ({ }) => {
	const navigate = useNavigate();

	const redirect = (e) => {
		e.preventDefault();

		navigate(e.target.getAttribute('href'));
	}

	return (
		<Layout>
			<Header />
			<Content>
				<strong>Coming Soon</strong>
				<p style={{marginTop:10}}>Or visit your <a onClick={redirect} style={{textDecoration:'underline'}}>Profile</a></p>
			</Content>
		</Layout>
	)
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = (dispatch) => ({ });

export default connect(mapStateToProps,mapDispatchToProps)(Home);