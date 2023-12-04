import { GETRECENTACTIVITIES } from '../Type/type'

export const recActivitesReducer = (state = {}, action) => {
	switch (action.type) {
		case GETRECENTACTIVITIES: {
			return action.data
		}
		default: {
			return state
		}
	}
}
