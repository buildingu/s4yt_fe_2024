import { SET_BUSINESSES } from "@actions/index";
import { staticBusiness } from "@root/views/businesses/staticEventPartners";
import { addNotification } from "./notifications";
import errorHandler from "@services/errorHandler";

const fakeAPI = (res) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 10);
  });
};

export const getBusinesses = () => async (dispatch) => {
  try {
    const result = await fakeAPI(staticBusiness);
    if (result) {
      dispatch({ type: SET_BUSINESSES, payload: result });
    } else {
      dispatch(
        addNotification({
          error: true,
          content:
            "Unexpected server error occurred fetching event partners.",
          close: false,
          duration: 0,
        })
      );
    }
  } catch (error) {
    errorHandler("getBusinesses", error);
  }
};