import axios from 'axios'
import Swal from 'sweetalert2'

export const LogiInAcess = (obj, navigate) => {
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/User/LoginAuthenticate',
				obj
			)
			.then(async (res) => {
				const user = res.data
				if (user.isSuccess === true) {
					await dispatch({
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
						timer: 1000,
					}).then(() => {
						navigate('/dashboard')
					})
				} else {
					dispatch({
						type: 'LOGIN_FAIL',
						payload: user.errorMessage,
					})
					Swal.fire({
						icon: 'error',
						title: user.errorMessage,
						text: 'Something went wrong!',
						toast: true,
					})
				}
			})
			.catch((error) => {
				dispatch({ type: 'LOGIN_FAIL', payload: error.message })
			})
	}
}

export const logout = (navigate) => {
	return (dispatch) => {
		Swal.fire({
			title: 'Are you sure you want to log out?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			cancelButtonColor: '#3085d6',
			confirmButtonColor: '#d33',
			confirmButtonText: 'Yes Log Out!',
			toast: true,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch({ type: 'LOGOUT', payload: false, isLoggedIn: false })
				localStorage.setItem('isLoggedIn', false)
				localStorage.removeItem('token')
				localStorage.removeItem('userName')
				localStorage.removeItem('id')
				Swal.fire({
					title: 'Logged Out',
					text: 'You have been logged out.',
					icon: 'success',
					toast: true,
				})
				navigate('/login')
			}
		})
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
