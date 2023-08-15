import {Store} from '@root/store';
import Qs from 'qs';

export const Api = {
	get: async (url,params) => {
		const _url = params ? process.env.REACT_APP_API_BASE_URL + url + '?' + new URLSearchParams(params).toString() : process.env.REACT_APP_API_BASE_URL + url;
		const {token} = Store.getState().local;
		
		return token ? await fetch(_url,{method:'GET',headers:token ? {'Authorization':`Bearer ${token}`} : {}}).then(response => response.json()) : await fetch(_url,{method:'GET'}).then(response => response.json());
	},
	post: async (url,data) => {
		const _url = process.env.REACT_APP_API_BASE_URL + url;
		const {token} = Store.getState().local;

		return await fetch(_url,{method:'POST',headers:token ? {'Authorization':`Bearer ${token}`} : {},body: JSON.stringify(data)}).then(response => response.json());
	},
}