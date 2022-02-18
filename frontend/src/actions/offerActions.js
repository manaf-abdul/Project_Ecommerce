import { OFFER_LIST_FAIL, OFFER_LIST_REQUEST, OFFER_LIST_SUCCESS,OFFER_ADD_REQUEST,OFFER_ADD_SUCCESS,OFFER_ADD_FAIL, OFFER_DELETE_REQUEST, OFFER_DELETE_SUCCESS, OFFER_DELETE_FAIL } from "../constants/offerConstants"
import axios from 'axios'


export const listOffers = ()=>async (dispatch,getState)=>{
    try {
        dispatch({type:OFFER_LIST_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = { headers: {Authorization: `Bearer ${userInfo.token}`},}
        const {data}=await axios.get(`/api/offers`,config)
        // console.log(data)
        dispatch({type:OFFER_LIST_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: OFFER_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }


export const addOffer = (offer)=>async (dispatch)=>{
    try {
        dispatch({type:OFFER_ADD_REQUEST})
        const config = { headers: {'Content-Type': 'application/json',},}
        const {data}=await axios.post('/api/offers',offer,config)
        // console.log(data)
        dispatch({type:OFFER_ADD_SUCCESS,createSuccess:true,payload:data})
    } catch (error) {
        dispatch({type: OFFER_ADD_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }  


export const deleteOffer = (id) => async (dispatch, getState) => {
    try {
      dispatch({type: OFFER_DELETE_REQUEST,})  
      const {userLogin: { userInfo },} = getState()
      const config = {headers: {Authorization: `Bearer ${userInfo.token}`,},}
      await axios.delete(`/api/offers/${id}`, config)
      dispatch({type: OFFER_DELETE_SUCCESS,})
    } catch (error) {
        dispatch({type: OFFER_DELETE_FAIL,
        payload:error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message})
    }
  }