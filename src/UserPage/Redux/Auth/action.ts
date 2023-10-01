
import { Dispatch } from 'redux';
import { AddCartProductToAPI, GetAllUserDataFromAPI, PostUserDataInAPI } from '../../Utilis/api';
import { ADD_CART_PRODUCT_SUCCESS, AUTH_ADD_NEW_USER_DATA, AUTH_ALL_USER_DATA, AUTH_FAILURE, AUTH_LOGOUT_SUCCESS, AUTH_SUCCESS } from '../actionTypes';

// Define action types and payloads
type AuthAllUserDataAction = {
  type: typeof AUTH_ALL_USER_DATA;
  payload: any; // Change 'any' to match the actual data type of your payload
};

type AuthFailureAction = {
  type: typeof AUTH_FAILURE;
};

// Define the action types as a union type
type AuthActionTypes = AuthAllUserDataAction | AuthFailureAction;

// Define the GetAllUserData function with TypeScript types
export const GetAllUserData = (dispatch: Dispatch<AuthActionTypes>): void => {
  GetAllUserDataFromAPI()
    .then((res) =>{
         dispatch({ type: AUTH_ALL_USER_DATA, payload: res.data })})
    .catch((err) => dispatch({ type: AUTH_FAILURE }));
};

export const PostUserData =(newUser:any)=> (dispatch: Dispatch<AuthActionTypes>): void => {
    PostUserDataInAPI(newUser)
    .then((res) =>{
           dispatch({ type: AUTH_ADD_NEW_USER_DATA, payload: res.data })})

  };

export const StoringUserDatainLS=(userData:any)=>(dispatch:Dispatch)=>{
localStorage.setItem("LoginedUserData",JSON.stringify(userData));
localStorage.setItem("LoginedUserDataID",JSON.stringify(userData.id))
localStorage.setItem("isAuth","true")

dispatch({type:AUTH_SUCCESS,payload:userData})
}
export const LogoutStoringUserDatainLS=(dispatch:Dispatch)=>{
    localStorage.setItem("LoginedUserData","");
    localStorage.setItem("LoginedUserDataID","")
    localStorage.setItem("isAuth","false")
    dispatch({type:AUTH_LOGOUT_SUCCESS})
    }

    export const AddCartProduct=(userData:any)=>(dispatch:Dispatch)=>{
        localStorage.setItem("LoginedUserData",JSON.stringify(userData));
        AddCartProductToAPI(userData).then(res=>
            dispatch({type:ADD_CART_PRODUCT_SUCCESS,payload:userData})
            )
     

    }
