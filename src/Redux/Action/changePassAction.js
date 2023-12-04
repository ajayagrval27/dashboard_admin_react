import axios from 'axios'

let auth = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
}

export const updateChangePassword = (passObj) => {
	passObj.id = localStorage.getItem('id')
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/User/ChangePassword',
				passObj,
				auth
			)
			.then((res) => {
				dispatch({
					type: 'CHANGEPASSWORD',
					data: res.data.isSuccess,
				})
				if (res.data.isSuccess) {
					alert('Password Changed Successfully')
				} else {
					alert('Password Not Matched')
				}
			})
	}
}
