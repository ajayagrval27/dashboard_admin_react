import { GETALLPROJECTS } from '../Type/type'

export const allProjectsReducer = (state = {}, action) => {
	switch (action.type) {
		case GETALLPROJECTS: {
			return action.data
		}
		default: {
			return state
		}
	}
}
