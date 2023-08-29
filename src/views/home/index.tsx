import React from 'react';
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

export default Home