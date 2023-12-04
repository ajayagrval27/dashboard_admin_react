import { GETPRODETAIL } from '../Type/type'

export const proDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case GETPRODETAIL: {
			return action.data
		}
		default: {
			return state
		}
	}
}
