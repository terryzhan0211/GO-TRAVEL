import { createSlice } from '@reduxjs/toolkit';
import {
	getCitiesAsync,
	getCityByLocationAsync,
	getCityNameById,
	handleSearch,
	reduceWeightAsync,
} from './citiesThunks';

const INITIAL_STATE = {
	cities: [],
	addPostProps: {
		cityId: '',
		cityName: '',
		actual_location: '',
		location: {},
		weight: 1,
	},
	getCities: '',
	getCitiesByLocation: '',
	getCityNameById: '',
	cityhandleSearch:'',
	currCityName: '',
	reduceWeight: '',
	error: '',
};

export const citySlice = createSlice({
	name: 'cities',
	initialState: INITIAL_STATE,

	reducers: {
		getCurrAddPost: (state, action) => {
			return state.currAddpost;
		},
	},
	extraReducers: (builder) => {
		builder
			// get initial cities from server
			.addCase(getCitiesAsync.pending, (state) => {
				state.getCities = 'PENDING';
				state.error = null;
			})
			.addCase(getCitiesAsync.fulfilled, (state, action) => {
				state.getCities = 'FULFILLED';
				state.cities = action.payload;
			})
			.addCase(getCitiesAsync.rejected, (state, action) => {
				state.getCities = 'REJECTED';
				state.error = action.error;
			})
			.addCase(getCityByLocationAsync.pending, (state) => {
				state.getCitiesByLocation = 'PENDING';
				state.error = null;
			})
			.addCase(getCityByLocationAsync.fulfilled, (state, action) => {
				state.getCitiesByLocation = 'FULFILLED';
				state.addPostProps = action.payload;
			})
			.addCase(getCityByLocationAsync.rejected, (state, action) => {
				state.getCitiesByLocation = 'REJECTED';
				state.error = action.error;
			})
			.addCase(reduceWeightAsync.pending, (state) => {
				state.reduceWeight = 'PENDING';
				state.error = null;
			})
			.addCase(reduceWeightAsync.fulfilled, (state, action) => {
				state.reduceWeight = 'FULFILLED';
				const foundCity = state.cities.find(function (city) {
					return city.cityId === action.payload.cityId;
				});
				const cityIndex = state.cities.indexOf(foundCity);
				state.cities[cityIndex].weight -= 1;
			})
			.addCase(reduceWeightAsync.rejected, (state, action) => {
				state.reduceWeight = 'REJECTED';
				state.error = action.error;
			})
			.addCase(getCityNameById.pending, (state) => {
				state.getCityNameById = 'PENDING';
				state.error = null;
			})
			.addCase(getCityNameById.fulfilled, (state, action) => {
				state.getCityNameById = 'FULFILLED';
				state.currCityName = action.payload.cityName.toUpperCase();
			})
			.addCase(getCityNameById.rejected, (state, action) => {
				state.getCityNameById = 'REJECTED';
				state.error = action.error;
			})
			.addCase(handleSearch.pending, (state) => {
				state.cityhandleSearch = 'PENDING';
				state.error = null;
			})
			.addCase(handleSearch.fulfilled, (state, action) => {
				state.cityhandleSearch = 'FULFILLED';
				state.currCityName = action.payload.cityName.toUpperCase();
			})
			.addCase(handleSearch.rejected, (state, action) => {
				state.cityhandleSearch = 'REJECTED';
				state.error = action.error;
			});
	},
});

export const { getCurrAddPost } = citySlice.actions;
export default citySlice.reducer;
