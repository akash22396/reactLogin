
import { createStore, applyMiddleware } from 'redux' //combineReducers,
import thunk from 'redux-thunk'
// import localStorage from 'localStorage'
// const token = localStorage.get('token')

// console.log(token)
const initialState = {
    login: false,
    userInfo: {},
    products: []
}


const userLoginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'LOGIN_ST':
            return {
                ...state,
                login: payload
            }
        case 'GET_USER_DATA':
            return {
                ...state,
                userInfo: payload
            }

        default: return state
    }
}

/*
const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'PRODUCT_DATA':
            return {
                ...state,
                login: payload
            }
        default: return state
    }
}*/
const middleware = [thunk]

// const allReducer = combineReducers(userLoginReducer, productReducer)

const store = createStore(userLoginReducer, applyMiddleware(...middleware))

export default store