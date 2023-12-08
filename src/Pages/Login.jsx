import React, { useEffect, useState } from 'react'
import '../Assets/Css/Login.css'
import tree1 from '../Assets/Images/auth-v1-tree.png'
import tree2 from '../Assets/Images/auth-v1-tree-2.png'
import mask from '../Assets/Images/auth-v1-mask-light.png'
import { useTheme } from '@mui/material/styles'
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
	Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import validationData from '../Form validation/LogInValidation.json'
import { isUserRegister } from '../Redux/Action/userRegAction'
import { LogiInAcess } from '../Redux/Action/LogInActions'
import { motion } from 'framer-motion'
// ** Icons Imports
import { InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
// import { useSelector } from 'react-redux'

const Login = () => {
	const theme = useTheme()
	// const userRegState = useSelector((state) => state.userRegister)
	// const logInState = useSelector((state) => state.logIn)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [logInObj, setlogInObj] = useState({
		email: '',
		password: '',
	})
	let [errorObj, setErrorObj] = useState({})
	const [isVisible, setIsVisible] = useState(false)
	const handleTogglePassword = () => setIsVisible(!isVisible)

	// const isLoggedIn = localStorage.getItem('token') ? true : false
	// console.log(isLoggedIn)

	useEffect(() => {
		if (logInObj.email) {
			dispatch(isUserRegister(logInObj.email))
		}
	}, [dispatch, logInObj.email])

	const addData = (e) => {
		logInObj[e.target.name] = e.target.value
		setlogInObj({ ...logInObj })
		validationFn(e.target.name)
	}

	const validationFn = (name) => {
		let validationObj = validationData.find((x) => x.name === name)
		let validObj = validationObj?.conditions?.find((x) => eval(x.condition))
		if (validObj) {
			errorObj[name] = validObj.error
		} else {
			delete errorObj[name]
		}
		setErrorObj({ ...errorObj })
	}

	// const handleSubmit = () => {
	// 	dispatch(login(logInObj))
	// }

	const logInSubmit = () => {
		Object.keys(logInObj).forEach((x) => {
			validationFn(x)
		})
		if (Object.keys(errorObj).length === 0) {
			dispatch(LogiInAcess(logInObj, navigate))
		}
	}

	// const validateMobileNumber = (number) => {
	// 	const regex = /^[0-9]{10}$/
	// 	return regex.test(number)
	// }

	return (
		<>
			<div className="login-container">
				<div className="login-content">
					<div className="content-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								type: 'spring',
								stiffness: 150,
								duration: 0.5,
							}}
							className="login-form"
						>
							<div className="form-content">
								<div className="form-logo">
									<svg
										className="logo-svg"
										width={27}
										height={24}
										version="1.1"
										viewBox="0 0 30 23"
										xmlns="http://www.w3.org/2000/svg"
										xmlnsXlink="http://www.w3.org/1999/xlink"
									>
										<g
											stroke="none"
											strokeWidth="1"
											fill="none"
											fillRule="evenodd"
										>
											<g
												id="Artboard"
												transform="translate(-95.000000, -51.000000)"
											>
												<g
													id="logo"
													transform="translate(95.000000, 50.000000)"
												>
													<path
														id="Combined-Shape"
														fill={
															theme.palette
																.primary.main
														}
														d="M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z"
													/>
													<polygon
														id="Rectangle"
														opacity="0.077704"
														fill={
															theme.palette.common
																.black
														}
														points="0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646"
													/>
													<polygon
														id="Rectangle"
														opacity="0.077704"
														fill={
															theme.palette.common
																.black
														}
														points="0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162"
													/>
													<polygon
														id="Rectangle"
														opacity="0.077704"
														fill={
															theme.palette.common
																.black
														}
														points="22.7419355 8.58870968 30 12.7417372 30 16.9537453"
														transform="translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) "
													/>
													<polygon
														id="Rectangle"
														opacity="0.077704"
														fill={
															theme.palette.common
																.black
														}
														points="22.7419355 8.58870968 30 12.6409734 30 15.2601969"
														transform="translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) "
													/>
													<path
														id="Rectangle"
														fillOpacity="0.15"
														fill={
															theme.palette.common
																.white
														}
														d="M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z"
													/>
													<path
														id="Rectangle"
														fillOpacity="0.35"
														fill={
															theme.palette.common
																.white
														}
														transform="translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) "
														d="M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z"
													/>
												</g>
											</g>
										</g>
									</svg>
									<h4 className="mb-0">ADMIN DASHBOARD</h4>
								</div>
								<div className="form-heading">
									<h5 className="mb-1">
										Welcome to Admin Dashboard!
									</h5>
									<p>
										Sign in to continue to Admin Dashboard.
									</p>
								</div>
								<Box
									className="d-flex flex-column"
									component="form"
									sx={{
										'& .MuiTextField-root': {
											m: 1,
											width: '23rem',
										},
									}}
									noValidate
									autoComplete="off"
								>
									<TextField
										className="login-field"
										label="Email"
										name="email"
										type="email"
										onChange={addData}
										variant="outlined"
									/>
									{errorObj.email && (
										<Typography
											variant="body2"
											color="error"
											sx={{ marginLeft: '0.55rem' }}
										>
											{errorObj.email}
										</Typography>
									)}
									<TextField
										type={isVisible ? 'text' : 'password'}
										label="Password"
										name="password"
										onChange={addData}
										variant="outlined"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														onClick={
															handleTogglePassword
														}
													>
														{isVisible ? (
															<Visibility />
														) : (
															<VisibilityOff />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
									{/* <TextField
										className="login-field"
										label="Password"
										name="password"
										onChange={addData}
										variant="outlined"
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
									/> */}
									{errorObj.password && (
										<Typography
											variant="body2"
											color="error"
											sx={{ marginLeft: '0.55rem' }}
										>
											{errorObj.password}
										</Typography>
									)}
								</Box>
								<Box
									sx={{
										mb: 4,
										px: 1.2,
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										justifyContent: 'space-between',
									}}
								>
									<FormControlLabel
										control={<Checkbox />}
										label="Remember Me"
									/>
									<Link className="link-name">
										Forgot Password?
									</Link>
								</Box>
								<Button
									className="login-btn"
									type="button"
									size="large"
									variant="contained"
									color="primary"
									onClick={logInSubmit}
									sx={{
										width: '100%',
										marginBottom: 7,
										px: 2,
										mb: 2,
									}}
								>
									Login
								</Button>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										justifyContent: 'center',
									}}
								>
									<Typography
										variant="body2"
										sx={{
											marginRight: 2,
											fontSize: '0.95rem',
										}}
									>
										New on our platform?
									</Typography>
									<Typography variant="body2">
										<Link
											to="/signup"
											className="link-name fs-6"
										>
											Create an account
										</Link>
									</Typography>
								</Box>
							</div>
						</motion.div>
						<img className="trre1" src={tree1} alt="" />
						<img className="mask" src={mask} alt="" />
						<img className="tree2" src={tree2} alt="" />
					</div>
				</div>
			</div>
		</>
	)
}

export default Login
