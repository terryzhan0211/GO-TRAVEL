import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import leftArrow from '../img/left-arrow.png';
import Header from './Header';
import loginImg from '../img/login.png';
import './PostDetail.css';
import { PostData } from './PostData';
import God from '../img/god.jpg';
import Test from '../img/test1.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { useSelector } from 'react-redux';

function PostDetail(props) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const post = useSelector((state) => state.cities.currPost);
	console.log(post);
	const images = post.photos;
	const title = post.title;
	const content = post.content;
	console.log(content);
	const cityNameAllCaps = post.city.toLocaleUpperCase();
	return (
		<div>
			<Header title={cityNameAllCaps} type="black" hasLogin="true" back="/posts"></Header>
			<div className="context-container">
				{/* <div className="image-container">
					<img alt="post" src={God}></img>					
				</div> */}

				<div className="image-container">
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
				</div>

				<div className="text-container">
					<h5>
						<strong>{props.userName}</strong>
					</h5>
					<h3>{title}</h3>
					<p>
						{content.split('\n').map((item, index) => {
							return (
								<span key={index}>
									{item}
									<br />
								</span>
							);
						})}
					</p>
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
