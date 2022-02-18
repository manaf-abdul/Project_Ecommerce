import axios from 'axios'
import { ADDRESS_DELETE_FAIL, ADDRESS_DELETE_REQUEST, ADDRESS_DELETE_SUCCESS, ADDRESS_DETAILS_FAIL, ADDRESS_DETAILS_REQUEST, ADDRESS_DETAILS_SUCCESS, ADDRESS_UPDATE_FAIL, ADDRESS_UPDATE_REQUEST, ADDRESS_UPDATE_SUCCESS } from '../constants/addressConstants'

export const getAddressDetails = (id)=>async (dispatch,getState)=>{
    try {
        dispatch({type:ADDRESS_DETAILS_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = { headers: {'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`},}
        const {data}=await axios.get(`/api/address/detail/${id}`,config)
        console.log(data)
        // console.log(data)
        dispatch({type:ADDRESS_DETAILS_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: ADDRESS_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }
 

export const updateAddress= (address)=>async (dispatch,getState)=>{
    try {
        dispatch({type:ADDRESS_UPDATE_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = { headers: {'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`},}
        const {data}=await axios.put(`/api/address/detail/${address.id}`,address,config)
        console.log(data)
        // console.log(data)
        dispatch({type:ADDRESS_UPDATE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: ADDRESS_UPDATE_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }  
  

export const deleteAddress = (id) => async (dispatch, getState) => {
    try {
      dispatch({type: ADDRESS_DELETE_REQUEST,})  
      const {userLogin: { userInfo },} = getState()
      const config = {headers: {Authorization: `Bearer ${userInfo.token}`,},}
      await axios.delete(`/api/address/${id}`, config)
      dispatch({type: ADDRESS_DELETE_SUCCESS,})
    } catch (error) {
        dispatch({type: ADDRESS_DELETE_FAIL,
        payload:error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message})
    }
  }  