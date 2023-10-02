import {SET_CONFIGURATION} from '@constants';
import {Api} from '@services';

export const getConfiguration = (callback) => (dispatch, getState) => {
	return Api.get('/configuration').then((response) => {
		let data = {loaded:true};

		response.data.map((config,index) => {
			data[config.key] = config.versions ? (!isNaN(config.versions.value) ? parseInt(config.versions.value) : config.versions.value) : null;
		});

		dispatch({type:SET_CONFIGURATION,data:data});
	})
}
