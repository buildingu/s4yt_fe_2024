import {SET_NOTIFICATION_DATA} from '@constants';

export const setNotification = (data) => (dispatch, getState) => {
	const {notification} = getState();
	console.log(notification);
}