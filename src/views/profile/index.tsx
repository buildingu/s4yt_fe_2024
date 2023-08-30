import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';
import {getCurrentUser} from '@actions/user';

interface Props {
	getCurrentUser: Function
}

const Profile:React.FC<Props> = ({getCurrentUser}) => {
	const [data, setData] = useState();

	useEffect(() => {
		getCurrentUser((res) => {
			setData(res.data);
		})
	},[]);
	
	return (
		<Layout>
			<Header />
			<Content>
				<strong>Profile</strong>
			</Content>
		</Layout>
	)
}

const mapStateToProps = ({ }) => ({ });
const mapDispatchToProps = (dispatch) => ({
	getCurrentUser: (callback) => dispatch(getCurrentUser(callback))
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);