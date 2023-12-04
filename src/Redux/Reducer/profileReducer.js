import { GETPROFILEDATA } from '../Type/type'

export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case GETPROFILEDATA: {
			return action.data
		}
		default: {
			return state
		}
	}
}
