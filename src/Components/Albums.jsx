import React, { useEffect, useState } from 'react'
import SidebarMenus from './SidebarMenus'
import Header from './Header'
import '../Assets/Css/Albums.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	createAlbum,
	deleteAlbum,
	getAlbumsData,
	updateAlbum,
} from '../Redux/Action/albumsActions'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material'
import {
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Box,
} from '@mui/material'
import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'

const Albums = () => {
	const dispatch = useDispatch()
	const albumsData = useSelector((state) => state.albumsData)
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)
	const [open, setOpen] = useState(false)
	let [albumObj, setAlbumObj] = useState({})
	let [blankObj, setBlankObj] = useState({})

	useEffect(() => {
		dispatch(getAlbumsData())
	}, [dispatch])

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		setAlbumObj({ ...blankObj })
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	const addData = (e) => {
		let { name, value } = e.target
		albumObj[name] = value
		blankObj[name] = ''
		setAlbumObj({ ...albumObj })
		setBlankObj({ ...blankObj })
	}

	const submitData = () => {
		if (albumObj.id) {
			dispatch(updateAlbum(albumObj))
			setAlbumObj({ ...blankObj })
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
			dispatch(createAlbum(albumObj))
			setAlbumObj({ ...blankObj })
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Data Submitted Successfully',
				showConfirmButton: false,
				timer: 2000,
				toast: true,
				timerProgressBar: true,
			})
			setOpen(false)
		}
	}

	const updateData = (editObj) => {
		setAlbumObj({ ...editObj })
	}

	const deleteData = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			width: 800,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: ' #d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, delete it!',
			toast: true,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteAlbum(id))
				Swal.fire({
					title: 'Deleted!',
					text: 'Your Data has been deleted',
					icon: 'success',
					toast: true,
				})
			}
		})
	}

	return (
		<>
			<div className="main-container">
				<SidebarMenus />
				<div className="album-container">
					<Header />
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: 'spring',
							stiffness: 150,
							duration: 0.5,
						}}
						className="album-content"
					>
						{/* form */}
						<Button
							style={{ marginBottom: '1rem' }}
							color="success"
							variant="contained"
							onClick={handleOpen}
						>
							Create Album
						</Button>

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
											width: '17rem',
										},
									}}
									autoComplete="off"
								>
									<TextField
										label="AlbumName"
										name="albumName"
										onChange={addData}
										value={albumObj.albumName ?? ''}
										type="text"
										variant="outlined"
									/>
									<TextField
										label="AlternativeAlbumName"
										name="alternativeAlbumName"
										onChange={addData}
										value={
											albumObj.alternativeAlbumName ?? ''
										}
										type="text"
										variant="outlined"
									/>
									<TextField
										label="Isrc"
										name="isrc"
										onChange={addData}
										value={albumObj.isrc ?? ''}
										type="number"
										variant="outlined"
									/>
									<TextField
										label="UpsCode"
										name="upsCode"
										onChange={addData}
										value={albumObj.upsCode ?? ''}
										type="number"
										variant="outlined"
									/>
									<TextField
										label="CreationDate"
										name="creationDate"
										onChange={addData}
										value={albumObj.creationDate ?? ''}
										variant="outlined"
										InputLabelProps={{
											shrink: true,
											required: true,
										}}
										type="date"
									/>
									<TextField
										label="ReleaseDate"
										name="releaseDate"
										onChange={addData}
										value={albumObj.releaseDate ?? ''}
										variant="outlined"
										InputLabelProps={{
											shrink: true,
											required: true,
										}}
										type="date"
									/>
									<TextField
										label="UmpgCode"
										name="umpgCode"
										onChange={addData}
										value={albumObj.umpgCode ?? ''}
										type="number"
										variant="outlined"
									/>
									<TextField
										label="Filler1"
										name="filler1"
										onChange={addData}
										value={albumObj.filler1 ?? ''}
										type="text"
										variant="outlined"
									/>
									<TextField
										label="Filler2"
										name="filler2"
										onChange={addData}
										value={albumObj.filler2 ?? ''}
										type="text"
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
									onClick={submitData}
								>
									Submit
								</Button>
							</DialogActions>
						</Dialog>
						{/* table */}
						<Paper sx={{ width: '100%', overflow: 'hidden' }}>
							<TableContainer sx={{ maxHeight: 900 }}>
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
									All Albums
								</Typography>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell>
												AlternativeName
											</TableCell>
											<TableCell>CreationDate</TableCell>
											{/* <TableCell>Filler1</TableCell> */}
											<TableCell>Isrc</TableCell>
											<TableCell>ReleaseDate</TableCell>
											<TableCell>UmpgCode</TableCell>
											<TableCell>UpsCode</TableCell>
											<TableCell colSpan={2}>
												Action
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{Array.isArray(albumsData)
											? albumsData
													?.slice(
														page * rowsPerPage,
														page * rowsPerPage +
															rowsPerPage
													)
													.map((obj, index) => {
														return (
															<TableRow
																hover
																role="checkbox"
																tabIndex={-1}
																key={index}
															>
																<TableCell>
																	{
																		obj.albumName
																	}
																</TableCell>
																<TableCell>
																	{
																		obj.alternativeAlbumName
																	}
																</TableCell>
																<TableCell>
																	{dayjs(
																		obj.creationDate
																	).format(
																		'DD-MM-YYYY'
																	)}
																</TableCell>
																{/* <TableCell>
																	{
																		obj.filler1
																	}
																</TableCell> */}
																<TableCell>
																	{obj.isrc}
																</TableCell>
																<TableCell>
																	{dayjs(
																		obj.releaseDate
																	).format(
																		'DD-MM-YYYY'
																	)}
																</TableCell>
																<TableCell>
																	{
																		obj.umpgCode
																	}
																</TableCell>
																<TableCell>
																	{
																		obj.upsCode
																	}
																</TableCell>
																<TableCell>
																	<div className="d-flex gap-1">
																		<Button
																			className="btn-color"
																			variant="contained"
																			color="info"
																			onClick={() => {
																				updateData(
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
																			onClick={() =>
																				deleteData(
																					obj.id
																				)
																			}
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
								count={albumsData?.length ?? 0}
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

export default Albums
