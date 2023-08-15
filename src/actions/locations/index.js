import {GET_COUNTRIES_SUCCESS} from '@constants';
import {Api} from '@services';

export const getCountries = () => (dispatch, getState) => {
	return Api.get('/location/countries').then((response) => {
		dispatch({type:GET_COUNTRIES_SUCCESS,data:response.data.countries})
	});
}

export const getRegions = (ciso,callback) => (dispatch, getState) => {
	return Api.get('/location/states?ciso='+ciso).then((response) => {
		callback(response.data.states);
	});
}

export const getCities = (ciso,siso,callback) => (dispatch, getState) => {
	return Api.get('/location/cities?ciso='+ciso+'&siso='+siso).then((response) => {
		callback(response.data.cities);
	});
}
