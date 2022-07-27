import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import './Form.css';

import Input from '../components/Input.js';
import Textfield from '../components/Textfield.js';
import FancyButton from '../components/FancyButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAsync } from '../features/postListThunks';
import { Autocomplete } from '@react-google-maps/api';
import ImageUploading from 'react-images-uploading';
import uploadImgButton from '../img/upload-img-gray.png';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import { getCityByLocationAsync } from '../features/citiesThunks';

function AddPost(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const addressRef = useRef();
	const city = useSelector((state) => state.cities.addPostProps);
	const userInfo = useSelector((state) => state.user);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [location, setLocation] = useState('');
	const [images, setImages] = useState([]);
	const maxNumber = 69;
	let imageList = [];
	var options = {
		types: ['(cities)'],
		componentRestrictions: { country: ['us', 'ca'] },
	};
	const onChange = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};

	const handleSubmitPost = () => {
		if (title === '' || content === '' || addressRef === '' || images.length === 0) {
			alert('please fill in all sections to post');
		} else if (!userInfo.isLogin) {
			alert('please log in first');
			navigate('/login');
		} else {
			// add post -> use location to find the city -> if no city, create city, get id -> useselector get cityid and city name -> put it in the newpost -> add the post
			dispatch(
				addPostAsync({
					cityId: '62e0b4f9b7d755a85505aac0',
					cityName: 'Vancouver',
					title: title,
					content: content,
					location: addressRef.current.value,
					photos: images,
					userId: userInfo.user._id,
					username: userInfo.user.username,
				})
			);

			handleClearText();
			alert('Post successfully!');
			const cityName = city.cityName;
			navigate(`/postList/${city._id}`, {
				replace: true,
				state: { cityName },
			});

			// navigate(`/postList/${cityId}`, { replace: true });
		}
	};

	const handleClearText = () => {
		setTitle('');
		setContent('');
		setLocation('');
		setImages([]);
		addressRef.current.value = '';
	};
	useEffect(() => {
		if (addressRef !== '') {
			dispatch(getCityByLocationAsync({ location: addressRef.current.value }));
		}
	}, [handleSubmitPost]);

	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationTwo}
			transition={transition}
		>
			<div>
				<Header title="ADD POST" type="black" hasLogin="true" back="/" />

				<div className="form-container">
					<Input
						size="Input"
						type="text"
						name="Title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					<Textfield
						size="Textfield"
						type="text"
						name="Description"
						value={content}
						onChange={(event) => setContent(event.target.value)}
					/>
					<Autocomplete options={options}>
						<input
							size="Input"
							className="Input"
							type="text"
							placeholder="Location"
							ref={addressRef}
						/>
					</Autocomplete>

					<ImageUploading
						multiple
						value={images}
						onChange={onChange}
						maxNumber={maxNumber}
						dataURLKey="data_url"
					>
						{({
							imageList,
							onImageUpload,
							onImageRemoveAll,
							onImageUpdate,
							onImageRemove,
							isDragging,
							dragProps,
						}) => (
							<div
								className="upload__image-wrapper"
								style={isDragging ? { backgroundColor: 'white' } : null}
								{...dragProps}
							>
								{images.length < 1 && (
									<div className="upload__image-false">
										<img src={uploadImgButton} alt="" onClick={onImageUpload} />
										<p>Drag and drop</p>
									</div>
								)}
								{images.length > 0 && (
									<div className="upload__image-true">
										{images?.map((image, index) => (
											<div key={index} className="image-item">
												<div className="image-item__btn-wrapper">
													<button onClick={() => onImageRemove(index)}>
														X
													</button>
													<img
														src={image.data_url}
														alt=""
														width="100px"
													/>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</ImageUploading>

					<FancyButton
						class="fancybutton"
						name="Post"
						onClick={() => {
							handleSubmitPost();
						}}
					/>
				</div>
			</div>
		</motion.div>
	);
}

export default AddPost;
