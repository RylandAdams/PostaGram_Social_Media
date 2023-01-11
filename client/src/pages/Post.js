import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
	let { id } = useParams();
	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const { authState } = useContext(AuthContext);

	let navigate = useNavigate();

	useEffect(() => {
		axios
			.get(
				`https://full-stack-api-postagram.herokuapp.com/posts/byId/${id}`
			)
			.then((response) => {
				setPostObject(response.data);
			});

		axios
			.get(
				`https://full-stack-api-postagram.herokuapp.com/comments/${id}`
			)
			.then((response) => {
				setComments(response.data);
				console.log(response.data);
			});
	}, []);

	const addComment = () => {
		axios
			.post(
				`https://full-stack-api-postagram.herokuapp.com/comments`,
				{
					commentBody: newComment,
					PostId: id,
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken'),
					},
				}
			)
			.then((response) => {
				if (response.data.error) {
					alert(response.data.error);
				} else {
					const commentToAdd = {
						commentBody: newComment,
						username: response.data.username,
						id: response.data.id,
					};
					setComments([...comments, commentToAdd]);
					setNewComment('');
				}
			});
	};

	const deleteComment = (id) => {
		axios
			.delete(
				`https://full-stack-api-postagram.herokuapp.com/comments/${id}`,
				{
					headers: {
						accessToken: localStorage.getItem('accessToken'),
					},
				}
			)
			.then(() => {
				setComments(
					comments.filter((val) => {
						return val.id != id;
					})
				);
			});
	};

	const deletePost = (id) => {
		axios
			.delete(
				`https://full-stack-api-postagram.herokuapp.com/posts/${id}`,
				{
					headers: {
						accessToken: localStorage.getItem('accessToken'),
					},
				}
			)
			.then(() => {
				navigate('/');
			});
	};

	const editPost = (option) => {
		if (option === 'title') {
			let newTitle = prompt('Enter New Title');
			axios.put(
				'https://full-stack-api-postagram.herokuapp.com/posts/title',
				{
					newTitle: newTitle,
					id: id,
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken'),
					},
				}
			);

			setPostObject({ ...postObject, title: newTitle });
		} else {
			let newPostText = prompt('Enter New Post');
			axios.put(
				'https://full-stack-api-postagram.herokuapp.com/posts/postText',
				{
					newText: newPostText,
					id: id,
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken'),
					},
				}
			);
			setPostObject({ ...postObject, postText: newPostText });
		}
	};

	return (
		<div className='postPage'>
			<div className='leftSide'>
				<div
					className='post'
					id='individual'
				>
					<div
						className='title'
						onClick={() => {
							if (authState.username === postObject.username) {
								editPost('title');
							}
						}}
					>
						{postObject.title}
					</div>
					<div
						className='body'
						onClick={() => {
							if (authState.username === postObject.username) {
								editPost('body');
							}
						}}
					>
						{postObject.postText}
					</div>
					<div className='footer'>
						{postObject.username}
						{authState.username === postObject.username && (
							<button
								onClick={() => {
									deletePost(postObject.id);
								}}
							>
								X
							</button>
						)}
					</div>
				</div>
			</div>
			<div className='rightSide'>
				<div className='addCommentContainer'>
					<input
						type='text'
						placeholder='Comment...'
						autoComplete='off'
						value={newComment}
						onChange={(event) => {
							setNewComment(event.target.value);
						}}
					/>
					<button onClick={addComment}> Add Comment</button>
				</div>
				<div className='listOfComments'>
					{comments.map((comment, key) => {
						return (
							<div
								key={key}
								className='comment'
							>
								{comment.commentBody}
								<label> Username: {comment.username}</label>
								{authState.username === comment.username && (
									<button
										onClick={() => {
											deleteComment(comment.id);
										}}
									>
										X
									</button>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Post;
