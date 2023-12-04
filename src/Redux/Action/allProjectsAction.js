import axios from 'axios'

let auth = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
}

export const getAllProjects = () => {
	if (localStorage.getItem('token')) {
		return (dispatch) => {
			axios
				.get(
					'https://iris-api.mycodelibraries.com/api/Admin/GetAllProjects',
					auth
				)
				.then((res) => {
					dispatch({
						type: 'GETALLPROJECTS',
						data: res.data.responseData.albumsResponses,
					})
				})
		}
	}
}
