import {
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  IUser,
  SET_USER_DETAILS
} from "../user";
import {
  createTransaction as apiCreateTransaction
} from "../../services/api";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../index";
import { Action } from "redux";
import {notify} from "../auth";
import {NavigationActions} from "react-navigation";

export const setUserDetails = (user: IUser) => ({ type: SET_USER_DETAILS, payload: user })


export const createTransaction = () => ({
  type: CREATE_TRANSACTION,
})

export const createTransactionFailure = () => ({
  type: CREATE_TRANSACTION_FAILURE,
})

export const createTransactionSuccess = () => ({
  type: CREATE_TRANSACTION_SUCCESS,
})


export const createTransactionAsync = (reference: string, slots: number): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  const state = getState();
  const id = state.user.data.id
  const guideId = state.tour.selectedTour.userId
  const tourId = state.tour.selectedTour.id
  
  dispatch(createTransaction())
  
  try {
    const result = await apiCreateTransaction({
      id,
      guideId,
      tourId,
      reference,
      slots
    })
    const { status, message, data } = result.data
    console.log(data)
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(createTransactionSuccess())
      dispatch(NavigationActions.navigate({ routeName: "viewTour" }))
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(createTransactionFailure())
    }
    
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(createTransactionFailure())
  }
}
