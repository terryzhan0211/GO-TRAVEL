import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCitiesAsync = createAsyncThunk('cities/thunks/getCities', async () => {
	const respose = await fetch('http://localhost:3001/posts', {
		method: 'GET',
	});
	const data = await respose.json();
	console.log(data);
	return data;
});

export const addPostAsync = createAsyncThunk(
	'cities/thunks/addPost',
	async (postData, thunkAPI) => {
		try {
			await axios
				.get('https://maps.googleapis.com/maps/api/geocode/json', {
					params: {
						address: postData.location,
						key: 'AIzaSyD2YB2p_MX4E0WDiQt5KfODgs1mCfLbWoY',
					},
				})
				.then(function (response) {
					const geo = response.data.results[0].geometry.location;
					postData.geo = new window.google.maps.LatLng(geo.lat, geo.lng);
				})
				.catch(function (error) {
					console.log(error);
				});
			console.log(postData);
			const response = await fetch('http://localhost:3001/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			});
			console.log(response);
			const data = await response.json();
			console.log(data);
			if (!response.ok) {
				const errorMsg = data?.message;
				throw new Error(errorMsg);
			}

			return data;
		} catch (error) {
			const message =
				(error.response && error.response.data && error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deletePostAsync = createAsyncThunk('cities/thunks/deletePost', async () => {});
