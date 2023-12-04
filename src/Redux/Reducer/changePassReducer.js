import { CHANGEPASSWORD } from "../Type/type"

export const changePassReducer = (state = {}, action) => {
	switch (action.type) {
		case CHANGEPASSWORD: {
			return action.data
		}
		default: {
			return state
		}
	}
}
