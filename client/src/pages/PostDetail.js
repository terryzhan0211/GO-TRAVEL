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
import { MdOutlineFavoriteBorder, MdOutlineFavorite, MdYoutubeSearchedFor } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { likePost } from '../features/userThunks';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import { useParams } from 'react-router-dom';

function PostDetail(props) {
	const { postId } = useParams();
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const post = useSelector((state) => state.cities.currPost);
	const userInfo = useSelector((state) => state.user);
	const [userLikedPost, setUserLikedPost] = useState([]);
	console.log(userLikedPost);
	// const userid = userInfo.user._id;
	// const likedPosts = userInfo.user.likedPosts;
	const images = post.photos;
	const title = post.title;
	const content = post.content;
	const currPostID = post.postID;
	console.log(currPostID);
	const cityNameAllCaps = post.city.toLocaleUpperCase();
	let dispatch = useDispatch();
	const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] };
	const text = {
		initial: { x: 0 },
		animate: {
			x: 0,
			transition: {
				delayChildren: 0.6,
				staggerChildren: 0.5,
				staggerDirection: -1,
			},
		},
	};

	const textPart = {
		initial: { x: '-150%' },
		animate: {
			x: 0,
			transition: { duration: 1, ...transition },
		},
	};

	console.log(userLikedPost?.includes(currPostID) ? true : false);
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
			let useridAndpostid = {
				userid: userid,
				postid: currPostID,
			};
			dispatch(likePost(useridAndpostid));
		} else {
			alert("You'll need to login for this action");
		}
	}

	useEffect(() => {
		if (userInfo.isLogin) {
			setUserLikedPost(userInfo.user.likedPosts);
		} else {
			setUserLikedPost([]);
		}
	}, [userInfo]);
	return (
		<div>
			<Header title={cityNameAllCaps} type="black" hasLogin="true" back="/postList" />
			{/* <Header
				title={cityNameAllCaps}
				type="black"
				hasLogin="true"
				back={`/postList/${post.cityId}`}
			/> */}
			<motion.div initial="initial" animate="animate" exit="exit" className="single">
				<div className="context-container">
					{/* <div className="image-container">
					<img alt="post" src={God}></img>					
				</div> */}

					<motion.div
						initial={{ height: '630px', width: '400px' }}
						animate={{
							width: '50%',
							height: '100%',
							transition: { delay: 0.1, ...transition },
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
							{images?.map((image, index) => (
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
								{title}
							</div>
							{userInfo.isLogin && (
								<div className="user-container-title-likebutton">
									{userInfo.user.likedPosts?.includes(currPostID) ? (
										<MdOutlineFavorite
											color="red"
											fontSize="50px"
											onClick={() => {
												handleUnlike(currPostID, userInfo.user._id);
											}}
										/>
									) : (
										<MdOutlineFavoriteBorder
											color="red"
											fontSize="50px"
											onClick={() => {
												handleLike(currPostID, userInfo.user._id);
											}}
										/>
									)}
								</div>
							)}
						</motion.div>

						<motion.p variants={textPart} className="user-container-content">
							{content.split('\n').map((item, index) => {
								return (
									<span key={index}>
										{item}
										<br />
									</span>
								);
							})}
						</motion.p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}

export default PostDetail;
