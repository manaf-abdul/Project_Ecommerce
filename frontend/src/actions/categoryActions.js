import axios from 'axios'
import {CATEGORY_LIST_FAIL,CATEGORY_LIST_SUCCESS,CATEGORY_LIST_REQUEST,CATEGORY_LIST_RESET} from '../constants/categoryConstants'


export const listCategories = ()=>async (dispatch,getState)=>{
    try {
        dispatch({type:CATEGORY_LIST_REQUEST})
        const {userLogin:{userInfo}} = getState()
        const config = { headers: {Authorization: `Bearer ${userInfo.token}`},}
        const {data}=await axios.get(`/api/categories`,config)
        console.log(data)
        dispatch({type:CATEGORY_LIST_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type: CATEGORY_LIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
    }
  }