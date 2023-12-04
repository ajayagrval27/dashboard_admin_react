import React, { useEffect, useState } from 'react'
import SidebarMenus from './SidebarMenus'
import Header from './Header'
import '../Assets/Css/Projects.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../Redux/Action/allProjectsAction'
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
import { motion } from 'framer-motion'


const Project = () => {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const dispatch = useDispatch()
	const allProjects = useSelector((state) => state.allProjects)

	// ** table Pagination
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	useEffect(() => {
		dispatch(getAllProjects())
	}, [dispatch])

	return (
		<>
			<div className="main-container">
				<SidebarMenus />
				<div className="projects-container">
					<Header />
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="projects-content"
					>
						<Paper
							className="box_shadow"
							sx={{ width: '100%', overflow: 'hidden' }}
						>
							<TableContainer
								className="inner-scrollbar"
								sx={{ maxHeight: 550 }}
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
									Projects
								</Typography>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell
												className="tables-cell-width"
												align="center"
											>
												Album Image
											</TableCell>
											<TableCell
												className="tables-cell-width"
												align="center"
											>
												Album id
											</TableCell>
											<TableCell
												className="tables-cell-width"
												align="center"
											>
												Album Name
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{Array.isArray(allProjects)
											? allProjects
													.slice(
														page * rowsPerPage,
														page * rowsPerPage +
															rowsPerPage
													)
													.map((project, index) => (
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
																className="tables-cell-width"
																align="center"
																component="th"
																scope="row"
															>
																{project.artworkUrl ? (
																	<img
																		src={
																			project.artworkUrl
																		}
																		alt="album"
																	/>
																) : (
																	<img
																		style={{
																			borderRadius:
																				'0.3rem',
																		}}
																		src="https://via.placeholder.com/50"
																		alt="album"
																	/>
																)}
															</TableCell>
															<TableCell
																className="tables-cell-width"
																align="center"
															>
																{
																	project.albumId
																}
															</TableCell>
															<TableCell
																className="tables-cell-width"
																align="center"
															>
																{
																	project.albumName
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
									allProjects.length ? allProjects.length : 0
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

export default Project
