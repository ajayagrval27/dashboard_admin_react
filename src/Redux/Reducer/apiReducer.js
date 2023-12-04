import { GETUSERDATA } from '../Type/type'

export const apiReducer = (state = {}, action) => {
	switch (action.type) {
		case GETUSERDATA:
			return action.data

		default:
			return state
	}
}
