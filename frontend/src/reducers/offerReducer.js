import { OFFER_ADD_FAIL, OFFER_ADD_REQUEST, OFFER_ADD_SUCCESS, OFFER_LIST_FAIL, OFFER_LIST_REQUEST, OFFER_LIST_RESET, OFFER_LIST_SUCCESS,OFFER_DELETE_REQUEST,OFFER_DELETE_SUCCESS,OFFER_DELETE_FAIL, OFFER_DELETE_RESET} from "../constants/offerConstants"


export const offerListReducer = (state = { offerslist: [] }, action) => {
    switch (action.type) {
      case OFFER_LIST_REQUEST:
        return {...state,loading: true }
      case OFFER_LIST_SUCCESS:
        return { loading: false, offerslist:action.payload}
      case OFFER_LIST_FAIL:
        return { loading: false, error: action.payload.data}
      case OFFER_LIST_RESET:
        return {
            offerslist: [],
        }
      default:
        return state
    }
  }

export const addNewOfferReducer=(state={},action)=>{
    switch(action.type){
        case OFFER_ADD_REQUEST:
            return {loading:true}
        case OFFER_ADD_SUCCESS:
            return {loading:false,success:true}   
        case OFFER_ADD_FAIL:
            return {loading:false,error:action.payload}        
        default:
            return state
    }
}


export const offerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
      case OFFER_DELETE_REQUEST:
          return { loading: true,success:false }
      case OFFER_DELETE_SUCCESS:
          return { loading: false, success: true }
      case OFFER_DELETE_FAIL:
          return { loading: false, error: action.payload }
      case OFFER_DELETE_RESET:
          return {}    
      default:
          return state
  }
}
