import React, { useContext, useEffect } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
	let navigate = useNavigate();
	const { authState } = useContext(AuthContext);

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			navigate('/login');
		}
	}, []);

	const initialValues = {
		title: '',
		postText: '',
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Please input a Title'),
		postText: Yup.string().required(),
	});

	const onSubmit = (data) => {
		axios
			.post('http://localhost:3001/posts', data, {
				headers: { accessToken: localStorage.getItem('accessToken') },
			})
			.then((response) => {
				navigate('/');
			});
	};

	return (
		<div className='createPostPage'>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className='formContainer'>
					<label>Title:</label>
					<ErrorMessage
						name='title'
						component='span'
					/>
					<Field
						autoComplete='off'
						id='inputCreatePost'
						name='title'
						placeholder='Set Title'
					/>
					<label>Post:</label>
					<ErrorMessage
						name='postText'
						component='span'
					/>
					<Field
						autoComplete='off'
						id='inputCreatePost'
						name='postText'
						placeholder='Set Post'
					/>

					<button type='submit'> Create Post </button>
				</Form>
			</Formik>
		</div>
	);
}

export default CreatePost;
