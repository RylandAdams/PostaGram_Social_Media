import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
	let navigate = useNavigate();

	const initialValues = {
		username: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(3).max(15).required(),
		password: Yup.string().min(4).max(25).required(),
	});

	const onSubmit = (data) => {
		axios.post('http://localhost:3001/auth', data).then((response) => {
			console.log(data);
			// navigate('/');
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
					<label>Username:</label>
					<ErrorMessage
						name='username'
						component='span'
					/>
					<Field
						autoComplete='off'
						id='inputCreatePost'
						name='username'
						placeholder='Set Username'
					/>
					<label>Password:</label>
					<ErrorMessage
						name='password'
						component='span'
					/>
					<Field
						autoComplete='off'
						type='password'
						id='inputCreatePost'
						name='password'
						placeholder='Set Password'
					/>

					<button type='submit'> Create Account </button>
				</Form>
			</Formik>
		</div>
	);
}

export default Registration;
