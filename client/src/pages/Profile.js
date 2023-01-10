import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
	let { id } = useParams();
	const [username, setUsername] = useState('');

	useEffect(() => {
		axios
			.get(`http://localhost:3001/auth/basicinfo/${id}`)
			.then((response) => {
				setUsername(response.data.username);
			});
	}, []);
	return (
		<div className='profilePageContainer'>
			<div className='basicInfo'>
				<h1>Username: {username}</h1>
			</div>
			<div className='listOfPosts'></div>
		</div>
	);
}

export default Profile;
