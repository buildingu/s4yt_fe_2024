import {
	GET_GRADES_SUCCESS
} from '@constants';
import {Api} from '@services';

export const getGrades = () => (dispatch, getState) => {
	return Api.get('/grades').then((response) => {
		dispatch({type:GET_GRADES_SUCCESS,data:response.data.grades})
	});
}
