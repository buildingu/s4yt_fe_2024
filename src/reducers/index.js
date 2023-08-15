import { combineReducers } from 'redux';
import Local from './local';
import Notification from './notification';
import Options from './options';

export default combineReducers({
	local: Local,
	options: Options,
	notification: Notification
});