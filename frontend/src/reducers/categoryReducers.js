import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_RESET, CATEGORY_LIST_SUCCESS } from "../constants/categoryConstants"

export const categoryListReducer = (state = { categorieslist: [] }, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return {categorieslist:[],loading: true }
      case CATEGORY_LIST_SUCCESS:
        return { loading: false, categorieslist:action.payload}
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload.data}
      case CATEGORY_LIST_RESET:
        return {
            categorieslist: [],
        }
      default:
        return state
    }
  }