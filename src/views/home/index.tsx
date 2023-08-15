import React from 'react';
import Layout from '@components/layout';
import Header from '@components/header';
import Content from '@components/content';

interface Props {

}

const Home:React.FC<Props> = ({ }) => {

	return (
		<Layout>
			<Header>
				<img src="/static/s4yt.png" alt="s4yt" />
			</Header>
			<Content>
				
			</Content>
		</Layout>
	)
}

export default Home