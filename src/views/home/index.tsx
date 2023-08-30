import React from 'react';
import {connect} from 'react-redux';
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';

interface Props {

}

const Home:React.FC<Props> = ({ }) => {

	return (
		<Layout>
			<Header />
			<Content>
				<strong>Home</strong>
			</Content>
		</Layout>
	)
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = (dispatch) => ({ });

export default connect(mapStateToProps,mapDispatchToProps)(Home);