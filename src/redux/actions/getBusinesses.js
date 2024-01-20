// import { Api } from "@services/index";
// import { addNotification } from "./notifications";
// import errorHandler from "@services/errorHandler";
// import { GET_BUSINESSES } from "@actions/index";
import { staticBusiness } from "@root/views/businesses/staticEventPartners";

export const getBusinesses = () => async (dispatch) => {
  // temp fake api call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(staticBusiness);
    }, 10); 
  });
};
