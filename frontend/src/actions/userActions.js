import axios from 'axios'
import { USER_LOGIN_SUCCESS,
     USER_LOGIN_FAIL,
     USER_LOGIN_REQUEST,
     USER_LOGOUT,
     USER_REGISTER_REQUEST,
     USER_REGISTER_SUCCESS,
     USER_REGISTER_FAIL,
     USER_DETAILS_REQUEST,
     USER_DETAILS_SUCCESS,
     USER_DETAILS_FAIL,
     USER_DETAILS_RESET,
     USER_UPDATE_PROFILE_REQUEST,
     USER_UPDATE_PROFILE_SUCCESS,
     USER_UPDATE_PROFILE_FAIL,
     USER_LIST_REQUEST,
     USER_LIST_SUCCESS,
     USER_LIST_FAIL,
     USER_LIST_RESET,
     USER_UPDATE_REQUEST,
     USER_UPDATE_SUCCESS,
     ADD_ADDRESSES,
     LOAD_ADDRESSES}
from '../constants/userConstants'
import {ORDER_LIST_MY_RESET} from '../constants/orderConstants'

export const login = (email,password)=>async (dispatch)=>{
        try {
            dispatch({type:USER_LOGIN_REQUEST})
            const config = { headers: {'Content-Type': 'application/json',},}
            const {data}=await axios.post('/api/users/login',{email,password},config)
            // console.log(data)
            dispatch({type:USER_LOGIN_SUCCESS,payload:data})
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            dispatch({type: USER_LOGIN_FAIL,
                payload:
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
              })
        }
}

export const logout =()=>(dispatch)=>{
  localStorage.removeItem('userInfo');
  dispatch({type:USER_LOGOUT})
  dispatch({type:USER_DETAILS_RESET})
  dispatch({type:ORDER_LIST_MY_RESET})
}

export const register = (name,email,password,refferalId)=>async (dispatch)=>{
  try {
      dispatch({type:USER_REGISTER_REQUEST})
      const config = { headers: {'Content-Type': 'application/json',},}
      const {data}=await axios.post('/api/users/register',{name,email,password,refferalId},config)
      console.log(data)
      dispatch({type:USER_REGISTER_SUCCESS,payload:data})
      dispatch({type:USER_LOGIN_SUCCESS, payload:data})
      localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
      dispatch({type: USER_REGISTER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
  }
}

export const getUserDetails = (id)=>async (dispatch,getState)=>{
  try {
      dispatch({type:USER_DETAILS_REQUEST})
      const {userLogin:{userInfo}} = getState()
      const config = { headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`},}
      const {data}=await axios.get(`/api/users/${id}`,config)
      dispatch({type:USER_DETAILS_SUCCESS,payload:data})
  } catch (error) {
      dispatch({type: USER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
  }
}

export const updateUserProfile = (user)=>async (dispatch,getState)=>{
  try {
      dispatch({type:USER_UPDATE_PROFILE_REQUEST})
      const {userLogin:{userInfo}} = getState()
      const config = { headers: {'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`},}
      const {data}=await axios.put(`/api/users/profile`,user,config)
      // console.log(data)
      dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data})
  } catch (error) {
      dispatch({type: USER_UPDATE_PROFILE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
  }
}

export const listUsers = ()=>async (dispatch,getState)=>{
  try {
      dispatch({type:USER_LIST_REQUEST})
      const {userLogin:{userInfo}} = getState()
      const config = { headers: {Authorization: `Bearer ${userInfo.token}`},}
      const {data}=await axios.get(`/api/users/getusers`,config)
      // console.log(data)
      dispatch({type:USER_LIST_SUCCESS,payload:data})
  } catch (error) {
      dispatch({type: USER_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {dispatch({type: USER_UPDATE_REQUEST})
    const {userLogin: { userInfo },} = getState()

    const config = {headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/${user._id}`, user, config)
    dispatch({ type: USER_UPDATE_SUCCESS })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
    dispatch({ type: USER_DETAILS_RESET })
  }catch (error) {
    dispatch({type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
}
}

export const addTOAddresses = (address) => async (dispatch, getState) => {
  try {
    const {userLogin: { userInfo },} = getState()
    const config = {headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/address/${userInfo._id}`, address, config)
    dispatch({ type: ADD_ADDRESSES })
  }catch (error) {
    dispatch({
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
}
}


export const listAddresses = (address) => async (dispatch, getState) => {
  try {
    const {userLogin: { userInfo },} = getState()
    const config = {headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/address/${userInfo._id}`, address, config)
    dispatch({ type: LOAD_ADDRESSES,payload:data })
  }catch (error) {
    dispatch({
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
}
}


