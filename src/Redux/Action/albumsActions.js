import axios from 'axios'

let auth = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
}

export const getAlbumsData = () => {
	if (localStorage.getItem('token')) {
		return (dispatch) => {
			axios
				.get(
					'https://iris-api.mycodelibraries.com/api/Album/GetAllAlbums',
					auth
				)
				.then((res) => {
					dispatch({
						type: 'GETALBUMS',
						data: res.data.responseData,
					})
				})
		}
	}
}

export const createAlbum = (albumObj) => {
	albumObj.albumArtworkAssociates = [
		{
			albumArtworkId: 0,
			albumId: 0,
			artworkBase64: 'string',
			artworkIndex: 0,
		},
	]
	albumObj.albumCostAssociates = [
		{
			albumCostId: 0,
			albumId: 0,
			costDetails: 'string',
			costFees: 0,
		},
	]
	albumObj.albumTrackAssociates = [
		{
			albumTrackId: 0,
			albumId: 0,
			trackId: 0,
		},
	]
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/Album/CreateAlbum',
				albumObj,
				auth
			)
			.then((res) => {
				dispatch(getAlbumsData())
			})
	}
}

export const updateAlbum = (editObj) => {
	editObj.albumArtworkAssociates = [
		{
			albumArtworkId: 0,
			albumId: 0,
			artworkBase64: 'string',
			artworkIndex: 0,
		},
	]
	editObj.albumCostAssociates = [
		{
			albumCostId: 0,
			albumId: 0,
			costDetails: 'string',
			costFees: 0,
		},
	]
	editObj.albumTrackAssociates = [
		{
			albumTrackId: 0,
			albumId: 0,
			trackId: 0,
		},
	]
	console.log(editObj)
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/Album/UpdateAlbum',
				editObj,
				auth
			)
			.then((res) => {
				dispatch(getAlbumsData())
			})
	}
}

export const deleteAlbum = (albumId) => {
	return (dispatch) => {
		axios
			.delete(
				`https://iris-api.mycodelibraries.com/api/Album/DeleteAlbum/${albumId}`,
				auth
			)
			.then((res) => {
				dispatch(getAlbumsData())
			})
	}
}
