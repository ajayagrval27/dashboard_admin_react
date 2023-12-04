import axios from 'axios'
import { USERREGISTER } from '../Type/type'

export const isUserRegister = (email) => {
	return (dispatch) => {
		axios
			.get(
				`https://iris-api.mycodelibraries.com/api/User/IsUserRegistered/${email}`
			)
			.then((res) => {
				dispatch({
					type: USERREGISTER,
					data: res.data.responseData,
				})
			})
			.catch((err) => {
				dispatch({
					type: USERREGISTER,
					data: err.message,
				})
			})
	}
}
