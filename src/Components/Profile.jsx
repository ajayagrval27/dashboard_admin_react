import React, { useEffect, useState } from 'react'
import SidebarMenus from './SidebarMenus'
import Header from './Header'
import '../Assets/Css/Profile.css'
// ** MUI Imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
// import Collapse from '@mui/material/Collapse'
// import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material'
import {
	createProfileData,
	deleteProfileData,
	getProfileData,
	updateProfileData,
} from '../Redux/Action/profileAction'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'

// ** Icons Imports
// import ChevronUp from 'mdi-material-ui/ChevronUp'
// import ChevronDown from 'mdi-material-ui/ChevronDown'

// collapse Table Row
// const Row = (props) => {
// 	// ** Props
// 	const { row } = props

// 	const [open, setOpen] = useState(false)

// 	return (
// 		<>
// 			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
// 				<TableCell>
// 					<IconButton
// 						aria-label="expand row"
// 						size="small"
// 						onClick={() => setOpen(!open)}
// 					>
// 						{open ? <ChevronUp /> : <ChevronDown />}
// 					</IconButton>
// 				</TableCell>
// 				<TableCell component="th" scope="row">
// 					{row.name}
// 				</TableCell>
// 				<TableCell align="right">{row.calories}</TableCell>
// 				<TableCell align="right">{row.fat}</TableCell>
// 				<TableCell align="right">{row.carbs}</TableCell>
// 				<TableCell align="right">{row.protein}</TableCell>
// 			</TableRow>
// 			<TableRow>
// 				<TableCell colSpan={6} sx={{ py: '0 !important' }}>
// 					<Collapse in={open} timeout="auto" unmountOnExit>
// 						<Box sx={{ m: 2 }}>
// 							<Typography
// 								variant="h6"
// 								gutterBottom
// 								component="div"
// 							>
// 								Bank Details
// 							</Typography>
// 							<Table size="small" aria-label="purchases">
// 								<TableHead>
// 									<TableRow>
// 										<TableCell>Bank Address</TableCell>
// 										<TableCell>bankInfo</TableCell>
// 										<TableCell>cardHolder</TableCell>
// 										<TableCell>cardNo</TableCell>
// 										<TableCell>cardType</TableCell>
// 										<TableCell>AssociateId</TableCell>
// 										<TableCell>tel</TableCell>
// 									</TableRow>
// 								</TableHead>
// 								<TableBody>
// 									{console.log(row)}
// 									{row.profileBankAssociateResponses.map(
// 										(profileBankDetails, index) => {
// 											return (
// 												<TableRow key={index}>
// 													<TableCell>
// 														{
// 															profileBankDetails.bankAddress
// 														}
// 													</TableCell>
// 												</TableRow>
// 											)
// 										}
// 									)}
// 									{/* {row.history.map((historyRow) => (
// 										<TableRow key={historyRow.date}>
// 											<TableCell
// 												component="th"
// 												scope="row"
// 											>
// 												{historyRow.date}
// 											</TableCell>
// 											<TableCell>
// 												{historyRow.customerId}
// 											</TableCell>
// 											<TableCell align="right">
// 												{historyRow.amount}
// 											</TableCell>
// 											<TableCell align="right">
// 												{Math.round(
// 													historyRow.amount *
// 														row.price *
// 														100
// 												) / 100}
// 											</TableCell>
// 										</TableRow>
// 									))} */}
// 								</TableBody>
// 							</Table>
// 						</Box>
// 					</Collapse>
// 				</TableCell>
// 			</TableRow>
// 		</>
// 	)
// }

const Profile = () => {
	let profileData = useSelector((state) => state.profileData)
	const [filteredData, setFilteredData] = useState(profileData)
	const [searchValue, setSearchValue] = useState('')
	const dispatch = useDispatch()
	// ** States
	let [profileObj, setProfileObj] = useState({})
	let [blankObj, setBlankObj] = useState({})
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	console.log(profileData, filteredData)

	useEffect(() => {
		dispatch(getProfileData())
	}, [dispatch])

	useEffect(() => {
		setFilteredData(profileData)
	}, [profileData])

	const handleFilter = (value) => {
		console.log(value)
		setSearchValue(value)
		setFilteredData(
			profileData.filter((data) =>
				data?.displayName.toLowerCase().includes(value.toLowerCase())
			)
		)
	}

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setProfileObj({ ...blankObj })
	}
	// ** table Pagination
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const addData = (e) => {
		const { name, value } = e.target
		const [parentField, childField] = name.includes('.')
			? name.split('.')
			: [name]
		setProfileObj({
			...profileObj,
			[parentField]: childField
				? { ...profileObj[parentField], [childField]: value }
				: value,
		})
		setBlankObj({ ...blankObj, [parentField]: childField ? {} : '' })
	}

	const editProfiles = (editObj) => {
		editObj.bankDetails = editObj.profileBankAssociateResponses
		editObj.role = editObj.profileRoleAssociateResponses
		// editObj.bankDetails[0].profileId =
		// 	editObj.bankDetails[0].profileBankAssociateId
		// editObj.bankDetails = editObj.bankDetails[0]
		// editObj.bankDetails.profileId =
		// 	editObj.bankDetails.profileBankAssociateId
		editObj.bankDetails = editObj.bankDetails.slice(0, 1)[0]
		console.log(editObj)
		setProfileObj({ ...editObj })
	}

	const submitProfiles = () => {
		if (profileObj.id) {
			dispatch(updateProfileData(profileObj))
			setProfileObj({ ...blankObj })
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Data Updated Successfully',
				showConfirmButton: false,
				timer: 1500,
				toast: true,
				timerProgressBar: true,
			})
			setOpen(false)
		} else {
			dispatch(createProfileData(profileObj))
			setProfileObj({ ...blankObj })
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Data Submitted Successfully',
				showConfirmButton: false,
				timer: 1500,
				toast: true,
				timerProgressBar: true,
			})
			setOpen(false)
		}
	}

	const deleteProfiles = (profileId) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: ' #d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			toast: true,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteProfileData(profileId))
				Swal.fire({
					title: 'Deleted!',
					text: 'Your Data has been deleted',
					icon: 'success',
					toast: true,
				})
			}
		})
	}

	// const clearProfiles = () => {
	// 	Swal.fire({
	// 		title: 'Are you sure?',
	// 		text: "You won't be able to revert this!",
	// 		icon: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: ' #d33',
	// 		cancelButtonColor: '#3085d6',
	// 		confirmButtonText: 'Yes, delete it!',
	// 		toast: true,
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			dispatch(clearProfileData())
	// 			Swal.fire({
	// 				title: 'Deleted!',
	// 				text: 'Your Data has been deleted',
	// 				icon: 'success',
	// 				toast: true,
	// 			})
	// 		}
	// 	})
	// }

	return (
		<>
			<div className="main-container">
				<SidebarMenus />
				<div className="profile-container">
					<Header
						searchValue={searchValue}
						handleFilter={handleFilter}
					/>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: 'spring',
							stiffness: 150,
							duration: 0.5,
						}}
						className="profile-content"
					>
						<Button
							style={{ marginBottom: '1rem' }}
							color="success"
							variant="contained"
							onClick={handleOpen}
						>
							Create Profile
						</Button>
						{/* <Button
							style={{ margin: '0 15px' }}
							color="error"
							variant="contained"
							onClick={clearProfiles}
						>
							Delete All Profile
						</Button> */}

						<Dialog open={open} onClose={handleClose}>
							<DialogTitle>Create Profile</DialogTitle>
							<DialogContent>
								<DialogContentText>
									Please enter your details:
								</DialogContentText>
								<Box
									component="form"
									sx={{
										'& > :not(style)': {
											m: 1,
											width: '12.5rem',
										},
									}}
									autoComplete="off"
								>
									<TextField
										label="DisplayName"
										name="displayName"
										type="text"
										onChange={addData}
										value={profileObj.displayName ?? ''}
										variant="outlined"
									/>
									<TextField
										label="Email"
										name="email"
										type="email"
										onChange={addData}
										value={profileObj.email ?? ''}
										variant="outlined"
									/>
									<TextField
										label="IdNumber"
										name="idNumber"
										type="number"
										onChange={addData}
										value={profileObj.idNumber ?? ''}
										variant="outlined"
									/>
									<TextField
										label="UserId"
										name="userId"
										type="number"
										onChange={addData}
										value={profileObj.userId ?? ''}
										variant="outlined"
									/>
									<TextField
										name="birthdate"
										onChange={addData}
										label="Birthdate"
										variant="outlined"
										InputLabelProps={{
											shrink: true,
											required: true,
										}}
										type="date"
										value={profileObj.birthdate ?? ''}
									/>
									<TextField
										label="AlternativeName"
										name="alternativeName"
										type="text"
										onChange={addData}
										value={profileObj.alternativeName ?? ''}
										variant="outlined"
									/>
									<TextField
										label="ChineseName"
										name="chineseName"
										type="text"
										onChange={addData}
										value={profileObj.chineseName ?? ''}
										variant="outlined"
									/>
									<TextField
										label="ArtistName"
										name="artistName"
										type="text"
										onChange={addData}
										value={profileObj.artistName ?? ''}
										variant="outlined"
									/>
									<TextField
										label="AdvanceAmount"
										name="advanceAmount"
										type="number"
										onChange={addData}
										value={profileObj.advanceAmount ?? ''}
										variant="outlined"
									/>
									<TextField
										name="contractStartDate"
										onChange={addData}
										label="ContractStartDate"
										variant="outlined"
										InputLabelProps={{
											shrink: true,
											required: true,
										}}
										type="date"
										value={
											profileObj.contractStartDate ?? ''
										}
									/>
									<TextField
										name="contractEndDate"
										onChange={addData}
										label="ContractEndDate"
										variant="outlined"
										InputLabelProps={{
											shrink: true,
											required: true,
										}}
										type="date"
										value={profileObj.contractEndDate ?? ''}
									/>
									<TextField
										label="Address"
										name="address"
										type="text"
										onChange={addData}
										value={profileObj.address ?? ''}
										variant="outlined"
									/>
									<DialogContentText>
										Please enter bankDetails:
									</DialogContentText>
									<TextField
										label="profileId"
										name="bankDetails.profileId"
										type="number"
										onChange={addData}
										variant="outlined"
										value={
											profileObj.bankDetails?.profileId ??
											''
										}
									/>
									<TextField
										label="ProfileBankAssociateId"
										name="bankDetails.profileBankAssociateId"
										type="number"
										onChange={addData}
										variant="outlined"
										value={
											profileObj.bankDetails
												?.profileBankAssociateId ?? ''
										}
									/>
									<TextField
										label="BankAddress"
										name="bankDetails.bankAddress"
										type="text"
										onChange={addData}
										value={
											profileObj.bankDetails
												?.bankAddress ?? ''
										}
										variant="outlined"
									/>
									<TextField
										label="BankInfo"
										name="bankDetails.bankInfo"
										type="text"
										onChange={addData}
										value={
											profileObj.bankDetails?.bankInfo ??
											''
										}
										variant="outlined"
									/>
									<TextField
										label="CardHolder"
										name="bankDetails.cardHolder"
										type="text"
										onChange={addData}
										value={
											profileObj.bankDetails
												?.cardHolder ?? ''
										}
										variant="outlined"
									/>
									<TextField
										label="CardType"
										name="bankDetails.cardType"
										type="text"
										onChange={addData}
										value={
											profileObj.bankDetails?.cardType ??
											''
										}
										variant="outlined"
									/>
									<TextField
										label="CardNo"
										name="bankDetails.cardNo"
										type="number"
										onChange={addData}
										value={
											profileObj.bankDetails?.cardNo ?? ''
										}
										variant="outlined"
									/>
									<TextField
										label="Tel"
										name="bankDetails.tel"
										type="tel"
										onChange={addData}
										value={
											profileObj.bankDetails?.tel ?? ''
										}
										variant="outlined"
									/>
								</Box>
							</DialogContent>
							<DialogActions>
								<Button
									className="my-2"
									variant="contained"
									color="error"
									onClick={handleClose}
								>
									Cancel
								</Button>
								<Button
									className="my-2"
									variant="contained"
									color="success"
									type="button"
									onClick={submitProfiles}
								>
									Submit
								</Button>
							</DialogActions>
						</Dialog>
						<Paper
							sx={{ overflow: 'hidden' }}
							className="box_shadow"
						>
							<TableContainer>
								<Typography
									sx={{
										flex: '1 1 100%',
										p: 2,
										pb: 1,
										px: 3,
									}}
									variant="h5"
									component="div"
								>
									All Profiles
								</Typography>
								<Table
									sx={{ minWidth: 800 }}
									aria-label="table in dashboard"
								>
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>Email</TableCell>
											<TableCell>
												ContractStartDate
											</TableCell>
											<TableCell>
												ContractEndDate
											</TableCell>
											<TableCell>Address</TableCell>
											<TableCell>IdNumber</TableCell>
											<TableCell colSpan={2}>
												Actions
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{Array.isArray(filteredData)
											? filteredData
													?.slice(
														page * rowsPerPage,
														page * rowsPerPage +
															rowsPerPage
													)
													.map((obj, index) => {
														return (
															<TableRow
																hover
																key={index}
																sx={{
																	'&:last-of-type td, &:last-of-type th':
																		{
																			border: 0,
																		},
																}}
															>
																<TableCell className="table-name-width">
																	<Typography
																		sx={{
																			fontSize:
																				'0.85rem',
																		}}
																	>
																		{
																			obj.displayName
																		}
																	</Typography>
																	<Typography variant="caption">
																		{
																			obj.chineseName
																		}
																	</Typography>
																</TableCell>
																<TableCell>
																	{obj.email}
																</TableCell>
																<TableCell>
																	{dayjs(
																		obj.contractStartDate
																	).format(
																		'DD-MM-YYYY'
																	)}
																</TableCell>
																<TableCell>
																	{dayjs(
																		obj.contractEndDate
																	).format(
																		'DD-MM-YYYY'
																	)}
																</TableCell>
																<TableCell>
																	{
																		obj.address
																	}
																</TableCell>
																<TableCell>
																	{
																		obj.idNumber
																	}
																</TableCell>
																<TableCell>
																	<div className="d-flex gap-1">
																		<Button
																			className="btn-color"
																			variant="contained"
																			color="info"
																			onClick={() => {
																				editProfiles(
																					obj
																				)
																				handleOpen()
																			}}
																		>
																			Edit
																		</Button>
																		<Button
																			variant="contained"
																			color="error"
																			onClick={() => {
																				deleteProfiles(
																					obj.id
																				)
																			}}
																		>
																			delete
																		</Button>
																	</div>
																</TableCell>
															</TableRow>
														)
													})
											: null}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[5, 10, 20, 30]}
								component="div"
								count={
									profileData.length ? profileData.length : 0
								}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Paper>
					</motion.div>
				</div>
			</div>
		</>
	)
}

export default Profile
