// import axios from 'axios'
// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../Type/type'

// export const login = (loginObj) => {
// 	return (dispatch) => {
// 		dispatch({ type: LOGIN_REQUEST })
// 		axios
// 			.post(
// 				'https://iris-api.mycodelibraries.com/api/User/LoginAuthenticate',
// 				loginObj
// 			)
// 			.then((response) => {
// 				const user = response.data
// 				console.log(user)
// 				if (
// 					user.responseData !== null &&
// 					user.responseData !== undefined
// 				) {
// 					dispatch({
// 						type: LOGIN_SUCCESS,
// 						payload: user.responseData,
// 					})
// 					localStorage.setItem(
// 						'token',
// 						JSON.stringify(user.responseData.token)
// 					)
// 					localStorage.setItem(
// 						'name',
// 						JSON.stringify(user.responseData.fullName)
// 					)
// 					localStorage.setItem(
// 						'id',
// 						JSON.stringify(user.responseData.id)
// 					)
// 				} else {
// 					dispatch({
// 						type: LOGIN_FAIL,
// 						payload: user.errorMessage,
// 					})
// 					console.log(user.errorMessage)
// 				}
// 			})
// 			.catch((error) => {
// 				dispatch({ type: LOGIN_FAIL, payload: error.message })
// 			})
// 	}
// }

// export const logout = () => {
// 	return (dispatch) => {
// 		dispatch({ type: LOGOUT, payload: false })
// 	}
// }
