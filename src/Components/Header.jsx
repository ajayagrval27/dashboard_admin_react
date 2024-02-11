import AppBar from '@mui/material/AppBar'
import '../Assets/Css/Header.css'
import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { IoHelpCircleOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'
import { TextField, InputAdornment } from '@mui/material'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { BiSolidUserDetail } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/Action/LogInActions'

const BadgeContentSpan = styled('span')(({ theme }) => ({
	width: 8,
	height: 8,
	borderRadius: '50%',
	backgroundColor: theme.palette.success.main,
	boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}))

function Header({ handleFilter, searchValue }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const logOut = () => {
		dispatch(logout(navigate))
	}

	const [anchorEl, setAnchorEl] = useState(null)

	const handleDropdownOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const styles = {
		py: 2,
		px: 4,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		color: 'text.primary',
		textDecoration: 'none',
		'& svg': {
			fontSize: '1.375rem',
			color: 'text.secondary',
		},
	}

	const handleDropdownClose = (url) => {
		if (url) {
			navigate(url)
		}
		setAnchorEl(null)
	}

	return (
		<>
			<AppBar className="header" position="static">
				<div className="header-items">
					<TextField
						className="search-bar"
						size="small"
						sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
						placeholder="Search"
						value={searchValue}
						onChange={(e) => handleFilter(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<FaMagnifyingGlass fontSize="0.9rem" />
								</InputAdornment>
							),
						}}
					/>
					<Badge
						overlap="circular"
						onClick={handleDropdownOpen}
						sx={{ ml: 2, cursor: 'pointer' }}
						badgeContent={<BadgeContentSpan />}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
					>
						<Avatar
							alt={localStorage.getItem('userName')}
							onClick={handleDropdownOpen}
							sx={{ width: 40, height: 40 }}
							src="/images/avatars/1.png"
						/>
					</Badge>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={() => handleDropdownClose()}
						sx={{
							'& .MuiMenu-paper': { width: 210, marginTop: 3 },
						}}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						<Box
							style={{ top: '40px' }}
							sx={{ pt: 2, pb: 3, px: 4 }}
						>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Badge
									overlap="circular"
									badgeContent={<BadgeContentSpan />}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
								>
									<Avatar
										alt={localStorage.getItem('userName')}
										src="/images/avatars/1.png"
										sx={{
											width: '2.5rem',
											height: '2.5rem',
										}}
									/>
								</Badge>
								<Box
									sx={{
										display: 'flex',
										marginLeft: 3,
										alignItems: 'flex-start',
										flexDirection: 'column',
									}}
								>
									<Typography sx={{ fontWeight: 600 }}>
										{/* John Doe */}
										{localStorage.getItem('userName')}
									</Typography>
									<Typography
										variant="body2"
										sx={{
											fontSize: '0.8rem',
											color: 'text.disabled',
										}}
									>
										Admin
									</Typography>
								</Box>
							</Box>
						</Box>
						<MenuItem
							sx={{ p: 0 }}
							onClick={() => handleDropdownClose()}
						>
							<Box sx={styles}>
								<BiSolidUserDetail
									style={{ marginRight: '0.5rem' }}
								/>
								<Link
									className="text-decoration-none text-dark"
									to="/profileDetail"
								>
									Profile Settings
								</Link>
							</Box>
						</MenuItem>
						<Divider sx={{ mt: 0, mb: 1 }} />
						{/* <MenuItem
							sx={{ p: 0 }}
							onClick={() => handleDropdownClose()}
						>
							<Box sx={styles}>
								<IoCogOutline
									style={{ marginRight: '0.5rem' }}
								/>
								Change Password
							</Box>
						</MenuItem> */}
						<MenuItem
							sx={{ p: 0 }}
							onClick={() => handleDropdownClose()}
						>
							<Box sx={styles}>
								<IoHelpCircleOutline
									style={{ marginRight: '0.5rem' }}
								/>
								FAQ
							</Box>
						</MenuItem>
						<Divider />
						<MenuItem sx={{ p: 0 }} onClick={logOut}>
							<Box sx={styles}>
								<MdLogout style={{ marginRight: '0.5rem' }} />
								Log Out
							</Box>
						</MenuItem>
					</Menu>
				</div>
			</AppBar>
		</>
	)
}

export default Header
