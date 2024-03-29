import React from 'react';
import './PostBlock.css';
import { useNavigate } from 'react-router-dom';

function Post(props) {
	const navigate = useNavigate();
	function handleOnClick(id) {
		navigate(`/postdetail/${id}`, { replace: true });
	}
	return (
		<div
			className="post-container"
			onClick={() => {
				handleOnClick(props.id);
			}}
		>
			<img src={props.path} alt="post"></img>
			<div className="post-content">
				<p>
					<strong>@{props.username}</strong> {props.title}
				</p>
			</div>
		</div>
	);
}

export default Post;
