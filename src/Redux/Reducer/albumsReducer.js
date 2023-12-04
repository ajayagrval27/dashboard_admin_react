import { GETALBUMS } from '../Type/type'

export const albumsReducer = (state = {}, action) => {
	switch (action.type) {
		case GETALBUMS: {
			return action.data
		}
		default: {
			return state
		}
	}
}
