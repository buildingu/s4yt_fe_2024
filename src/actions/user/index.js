import {Api} from '@services';

export const login = (data,callback) => (dispatch, getState) => {
	return Api.post('/login',data).then((response) => {
		callback(response);
	});
}

export const registration = (data,callback) => (dispatch, getState) => {
	return Api.post('/register',data).then((response) => {
		callback(response);
	});
}
