// import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from '../Type/type'

// const initialState = {
// 	user: null,
// 	isLoggedIn: false,
// 	error: null,
// }

// const authReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case LOGIN_REQUEST:
// 			return {
// 				...state,
// 				isLoading: true,
// 			}
// 		case LOGIN_SUCCESS:
// 			return {
// 				...state,
// 				user: action.payload,
// 				isLoggedIn: true,
// 				isLoading: false,
// 				error: null,
// 			}
// 		case LOGIN_FAIL:
// 			console.log('login fail', action.payload)
// 			return {
// 				...state,
// 				user: null,
// 				isLoggedIn: false,
// 				isLoading: false,
// 				error: action.payload,
// 			}
// 		case LOGOUT:
// 			console.log('logout', action.payload)
// 			return {
// 				...initialState,
// 			}
// 		default:
// 			return state
// 	}
// }

// export default authReducer
