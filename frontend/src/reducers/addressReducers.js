import {
    ADDRESS_DETAILS_REQUEST,
    ADDRESS_DETAILS_SUCCESS,
    ADDRESS_DETAILS_FAIL,
    ADDRESS_DETAILS_RESET,
    ADDRESS_UPDATE_REQUEST,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAIL,
    ADDRESS_UPDATE_RESET,
    ADDRESS_DELETE_REQUEST,
    ADDRESS_DELETE_SUCCESS,
    ADDRESS_DELETE_FAIL
} from '../constants/addressConstants'


export const addressDetailsReducer = (state = { addres:{}}, action) => {
    switch (action.type) {
        case ADDRESS_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ADDRESS_DETAILS_SUCCESS:
            return { loading: false, addres: action.payload }
        case ADDRESS_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case ADDRESS_DETAILS_RESET:
            return {}    
        default:
            return state
    }
}

export const updateAddressReducer = (state = { addres:{}}, action) => {
    switch (action.type) {
        case ADDRESS_UPDATE_REQUEST:
            return { loading: true, ...state }
        case ADDRESS_UPDATE_SUCCESS:
            return { loading: false, addres: action.payload }
        case ADDRESS_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ADDRESS_UPDATE_RESET:
            return {}    
        default:
            return state
    }
}


export const addressDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ADDRESS_DELETE_REQUEST:
            return { loading: true }
        case ADDRESS_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ADDRESS_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}