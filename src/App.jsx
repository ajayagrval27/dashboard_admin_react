import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Components/Dashboard'
import Profile from './Components/Profile'
import Project from './Components/Project'
import Albums from './Components/Albums'
import RecentActivites from './Components/RecentActivites'
import Login from './Pages/Login'
import SingUp from './Pages/SingUp'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getApiData } from './Redux/Action/apiAction'
import { getProfileData } from './Redux/Action/profileAction'
import ProfileDetails from './Pages/ProfileDetails'

function App() {
	const dispatch = useDispatch()
	const isLogIn = localStorage.getItem('token') ?? false

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(getApiData())
			dispatch(getProfileData())
		}
	}, [dispatch])

	return (
		<>
			<BrowserRouter>
				<Routes>
					{isLogIn ? (
						<>
							<Route
								path="/"
								element={<Navigate to="/dashboard" />}
							/>
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/project" element={<Project />} />
							<Route path="/albums" element={<Albums />} />
							<Route
								path="/recentActivites"
								element={<RecentActivites />}
							/>
							<Route
								path="/profileDetail"
								element={<ProfileDetails />}
							/>
						</>
					) : (
						<>
							<Route
								path="/"
								element={<Navigate to="/login" />}
							/>
						</>
					)}
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SingUp />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
