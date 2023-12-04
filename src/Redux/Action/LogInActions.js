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
				dispatch({
					type: 'LOGIN_SUCCESS',
					data: res.data,
					isLogin: true,
				})
				if (res.data.isSuccess) {
					localStorage.setItem('token', res.data.responseData.token)
					localStorage.setItem(
						'userName',
						res.data.responseData.fullName
					)
					localStorage.setItem('id', res.data.responseData.id)
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: 'Login Successfull',
						showConfirmButton: false,
						toast: true,
						timerProgressBar: true,
						timer: 1500,
					}).then(() => {
						navigate('/')
					})
				} else {
					alert(res.data.errorMessage)
				}
			})
	}
}
