import axios from 'axios'

let auth = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
}

export const getProfileData = () => {
	if (localStorage.getItem('token')) {
		return (dispatch) => {
			axios
				.get(
					'https://iris-api.mycodelibraries.com/api/Profile/GetAllProfile',
					auth
				)
				.then((res) => {
					dispatch({
						type: 'GETPROFILEDATA',
						data: res.data.responseData,
					})
				})
		}
	}
}

export const createProfileData = (profileObj) => {
	profileObj.bankDetails = [profileObj.bankDetails]
	// profileObj.bankDetails[0].profileBankAssociateId = 0
	// profileObj.bankDetails[0].profileId = 0
	profileObj.role = [
		{
			profileRoleAssociateId: 0,
			profileId: 0,
			roleType: 1,
		},
	]
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/Profile/CreateProfile',
				profileObj,
				auth
			)
			.then((res) => {
				dispatch(getProfileData())
			})
	}
}

export const updateProfileData = (profileObj) => {
	// profileObj.bankDetails = profileObj.profileBankAssociateResponses

	 let a = {
			id: profileObj.id,
			displayName: profileObj.displayName,
			birthdate: profileObj.birthdate,
			email: profileObj.email,
			idNumber: profileObj.idNumber,
			address: profileObj.address,
			bankDetails: [
				{
					profileBankAssociateId: 0,
					profileId: 0,
					bankAddress: profileObj.bankDetails.bankAddress,
					bankInfo: profileObj.bankDetails.bankInfo,
					cardHolder: profileObj.bankDetails.cardHolder,
					cardType: profileObj.bankDetails.cardType,
					cardNo: profileObj.bankDetails.cardNo,
					tel: profileObj.bankDetails.tel,
				},
			],
			profileImageBase64: 'string',
			role: [
				{
					profileRoleAssociateId: 0,
					profileId: 0,
					roleType: 1,
				},
			],
			advanceType: profileObj.advanceType,
			advanceAmount: profileObj.advanceAmount,
			contractStartDate: profileObj.contractStartDate,
			contractEndDate: profileObj.contractEndDate,
			contractTotalMonths: profileObj.contractTotalMonths,
			userId: profileObj.userId,
			alternativeName: profileObj.alternativeName,
			chineseName: profileObj.chineseName,
			artistName: profileObj.artistName,
		}
	console.log(profileObj)
	return (dispatch) => {
		axios
			.post(
				'https://iris-api.mycodelibraries.com/api/Profile/UpdateProfile',
				a,
				auth
			)
			.then((res) => {
				dispatch(getProfileData())
			})
	}
}

export const deleteProfileData = (id) => {
	return (dispatch) => {
		axios
			.delete(
				`https://iris-api.mycodelibraries.com/api/Profile/DeleteProfile/${id}`,
				auth
			)
			.then((res) => {
				dispatch(getProfileData())
			})
	}
}

// export const clearProfileData = () => {
// 	return (dispatch) => {
// 		axios
// 			.get(
// 				'https://iris-api.mycodelibraries.com/api/Profile/GetAllProfile'
// 			)
// 			.then((res) => {
// 				res.data.responseData.map((x) => {
// 					axios
// 						.delete(
// 							`https://iris-api.mycodelibraries.com/api/Profile/DeleteProfile/${x.id}`,
// 							auth
// 						)
// 						.then((res) => {
// 							dispatch(getProfileData())
// 						})
// 					return null
// 				})
// 			})
// 	}
// }
