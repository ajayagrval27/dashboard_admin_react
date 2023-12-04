import { combineReducers } from 'redux'
import { apiReducer } from './apiReducer'
import { loginReducer } from './logInReducer'
import { userRegisterReducer } from './userRegisterReducer'
import { profileReducer } from './profileReducer'
import { allProjectsReducer } from './allProjectsReducer'
import { recActivitesReducer } from './recActivitesReducer'
import { albumsReducer } from './albumsReducer'
import { proDetailReducer } from './proDetailReducer'
import { changePassReducer } from './changePassReducer'

export const rootReducer = combineReducers({
	api: apiReducer,
	logIn: loginReducer,
	userRegister: userRegisterReducer,
	profileData: profileReducer,
	allProjects: allProjectsReducer,
	recentActivites: recActivitesReducer,
	albumsData: albumsReducer,
	profileDetail: proDetailReducer,
	chandePassword: changePassReducer,
})
