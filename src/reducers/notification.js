import {
    SET_NOTIFICATION_DATA
} from '@constants';

/*

	Initial Local state

*/
const initialState = {
    display:false,
    error:null,
    content:null,
    timed:true,
}

const Options = (state = initialState, action) => {
    switch(action.type){
        case SET_NOTIFICATION_DATA:
            return {...state,display:action.data.display,error:action.data.error,content:action.data.content,timed:action.data.timed};
    	default:
    		return state;
  	}
}

export default Options;