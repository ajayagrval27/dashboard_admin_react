import { LOGIN_SUCCESS } from '../Type/type'

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS: {
			return action.data
		}

		default: {
			return state
		}
	}
}
