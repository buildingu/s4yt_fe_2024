import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export type ThunkResult<R> = ThunkAction<R, any, undefined, Action>;
