import {
    GET_COUNTRIES_SUCCESS,
    GET_GRADES_SUCCESS
} from '@constants';

/*

	Initial Local state

*/
const initialState = {
    countries:[],
    grades:[]
}

const Options = (state = initialState, action) => {
    switch(action.type){
        case GET_COUNTRIES_SUCCESS:
            return {...state,countries:action.data};
        case GET_GRADES_SUCCESS:
            return {...state,grades:action.data};
        default:
    		return {...state};
  	}
}

export default Options;