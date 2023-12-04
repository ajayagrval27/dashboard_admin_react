import { USERREGISTER } from '../Type/type'

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USERREGISTER: {
			// Add your code here
			return action.data
		}
		default: {
			return state
		}
	}
}
