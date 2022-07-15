import React, { useState, useEffect } from 'react';
import Header from './Header';
import loginImg from '../img/login.png';
import './User.css';
import './Popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, logout } from '../features/user';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Textfield from './Textfield';
import FancyButton from './FancyButton';
import UserPost from './UserPost.js';
import { TiDelete } from 'react-icons/ti';
import { getCurrUserPosts } from '../features/cities';
function User() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userInfo = useSelector((state) => state.user.user);
	const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
	const [editUsername, setEditUsername] = useState(userInfo.username);
	const [editIntroduction, setEditIntroduction] = useState(userInfo.introduction);
	const posts = useSelector((state) => state.cities.currUserPosts);
	const [renderPosts, setRenderPosts] = useState();

	const toggleEditPopup = () => {
		setEditPopupIsOpen(!editPopupIsOpen);
	};

	const handleOnClickSignout = () => {
		dispatch(logout());
		navigate('/');
	};
	const handleOnClickEdit = () => {
		const id = userInfo._id;
		const username = editUsername;
		const introduction = editIntroduction;
		console.log(id, username, introduction);
		dispatch(editUser({ id, username, introduction }));
		toggleEditPopup();
	};

	// TODO
	const handleOnClickDelete = (postID) => {};

	useEffect(() => {
		dispatch(getCurrUserPosts({ username: userInfo.username }));
		setRenderPosts(() => {
			return posts?.map((post, index) => {
				console.log();
				return (
					<div className="posts-item-user" key={index}>

						<TiDelete
							className="btn-delete"
							onClick={() => handleOnClickDelete(post.postID)}
						/>

						<UserPost
							path={post.photos[0].data_url}
							username={post.username}
							title={post.title}
							content={post.content}
							imgs={post.photos}
							id={post.postID}
						/>
					</div>
				);
			});
		});
	}, []);
	return (
		<div>
			<Header title="Your Profile" type="black" hasLogin="false" back="/" />
			<div className="user-container">
				<div className="user-profilepic-container">
					<img src={loginImg} alt=""></img>
					<div className="user-profilepic-button">
						<FancyButton
							class="fancybutton"
							name="Edit"
							onClick={() => {
								toggleEditPopup();
							}}
						/>
					</div>
					<div className="user-profilepic-button">
						<FancyButton
							class="fancybutton-neg"
							name="Logout"
							onClick={() => {
								handleOnClickSignout();
							}}
						/>
					</div>
				</div>
				<div className="user-info-container">
					<div>
						<p>Username</p>
						<div className="user-info-content">
							<strong>{userInfo.username}</strong>
						</div>
						<p>Introduction</p>
						<div className="user-info-content">
							<strong>{userInfo.introduction}</strong>
						</div>
						<p>Your Posts</p>
						<div className="posts-section-user">
							<div className="posts-container-user">{renderPosts}</div>
						</div>
					</div>
				</div>
			</div>

			{editPopupIsOpen && (
				<div className="popup-box">
					<div className="box">
						<span
							className="close-icon"
							onClick={() => {
								toggleEditPopup(-1);
							}}
						>
							x
						</span>
						<div>
							<form className="box-container">
								{/* <Input
									size="Input"
									type="text"
									name="Your new username"
									onChange={(event) => setEditUsername(event.target.value)}
								/> */}
								<Textfield
									size="Textfield"
									type="text"
									name="Your new introduction"
									onChange={(event) => setEditIntroduction(event.target.value)}
								/>
								<FancyButton
									type="AddButton"
									name="Edit"
									onClick={() => {
										handleOnClickEdit();
									}}
								/>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default User;
