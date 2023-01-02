import React from 'react';
import { useParams } from 'react-router-dom';

function Post() {
	let { id } = useParams();
	return <div>{id}</div>;
}

export default Post;
