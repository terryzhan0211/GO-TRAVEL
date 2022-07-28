import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './PostDetail.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { useSelector } from 'react-redux';
import { BsHeart, BsHeartFill, BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { getPostByIdAsync } from '../features/postListThunks';
import { likePost } from '../features/userThunks';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import { useLocation, useParams } from 'react-router-dom';
import {
	EmailShareButton,
	FacebookShareButton,
	RedditShareButton,
	TwitterShareButton,
	FacebookIcon,
	EmailIcon,
	TwitterIcon,
	RedditIcon,
} from 'react-share';

function PostDetail(props) {
	const { postId } = useParams();
	const dispatch = useDispatch();
	// dispatch(getPostByIdAsync(postId));
	const [renderPost, setRenderPost] = useState();
	const userInfo = useSelector((state) => state.user);
	const post = useSelector((state) => state.postList.currentPost);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [userLikedPost, setUserLikedPost] = useState([]);
	const [sharePopup, setSharePopup] = useState(false);
	const [currLocation, setCurrLocation] = useState(window.location.href);
	useEffect(() => {
		dispatch(getPostByIdAsync(postId));
		if (userInfo.isLogin) {
			setUserLikedPost(userInfo.user.likedPosts);
		} else {
			setUserLikedPost([]);
		}
	}, [dispatch]);
	// const userid = userInfo.user._id;
	// const likedPosts = userInfo.user.likedPosts;

	const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] };
	const text = {
		initial: { x: 0 },
		animate: {
			x: 0,
			transition: {
				delayChildren: 0,
				staggerChildren: 0.2,
				staggerDirection: -1,
			},
		},
	};

	const textPart = {
		initial: { x: '-150%' },
		animate: {
			x: 0,
			transition: { duration: 0.3, ...transition },
		},
	};

	// console.log(userLikedPost?.includes(currPostID) ? true : false);
	function handleUnlike(currPostID, userid) {
		if (userInfo.isLogin) {
			console.log(currPostID);
			const useridAndpostid = {
				postid: currPostID,
				userid: userid,
			};
			dispatch(likePost(useridAndpostid));
		} else {
			alert("You'll need to login for this action");
		}
	}

	function handleLike(currPostID, userid) {
		console.log(userInfo.isLogin);
		if (userInfo.isLogin) {
			console.log('postid', currPostID);
			console.log('userid', userid);
			const useridAndpostid = {
				userid: userid,
				postid: currPostID,
			};
			dispatch(likePost(useridAndpostid));
		} else {
			alert("You'll need to login for this action");
		}
	}

	const toggleSharePopup = () => {
		setSharePopup(!sharePopup);
	};

	return (
		<div>
			<Header
				title={post.cityName.toUpperCase()}
				type="black"
				hasLogin="true"
				back={`/postList/${post.cityId}`}
			/>
			<motion.div initial="initial" animate="animate" exit="exit" className="single">
				<div className="context-container">
					<motion.div
						initial={{ height: '630px', width: '400px' }}
						animate={{
							width: '50%',
							height: '100%',
							transition: { transition },
							// rotate: 180
						}}
						className="image-container"
					>
						<Swiper
							style={{
								'--swiper-navigation-color': '#fff',
								'--swiper-pagination-color': '#fff',
							}}
							loop={false}
							spaceBetween={10}
							navigation={true}
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs]}
							className="mySwiper2"
						>
							{post.photos?.map((image, index) => (
								<SwiperSlide key={index}>
									<img src={image.data_url} alt="" />
								</SwiperSlide>
							))}
						</Swiper>
					</motion.div>

					<motion.div variants={text} className="text-container">
						<motion.div variants={textPart} className="user-container-title">
							<div className="user-container-title-title">
								<strong>{'@' + post.username + '\t'}</strong>
								{post.title}
							</div>

							<div className="user-container-title-likebutton">
								{userInfo.user.likedPosts?.includes(post._id) ? (
									<BsHeartFill
										color="red"
										fontSize="35px"
										onClick={() => {
											handleUnlike(post._id, userInfo.user._id);
										}}
									/>
								) : (
									<BsHeart
										color="black"
										fontSize="35px"
										onClick={() => {
											handleLike(post._id, userInfo.user._id);
										}}
									/>
								)}
							</div>
							<div className="user-container-title-likecount">
								<p className="user-container-title-likecount-content">
									{post.likes}
								</p>
							</div>
							<div className="user-container-title-sharebutton">
								<BsThreeDotsVertical
									color="black"
									fontSize="35px"
									onClick={() => {
										toggleSharePopup();
									}}
								/>
							</div>
						</motion.div>

						<motion.p variants={textPart} className="user-container-content">
							{post.content?.split('\n').map((item, index) => {
								return (
									<span key={index}>
										{item}
										<br />
									</span>
								);
							})}
						</motion.p>
					</motion.div>

					{sharePopup && (
						<div className="popup-box">
							<div className="box">
								<span
									className="close-icon"
									onClick={() => {
										toggleSharePopup();
									}}
								>
									x
								</span>
								<div>
									<form className="share-box-container">
										<FacebookShareButton url={currLocation} quote={post.title}>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<FacebookIcon size="50px" round />
													</div>
													<div className="share-text">
														Share to Facebook
													</div>
												</div>
											</div>
										</FacebookShareButton>
										<TwitterShareButton url={currLocation} quote={post.title}>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<TwitterIcon size="50px" round />
													</div>
													<div className="share-text">
														Share to Twitter
													</div>
												</div>
											</div>
										</TwitterShareButton>
										<RedditShareButton url={currLocation} quote={post.title}>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<RedditIcon size="50px" round />
													</div>
													<div className="share-text">
														Share to Reddit
													</div>
												</div>
											</div>
										</RedditShareButton>
										<EmailShareButton url={currLocation} quote={post.title}>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<EmailIcon size="50px" round />
													</div>
													<div className="share-text">
														Share via Email
													</div>
												</div>
											</div>
										</EmailShareButton>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</div>
	);
}

export default PostDetail;
