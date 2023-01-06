import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
	return (
		<div>
			<h1>Page No Found :/</h1>
			<h3>
				Go to the Homepage: <Link to='/'> Home Page</Link>
			</h3>
		</div>
	);
}

export default PageNotFound;
