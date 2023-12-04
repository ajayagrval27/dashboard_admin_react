import axios from 'axios'

let auth = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
}

export const getProfileDetail = (userId) => {
	if (localStorage.getItem('token')) {
		return (dispatch) => {
			axios
				.get(
					`https://iris-api.mycodelibraries.com/api/User/GetUser/${userId}`,
					auth
				)
				.then((res) => {
					dispatch({
						type: 'GETPRODETAIL',
						data: res.data.responseData,
					})
				})
		}
	}
}

export const UpdateProfileDetail = (profileObj) => {
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/User/UpdateUser',
				profileObj,
				auth
			)
			.then((res) => {
				dispatch(getProfileDetail(profileObj.id))
			})
	}
}
