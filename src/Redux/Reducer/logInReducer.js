// import { LOGIN_SUCCESS } from '../Type/type'

// export const loginReducer = (state = {}, action) => {
// 	switch (action.type) {
// 		case LOGIN_SUCCESS: {
// 			return action.data
// 		}
// 		default: {
// 			return state
// 		}
// 	}
// }

import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from '../Type/type'

// console.log(JSON.parse(localStorage.getItem('isLoggedIn') === 'true') ?? false)

const initialState = {
	user: null,
	isLoading: false,
	isLoggedIn:
		JSON.parse(localStorage.getItem('isLoggedIn') === 'true') ?? false,
	// isLoggedIn: localStorage.getItem('token') ? true : false,
	error: null,
}

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
				isLoading: false,
				error: null,
			}
		case LOGIN_FAIL:
			return {
				...state,
				user: null,
				isLoggedIn: false,
				isLoading: false,
				error: action.payload,
			}
		case LOGOUT:
			console.log('logout')
			return {
				...state,
				user: null,
				isLoggedIn: false,
				isLoading: false,
				error: null,
			}
		// return {
		// 	...initialState,
		// }
		default:
			return state
	}
}
