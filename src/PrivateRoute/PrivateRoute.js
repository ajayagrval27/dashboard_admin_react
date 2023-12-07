import React from 'react'
import { Navigate, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateRoutes = ({ path, element }) => {
	const { isLoggedIn } = useSelector((state) => state.auth)
	console.log(isLoggedIn)
	// let auth = { token: false }
	// return auth.token ? <Outlet /> : <Navigate to="/login" />
	return isLoggedIn ? (
		<Routes path={path} element={element} />
	) : (
		<Navigate to="/login" />
	)
}
