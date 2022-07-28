import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Input from '../components/Input';
import loginImg from '../img/login.png';
import './User.css';
import './Popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, logout, changePassword } from '../features/userThunks';
import { useNavigate } from 'react-router-dom';
import Textfield from '../components/Textfield';
import FancyButton from '../components/FancyButton';
import UserPost from '../components/UserPost.js';
import { TiDelete } from 'react-icons/ti';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import { deletePostByIdAsync, getPostListByUserIdAsync } from '../features/postListThunks';
import { reduceWeightAsync } from '../features/citiesThunks';
function User() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogin = useSelector((state) => state.user.isLogin);

	// if (!isLogin) {
	// 	return <Redirect to={'/login'} />;
	// }
	const userInfo = useSelector((state) => state.user.user);
	console.log(userInfo);
	const userPosts = useSelector((state) => state.postList.userPostList);

	const [editIntroPopupIsOpen, setEditIntroPopupIsOpen] = useState(false);
	const [changePasswordPopupIsOpen, setChangePasswordPopupIsOpen] = useState(false);
	const [editUsername, setEditUsername] = useState(userInfo.username);
	const [editIntroduction, setEditIntroduction] = useState(userInfo.introduction);
	const [oldPassword, setOldPassword] = useState(userInfo.password);
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [renderPosts, setRenderPosts] = useState();

	const toggleEditPopup = () => {
		setEditIntroPopupIsOpen(!editIntroPopupIsOpen);
	};

	const handleOnClickSignout = () => {
		dispatch(logout());
		navigate('/');
	};
	const handleOnClickEdit = () => {
		const id = userInfo._id;
		const username = editUsername;
		const introduction = editIntroduction;
		dispatch(editUser({ id, username, introduction }));
		toggleEditPopup();
	};

	const toggleChangePasswordPopup = () => {
		setChangePasswordPopupIsOpen(!changePasswordPopupIsOpen);
	};

	const handleOnClickChangePassword = () => {
		const id = userInfo._id;
		dispatch(changePassword({ id, oldPassword, newPassword }));
		toggleChangePasswordPopup();
	};

	const handleOnClickDelete = (postId, cityId) => {
		dispatch(reduceWeightAsync(cityId));
		dispatch(deletePostByIdAsync(postId));
	};

	useEffect(() => {
		dispatch(getPostListByUserIdAsync(userInfo._id));
	}, [dispatch]);

	useEffect(() => {
		setRenderPosts(() => {
			return userPosts?.map((post, index) => {
				return (
					<div className="posts-item-user" key={index}>
						<TiDelete
							className="btn-delete"
							onClick={() => handleOnClickDelete(post._id, post.cityId)}
						/>

						<UserPost
							path={post.photos[0].data_url}
							username={post.username}
							title={post.title}
							content={post.content}
							imgs={post.photos}
							id={post._id}
						/>
					</div>
				);
			});
		});
	}, [userPosts]);
	return (
		// <motion.div
		// 	initial="out"
		// 	animate="in"
		// 	exit="out"
		// 	variants={animationTwo}
		// 	transition={transition}
		// >
		<div className="user-page">
			<Header title="Your Profile" type="black" hasLogin="false" back="/" />
			<div className="user-container">
				<div className="user-profilepic-container">
					<img src={loginImg} alt=""></img>
					<div className="user-profilepic-button">
						<FancyButton
							class="fancybutton"
							name="Edit Introduction"
							onClick={() => {
								toggleEditPopup();
							}}
						/>
					</div>
					<div className="user-profilepic-button">
						<FancyButton
							class="fancybutton"
							name="Change Password"
							onClick={() => {
								toggleChangePasswordPopup();
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

			{editIntroPopupIsOpen && (
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
			{changePasswordPopupIsOpen && (
				<div className="popup-box">
					<div className="box">
						<span
							className="close-icon"
							onClick={() => {
								toggleChangePasswordPopup();
							}}
						>
							x
						</span>
						<div>
							<form className="box-container">
								<Input
									size="Input"
									type="text"
									name="Old password"
									onChange={(event) => setOldPassword(event.target.value)}
								/>
								<Input
									size="Input"
									type="text"
									name="New password"
									onChange={(event) => setNewPassword(event.target.value)}
								/>
								<Input
									size="Input"
									type="text"
									name="Confirm new password"
									onChange={(event) => setConfirmPassword(event.target.value)}
								/>
								<FancyButton
									type="AddButton"
									name="Edit"
									onClick={() => {
										newPassword === confirmPassword
											? handleOnClickChangePassword()
											: alert('Confirm password not match with new password');
									}}
								/>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
		// </motion.div>
	);
}

export default User;
