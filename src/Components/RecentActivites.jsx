import React, { useEffect, useState } from 'react'
import SidebarMenus from './SidebarMenus'
import Header from './Header'
import '../Assets/Css/RecentActivites.css'
import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TablePagination,
	Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getRecentActivites } from '../Redux/Action/recActivitesAction'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

const RecentActivites = () => {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const dispatch = useDispatch()
	const recentActivitesData = useSelector((state) => state.allProjects)

	useEffect(() => {
		dispatch(getRecentActivites())
	}, [dispatch])

	// ** table Pagination
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<>
			<div className="main-container">
				<SidebarMenus />
				<div className="recentActivites-container">
					<Header />
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: 'spring',
							stiffness: 150,
							duration: 0.5,
						}}
						className="recentActivites-content"
					>
						<Paper
							className="box_shadow"
							sx={{ width: '100%', overflow: 'hidden' }}
						>
							<TableContainer
								className="inner-scrollbar"
								sx={{ maxHeight: 650 }}
							>
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
									Recent Activites
								</Typography>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell
												className="table-id-width"
												align="center"
											>
												Id
											</TableCell>
											<TableCell
												className="table-date-width"
												align="center"
											>
												Created Date
											</TableCell>
											<TableCell
												className="table-date-width"
												align="center"
											>
												Updated Date
											</TableCell>
											<TableCell
												className="table-type-width"
												align="center"
											>
												Type
											</TableCell>
											<TableCell
												className="table-title-width"
												align="center"
											>
												Title
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{Array.isArray(recentActivitesData)
											? recentActivitesData
													.slice(
														page * rowsPerPage,
														page * rowsPerPage +
															rowsPerPage
													)
													.map((activites, index) => (
														<TableRow
															key={index}
															sx={{
																'&:last-child td, &:last-child th':
																	{
																		border: 0,
																	},
															}}
														>
															<TableCell
																align="center"
																component="th"
																scope="row"
															>
																{activites.id}
															</TableCell>
															<TableCell align="center">
																{dayjs(
																	activites.createdDate
																).format(
																	'DD-MM-YYYY'
																)}
															</TableCell>
															<TableCell align="center">
																{dayjs(
																	activites.updatedDate
																).format(
																	'DD-MM-YYYY'
																)}
															</TableCell>
															<TableCell align="center">
																{activites.type}
															</TableCell>
															<TableCell align="center">
																{
																	activites.title
																}
															</TableCell>
														</TableRow>
													))
											: null}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[5, 10, 20, 30]}
								component="div"
								count={
									recentActivitesData.length
										? recentActivitesData.length
										: 0
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

export default RecentActivites
