import axios from 'axios'
import Swal from 'sweetalert2'

export const LogiInAcess = (obj, navigate) => {
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/User/LoginAuthenticate',
				obj
			)
			.then((res) => {
				const user = res.data
				if (user.isSuccess === true) {
					dispatch({
						type: 'LOGIN_SUCCESS',
						payload: user.responseData,
						isLoggedIn: true,
					})
					localStorage.setItem('isLoggedIn', true)
					localStorage.setItem('token', user.responseData.token)
					localStorage.setItem('userName', user.responseData.fullName)
					localStorage.setItem('id', user.responseData.id)
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Login Successfull',
						showConfirmButton: false,
						toast: true,
						timerProgressBar: true,
						timer: 1500,
					}).then(() => {
						navigate('/dashboard')
					})
				} else {
					dispatch({
						type: 'LOGIN_FAIL',
						payload: user.errorMessage,
					})
					alert(user.errorMessage)
				}
			})
			.catch((error) => {
				dispatch({ type: 'LOGIN_FAIL', payload: error.message })
			})
	}
}

export const logout = () => {
	return (dispatch) => {
		dispatch({ type: 'LOGOUT', payload: false })
	}
}

// export const LogiInAcess = (obj, navigate) => {
// 	return (dispatch) => {
// 		axios
// 			.post(
// 				'https://iris-api.mycodelibraries.com/api/User/LoginAuthenticate',
// 				obj
// 			)
// 			.then((res) => {
// 				dispatch({
// 					type: 'LOGIN_SUCCESS',
// 					data: res.data,
// 					isLogin: true,
// 				})
// 				console.log(res.data)
// 				if (res.data.isSuccess) {
// 					localStorage.setItem('token', res.data.responseData.token)
// 					localStorage.setItem(
// 						'userName',
// 						res.data.responseData.fullName
// 					)
// 					localStorage.setItem('id', res.data.responseData.id)
// 					Swal.fire({
// 						position: 'center',
// 						icon: 'success',
// 						title: 'Login Successfull',
// 						showConfirmButton: false,
// 						toast: true,
// 						timerProgressBar: true,
// 						timer: 2000,
// 					}).then(() => {
// 						navigate('/')
// 					})
// 				} else {
// 					alert(res.data.errorMessage)
// 				}
// 			})
// 	}
// }
