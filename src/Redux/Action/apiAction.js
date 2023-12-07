import axios from 'axios'

let auth = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
}

export const getApiData = () => {
	if (localStorage.getItem('token')) {
		return (dispatch) => {
			axios
				.get(
					'https://iris-api.mycodelibraries.com/api/User/GetAllUsers',
					auth
				)
				.then((res) => {
					dispatch({
						type: 'GETUSERDATA',
						data: res.data.responseData,
					})
				})
		}
	} else {
		return (dispatch) => {
			dispatch({
				type: 'GETUSERDATA',
				data: [],
			})
		}
	}
}

export const createApiData = (userObj) => {
	userObj = {
		email: userObj.email,
		fullName: userObj.fullName,
		mobileNumber: userObj.mobileNumber,
		password: userObj.password,
		roleId: userObj.roleId,
		profileImageBase64: userObj.profileImageBase64,
		userRole: [
			{
				userRoleId: 0,
				userId: 0,
				roleType: 1,
			},
		],
	}
	console.log(userObj)

	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/User/CreateUser',
				userObj
			)
			.then((res) => {
				dispatch({
					type: 'CREATEUSER',
					data: res.data.responseData,
				})
			})
	}
}
