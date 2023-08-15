import {Api} from '@services';

export const registration = (data,callback) => (dispatch, getState) => {
	
	return Api.post('/register',data).then((response) => {
		if(response.ok){

		}else{
			
		}
	});
}
