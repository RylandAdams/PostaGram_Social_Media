import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
	const [listOfPosts, setListOfPosts] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3001/posts').then((response) => {
			setListOfPosts(response.data);
		});
	}, []);

	return (
		<div className='home'>
			{listOfPosts.map((value, key) => {
				return (
					<div className='post'>
						<div className='title'> {value.title} </div>
						<div className='body'> {value.postText} </div>
						<div className='footer'> {value.username} </div>
					</div>
				);
			})}
		</div>
	);
}

export default Home;
