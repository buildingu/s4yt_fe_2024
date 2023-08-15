import {
    SET_LOCAL_TOKEN_SUCCESS
} from '@constants';

/*

	Initial Local state

*/
const initialState = {
    token:null
}

const Local = (state = initialState, action) => {
    switch(action.type){
        case SET_LOCAL_TOKEN_SUCCESS:
            return {...state,token:action.data};
    	default:
    		return {...state};
  	}
}

export default Local;