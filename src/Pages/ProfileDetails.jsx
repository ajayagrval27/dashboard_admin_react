import React, { useState } from 'react'
import SidebarMenus from '../Components/SidebarMenus'
import Header from '../Components/Header'
import '../Assets/Css/ProfileDetails.css'
import { Card, Box, styled } from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTab from '@mui/material/Tab'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
	UpdateProfileDetail,
	getProfileDetail,
} from '../Redux/Action/proDetailAction'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { updateChangePassword } from '../Redux/Action/changePassAction'
import { motion } from 'framer-motion'

export const TabAccount = () => {
	let [userId, setUserId] = useState(localStorage.getItem('id'))
	const dispatch = useDispatch()
	const profileDetail = useSelector((state) => state.profileDetail)
	let [proObj, setProObj] = useState({})
	let [proBlankObj, setProBlankObj] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getProfileDetail(userId))
	}, [dispatch, userId])

	useEffect(() => {
		setProObj(profileDetail)
	}, [])

	const addData = (e) => {
		let { name, value } = e.target
		setProObj({ ...proObj, [name]: value })
		setProBlankObj({ ...proBlankObj, [name]: '' })
	}

	const submitData = (e) => {
		dispatch(UpdateProfileDetail(proObj))
		setProObj({ ...proBlankObj })
		navigate('/')
	}

	const resetData = () => {
		console.log('reset')
		setProObj({ ...proBlankObj })
	}
	console.log(proObj, 'proObj')

	return (
		<CardContent>
			<motion.form
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					stiffness: 150,
					duration: 0.5,
				}}
			>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="FullName"
							name="fullName"
							onChange={addData}
							value={proObj.fullName ?? ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Mobile Number"
							name="mobileNumber"
							onChange={addData}
							value={proObj.mobileNumber ?? ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Email"
							type="email"
							name="email"
							onChange={addData}
							value={proObj.email ?? ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl fullWidth>
							<InputLabel>Role</InputLabel>
							<Select
								label="Role"
								name="roleId"
								onChange={addData}
								value={proObj.role?.id ?? ''}
							>
								<MenuItem value={1}>Administrator</MenuItem>
								<MenuItem value={2}>Client</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							className="btn-color"
							sx={{
								marginRight: 3.5,
							}}
							onClick={submitData}
						>
							Save Changes
						</Button>
						<Button
							type="button"
							variant="outlined"
							color="secondary"
							onClick={resetData}
						>
							Reset
						</Button>
					</Grid>
				</Grid>
			</motion.form>
		</CardContent>
	)
}

const TabSecurity = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// const passwordData = useSelector((state) => state.chandePassword)
	let [passObj, setPassObj] = useState({
		currentPassword: '',
		password: '',
	})
	let [passBlankObj, setPassBlankObj] = useState({})
	const [isVisible, setIsVisible] = useState(false)
	const togglePassword = () => setIsVisible(!isVisible)

	const addData = (e) => {
		let { name, value } = e.target
		setPassObj({ ...passObj, [name]: value })
		setPassBlankObj({ ...passBlankObj, [name]: '' })
	}

	const resetData = () => {
		setPassObj({ ...passBlankObj })
	}

	const submitData = (e) => {
		if (passObj.currentPassword === '' && passObj.password === '') {
			alert('Please fill the password field')
		} else {
			dispatch(updateChangePassword(passObj))
			setPassObj({ ...passBlankObj })
			navigate('/dashboard')
			console.log(passObj, 'fdfg')
		}
	}

	return (
		<>
			<motion.form
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					type: 'spring',
					stiffness: 150,
					duration: 0.5,
				}}
			>
				<CardContent sx={{ paddingBottom: 0 }}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<Grid container spacing={3}>
								<Grid item xs={12} sx={{ marginTop: 1 }}>
									<FormControl fullWidth>
										<InputLabel htmlFor="current-password">
											Current Password
										</InputLabel>
										<OutlinedInput
											label="Current Password"
											name="currentPassword"
											onChange={addData}
											type={
												isVisible ? 'text' : 'password'
											}
											value={
												passObj.currentPassword ?? ''
											}
											id="current-password"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														edge="end"
														aria-label="toggle password visibility"
														onClick={togglePassword}
													>
														{isVisible ? (
															<EyeOutline />
														) : (
															<EyeOffOutline />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>
								</Grid>

								<Grid item xs={12} sx={{ marginTop: 3 }}>
									<FormControl fullWidth>
										<InputLabel htmlFor="account-settings-new-password">
											New Password
										</InputLabel>
										<OutlinedInput
											label="New Password"
											name="password"
											onChange={addData}
											type={
												isVisible ? 'text' : 'password'
											}
											value={passObj.password ?? ''}
											id="account-settings-new-password"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														edge="end"
														aria-label="toggle password visibility"
														onClick={togglePassword}
													>
														{isVisible ? (
															<EyeOutline />
														) : (
															<EyeOffOutline />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>
								</Grid>

								{/* <Grid item xs={12}>
									<FormControl fullWidth>
										<InputLabel htmlFor="account-settings-confirm-new-password">
											Confirm New Password
										</InputLabel>
										<OutlinedInput
											label="Confirm New Password"
											name="confirmNewPassword"
											onChange={addData}
											value={
												passObj.confirmNewPassword ?? ''
											}
											id="account-settings-confirm-new-password"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														edge="end"
														aria-label="toggle password visibility"
													>
														{passObj.showConfirmNewPassword ? (
															<EyeOutline />
														) : (
															<EyeOffOutline />
														)}
													</IconButton>
												</InputAdornment>
											}
										/>
									</FormControl>
								</Grid> */}
							</Grid>
						</Grid>

						<Grid
							item
							sm={6}
							xs={12}
							sx={{
								display: 'flex',
								// marginTop: [7.5, 2.5],
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<img
								width={183}
								alt="avatar"
								height={256}
								src="/images/pose-m-1.png"
							/>
						</Grid>
					</Grid>
				</CardContent>

				<Divider sx={{ margin: 0 }} />

				<CardContent>
					<Box sx={{ mt: 1 }}>
						<Button
							variant="contained"
							sx={{ marginRight: 3.5 }}
							className="btn-color"
							onClick={submitData}
						>
							Save Changes
						</Button>
						<Button
							type="reset"
							variant="outlined"
							color="secondary"
							onClick={resetData}
						>
							Reset
						</Button>
					</Box>
				</CardContent>
			</motion.form>
		</>
	)
}

const Tab = styled(MuiTab)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		minWidth: 100,
	},
	[theme.breakpoints.down('sm')]: {
		minWidth: 67,
	},
}))

const TabName = styled('span')(({ theme }) => ({
	lineHeight: 1.71,
	fontSize: '0.875rem',
	marginLeft: theme.spacing(2.4),
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}))

const ProfileDetails = () => {
	const [value, setValue] = useState('account')

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<>
			<div className="main-container">
				<SidebarMenus />
				<div className="profileDetails-container">
					<Header />
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: 'spring',
							stiffness: 150,
							duration: 0.5,
						}}
						className="profileDetails-content"
					>
						<Card>
							<TabContext value={value}>
								<TabList
									onChange={handleChange}
									aria-label="account-settings tabs"
									sx={{
										borderBottom: (theme) =>
											`1px solid ${theme.palette.divider}`,
									}}
								>
									<Tab
										value="account"
										label={
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<AccountOutline />
												<TabName>Account</TabName>
											</Box>
										}
									/>
									<Tab
										value="security"
										label={
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<LockOpenOutline />
												<TabName>Security</TabName>
											</Box>
										}
									/>
								</TabList>

								<TabPanel sx={{ p: 0 }} value="account">
									<TabAccount />
								</TabPanel>
								<TabPanel sx={{ p: 0 }} value="security">
									<TabSecurity />
								</TabPanel>
							</TabContext>
						</Card>
					</motion.div>
				</div>
			</div>
		</>
	)
}

export default ProfileDetails
