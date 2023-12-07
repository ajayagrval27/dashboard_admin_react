import React from 'react'
import SidebarMenus from './SidebarMenus'
import Header from './Header'
import '../Assets/Css/Dashboard.css'
import ApexCharts from 'react-apexcharts'
// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import MuiDivider from '@mui/material/Divider'
// ** images Imports
import tropyBag from '../Assets/Images/triangle-light.png'
import tropy from '../Assets/Images/trophy.png'
// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MenuUp from 'mdi-material-ui/MenuUp'
import Poll from 'mdi-material-ui/Poll'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import CardStatisticsVerticalComponent from './CardStatisticsVerticalComponent/CardStatisticsVerticalComponent'
import ReactApexChart from 'react-apexcharts'
import { motion } from 'framer-motion'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
	right: 0,
	bottom: 0,
	height: 170,
	position: 'absolute',
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
	right: 36,
	bottom: 20,
	height: 98,
	position: 'absolute',
})

const salesData = [
	{
		stats: '245k',
		title: 'Sales',
		color: 'primary',
		icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />,
	},
	{
		stats: '12.5k',
		title: 'Customers',
		color: 'success',
		icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />,
	},
	{
		stats: '1.54k',
		color: 'warning',
		title: 'Products',
		icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />,
	},
	{
		stats: '$88k',
		color: 'info',
		title: 'Revenue',
		icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />,
	},
]

const renderStats = () => {
	return salesData.map((item, index) => (
		<Grid item xs={12} sm={3} key={index}>
			<Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
				<Avatar
					variant="rounded"
					sx={{
						mr: 3,
						width: 44,
						height: 44,
						boxShadow: 3,
						color: 'common.white',
						backgroundColor: `${item.color}.main`,
					}}
				>
					{item.icon}
				</Avatar>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="caption">{item.title}</Typography>
					<Typography variant="h6">{item.stats}</Typography>
				</Box>
			</Box>
		</Grid>
	))
}

const Dashboard = () => {
	const theme = useTheme()
	// const isLoggedIn = localStorage.getItem('isLoggedIn')
	// const dispatch = useDispatch()
	// useEffect(() => {
	// 	if (!isLoggedIn) {
	// 		dispatch(logout())
	// 	}
	// }, [isLoggedIn, dispatch])

	const options = {
		chart: {
			parentHeightOffset: 0,
			toolbar: { show: false },
		},
		plotOptions: {
			bar: {
				borderRadius: 9,
				distributed: true,
				columnWidth: '40%',
				endingShape: 'rounded',
				startingShape: 'rounded',
			},
		},
		stroke: {
			width: 2,
			colors: [theme.palette.background.paper],
		},
		legend: { show: false },
		grid: {
			strokeDashArray: 7,
			padding: {
				top: -1,
				right: 0,
				left: -12,
				bottom: 5,
			},
		},
		dataLabels: { enabled: false },
		colors: ['#9155fd'],
		states: {
			hover: {
				filter: { type: 'none' },
			},
			active: {
				filter: { type: 'none' },
			},
		},
		xaxis: {
			categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			tickPlacement: 'on',
			labels: { show: false },
			axisTicks: { show: false },
			axisBorder: { show: false },
		},
		yaxis: {
			show: true,
			tickAmount: 4,
			labels: {
				offsetX: -17,
				formatter: (value) =>
					`${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`,
			},
		},
	}
	const pieOptions = {
		chart: {
			width: 320,
			type: 'pie',
		},
		labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
					legend: {
						position: 'bottom',
					},
				},
			},
		],
	}

	const data = [
		{
			progress: 75,
			imgHeight: 20,
			title: 'Zipcar',
			color: 'primary',
			amount: '$24,895.65',
			subtitle: 'Vuejs, React & HTML',
			imgSrc: '/images/logo-zipcar.png',
		},
		{
			progress: 50,
			color: 'info',
			imgHeight: 27,
			title: 'Bitbank',
			amount: '$8,650.20',
			subtitle: 'Sketch, Figma & XD',
			imgSrc: '/images/logo-bitbank.png',
		},
		{
			progress: 20,
			imgHeight: 20,
			title: 'Aviato',
			color: 'secondary',
			amount: '$1,245.80',
			subtitle: 'HTML & Angular',
			imgSrc: '/images/logo-aviato.png',
		},
	]

	const depositData = [
		{
			logoWidth: 28,
			logoHeight: 29,
			amount: '+$4,650',
			subtitle: 'Sell UI Kit',
			title: 'Gumroad Account',
			logo: '/images/gumroad.png',
		},
		{
			logoWidth: 38,
			logoHeight: 38,
			amount: '+$92,705',
			title: 'Mastercard',
			subtitle: 'Wallet deposit',
			logo: '/images/mastercard-label.png',
		},
		{
			logoWidth: 20,
			logoHeight: 28,
			amount: '+$957',
			title: 'Stripe Account',
			subtitle: 'iOS Application',
			logo: '/images/stripe.png',
		},
		{
			logoWidth: 34,
			logoHeight: 32,
			amount: '+$6,837',
			title: 'American Bank',
			subtitle: 'Bank Transfer',
			logo: '/images/american-bank.png',
		},
		{
			logoWidth: 33,
			logoHeight: 22,
			amount: '+$446',
			title: 'Bank Account',
			subtitle: 'Wallet deposit',
			logo: '/images/citi-bank.png',
		},
	]

	const withdrawData = [
		{
			logoWidth: 29,
			logoHeight: 30,
			amount: '-$145',
			title: 'Google Adsense',
			subtitle: 'Paypal deposit',
			logo: '/images/google.png',
		},
		{
			logoWidth: 34,
			logoHeight: 34,
			amount: '-$1870',
			title: 'Github Enterprise',
			logo: '/images/github.png',
			subtitle: 'Security & compliance',
		},
		{
			logoWidth: 30,
			logoHeight: 30,
			amount: '-$450',
			title: 'Upgrade Slack Plan',
			subtitle: 'Debit card deposit',
			logo: '/images/slack.png',
		},
		{
			logoWidth: 30,
			logoHeight: 30,
			amount: '-$540',
			title: 'Digital Ocean',
			subtitle: 'Cloud Hosting',
			logo: '/images/digital-ocean.png',
		},
		{
			logoWidth: 36,
			logoHeight: 21,
			amount: '-$21',
			title: 'AWS Account',
			logo: '/images/aws.png',
			subtitle: 'Choosing a Cloud Platform',
		},
	]

	// Styled Divider component
	const Divider = styled(MuiDivider)(({ theme }) => ({
		margin: theme.spacing(5, 0),
		borderRight: `1px solid ${theme.palette.divider}`,
		[theme.breakpoints.down('md')]: {
			borderRight: 'none',
			margin: theme.spacing(0, 5),
			borderBottom: `1px solid ${theme.palette.divider}`,
		},
	}))

	return (
		<>
			<div className="main-container">
				<SidebarMenus />
				<div className="dashboard-container">
					<Header />
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							type: 'spring',
							stiffness: 150,
							duration: 0.5,
						}}
						className="dashboard-content"
					>
						{/* tropy section */}
						<Card
							className="box_shadow trophyCard"
							sx={{ position: 'relative' }}
						>
							<CardContent>
								<Typography variant="h6">
									Congratulations{' '}
									{localStorage.getItem('userName')} 🥳
								</Typography>
								<Typography
									variant="body2"
									sx={{ letterSpacing: '0.25px' }}
								>
									Best seller of the month
								</Typography>
								<Typography
									variant="h5"
									sx={{ my: 4, color: 'primary.main' }}
								>
									$42.8k
								</Typography>
								<Button
									className="btn-color"
									size="small"
									variant="contained"
								>
									View Sales
								</Button>
								<TriangleImg
									alt="triangle background"
									src={tropyBag}
								/>
								<TrophyImg alt="trophy" src={tropy} />
							</CardContent>
						</Card>
						{/* StaticCard section */}
						<Card className="staticCard box_shadow">
							<CardHeader
								title="Statistics Card"
								action={
									<IconButton
										size="small"
										aria-label="settings"
										className="card-more-options"
										sx={{ color: 'text.secondary' }}
									>
										<DotsVertical />
									</IconButton>
								}
								subheader={
									<Typography variant="body2">
										<Box
											component="span"
											sx={{
												fontWeight: 600,
												color: 'text.primary',
											}}
										>
											Total 48.5% growth
										</Box>{' '}
										😎 this month
									</Typography>
								}
								titleTypographyProps={{
									sx: {
										mb: 2.5,
										lineHeight: '2rem !important',
										letterSpacing: '0.15px !important',
									},
								}}
							/>
							<CardContent
								sx={{
									pt: (theme) =>
										`${theme.spacing(3)} !important`,
								}}
							>
								<Grid container spacing={[5, 0]}>
									{renderStats()}
								</Grid>
							</CardContent>
						</Card>
						{/* WeeklyOverview section */}
						<Card className="weeklyOverview box_shadow">
							<CardHeader
								title="Weekly Overview"
								titleTypographyProps={{
									sx: {
										lineHeight: '2rem !important',
										letterSpacing: '0.15px !important',
									},
								}}
								action={
									<IconButton
										size="small"
										aria-label="settings"
										className="card-more-options"
										sx={{ color: 'text.secondary' }}
									>
										<DotsVertical />
									</IconButton>
								}
							/>
							<CardContent
								sx={{
									'& .apexcharts-xcrosshairs.apexcharts-active':
										{ opacity: 0 },
								}}
							>
								{/* <Bar options={options} data={data} />
								 */}
								<ApexCharts
									type="bar"
									height={205}
									options={options}
									series={[
										{ data: [37, 57, 45, 75, 57, 40, 65] },
									]}
								/>
								{/* <ReactApexcharts
									type="bar"
									height={205}
									options={options}
									series={[
										{ data: [37, 57, 45, 75, 57, 40, 65] },
									]}
								/> */}
								<Box
									className="weeklyOverview__progress"
									sx={{
										mb: 7,
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Typography variant="h5" sx={{ mr: 4 }}>
										45%
									</Typography>
									<Typography variant="body2">
										Your sales performance is 45% 😎 better
										compared to last month
									</Typography>
								</Box>
								<Button
									className="btn-color"
									fullWidth
									variant="contained"
								>
									Details
								</Button>
							</CardContent>
						</Card>
						{/* totalEarning section */}
						<Card className="totalEarning box_shadow">
							<CardHeader
								title="Total Earning"
								titleTypographyProps={{
									sx: {
										lineHeight: '1.6 !important',
										letterSpacing: '0.15px !important',
									},
								}}
								action={
									<IconButton
										size="small"
										aria-label="settings"
										className="card-more-options"
										sx={{ color: 'text.secondary' }}
									>
										<DotsVertical />
									</IconButton>
								}
							/>
							<CardContent
								sx={{
									pt: (theme) =>
										`${theme.spacing(2.25)} !important`,
								}}
							>
								<Box
									sx={{
										mb: 1.5,
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Typography
										variant="h4"
										sx={{
											fontWeight: 600,
											fontSize: '2.125rem !important',
										}}
									>
										$24,895
									</Typography>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											color: 'rgb(86, 202, 0)',
										}}
									>
										<MenuUp
											sx={{
												fontSize: '1.875rem',
												verticalAlign: 'middle',
											}}
										/>
										<Typography
											variant="body2"
											sx={{
												fontWeight: 600,
												color: 'rgb(86, 202, 0)',
											}}
										>
											10%
										</Typography>
									</Box>
								</Box>

								<Typography
									component="p"
									variant="caption"
									sx={{ mb: 10 }}
								>
									Compared to $84,325 last year
								</Typography>

								{data.map((item, index) => {
									return (
										<Box
											key={item.title}
											sx={{
												display: 'flex',
												alignItems: 'center',
												...(index !== data.length - 1
													? { mb: 8.5 }
													: {}),
											}}
										>
											<Avatar
												variant="rounded"
												sx={{
													mr: 3,
													width: 40,
													height: 40,
													backgroundColor: '#9155fd',
												}}
											>
												<img
													src={item.imgSrc}
													alt={item.title}
													height={item.imgHeight}
												/>
											</Avatar>
											<Box
												sx={{
													width: '100%',
													display: 'flex',
													flexWrap: 'wrap',
													alignItems: 'center',
													justifyContent:
														'space-between',
												}}
											>
												<Box
													sx={{
														marginRight: 2,
														display: 'flex',
														flexDirection: 'column',
													}}
												>
													<Typography
														variant="body2"
														sx={{
															mb: 0.5,
															fontWeight: 600,
															color: 'text.primary',
														}}
													>
														{item.title}
													</Typography>
													<Typography variant="caption">
														{item.subtitle}
													</Typography>
												</Box>

												<Box
													sx={{
														minWidth: 85,
														display: 'flex',
														flexDirection: 'column',
													}}
												>
													<Typography
														variant="body2"
														sx={{
															mb: 2,
															fontWeight: 600,
															color: 'text.primary',
														}}
													>
														{item.amount}
													</Typography>
													<LinearProgress
														color={item.color}
														value={item.progress}
														variant="determinate"
													/>
												</Box>
											</Box>
										</Box>
									)
								})}
							</CardContent>
						</Card>
						{/* staticCard section */}
						<Grid
							margin={2}
							width={'34.2%'}
							item
							xs={12}
							md={6}
							lg={4}
						>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<CardStatisticsVerticalComponent
										stats="$25.6k"
										icon={<Poll />}
										color="success"
										trendNumber="+42%"
										title="Total Profit"
										subtitle="Weekly Profit"
									/>
								</Grid>
								<Grid item xs={6}>
									<CardStatisticsVerticalComponent
										stats="$78"
										title="Refunds"
										trend="negative"
										color="primary"
										trendNumber="-15%"
										subtitle="Past Month"
										icon={<CurrencyUsd />}
									/>
								</Grid>
								<Grid item xs={6}>
									<CardStatisticsVerticalComponent
										stats="862"
										trend="negative"
										color="secondary"
										trendNumber="-18%"
										title="New Project"
										subtitle="Yearly Project"
										icon={<BriefcaseVariantOutline />}
									/>
								</Grid>
								<Grid item xs={6}>
									<CardStatisticsVerticalComponent
										stats="15"
										color="warning"
										trend="negative"
										trendNumber="-18%"
										subtitle="Last Week"
										title="Sales Queries"
										icon={<HelpCircleOutline />}
									/>
								</Grid>
							</Grid>
						</Grid>
						{/* pie-chart */}
						<Card className="overview-chart box_shadow">
							<CardHeader
								title=" Overview"
								titleTypographyProps={{
									sx: {
										lineHeight: '2rem !important',
										letterSpacing: '0.15px !important',
									},
								}}
								action={
									<IconButton
										size="small"
										aria-label="settings"
										className="card-more-options"
										sx={{ color: 'text.secondary' }}
									>
										<DotsVertical />
									</IconButton>
								}
							/>
							<CardContent
								sx={{
									'& .apexcharts-xcrosshairs.apexcharts-active':
										{ opacity: 0 },
								}}
							>
								<ReactApexChart
									type="pie"
									width={320}
									options={pieOptions}
									series={[44, 55, 13, 43, 22]}
								/>
								<Button
									className="btn-color mt-2"
									fullWidth
									variant="contained"
								>
									Details
								</Button>
							</CardContent>
						</Card>
						{/* deposit-withdraw section */}
						<Card
							sx={{
								width: '44.85rem',
								marginLeft: '1rem',
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: ['column', 'column', 'row'],
							}}
						>
							<Box sx={{ width: '100%' }}>
								<CardHeader
									title="Deposit"
									sx={{
										pt: 5.5,
										alignItems: 'center',
										'& .MuiCardHeader-action': { mt: 0.6 },
									}}
									action={
										<Typography
											style={{ cursor: 'pointer' }}
											variant="caption"
										>
											View All
										</Typography>
									}
									titleTypographyProps={{
										variant: 'h6',
										sx: {
											lineHeight: '1.6 !important',
											letterSpacing: '0.15px !important',
										},
									}}
								/>
								<CardContent
									sx={{
										pb: (theme) =>
											`${theme.spacing(2)} !important`,
									}}
								>
									{depositData.map((item, index) => {
										return (
											<Box
												key={item.title}
												sx={{
													display: 'flex',
													alignItems: 'center',
													mb:
														index !==
														depositData.length - 1
															? 6
															: 0,
												}}
											>
												<Box
													sx={{
														minWidth: 38,
														display: 'flex',
														justifyContent:
															'center',
													}}
												>
													<img
														src={item.logo}
														alt={item.title}
														width={item.logoWidth}
														height={item.logoHeight}
													/>
												</Box>
												<Box
													sx={{
														ml: 4,
														width: '100%',
														display: 'flex',
														flexWrap: 'wrap',
														alignItems: 'center',
														justifyContent:
															'space-between',
													}}
												>
													<Box
														sx={{
															marginRight: 2,
															display: 'flex',
															flexDirection:
																'column',
														}}
													>
														<Typography
															sx={{
																fontWeight: 600,
																fontSize:
																	'0.875rem',
															}}
														>
															{item.title}
														</Typography>
														<Typography variant="caption">
															{item.subtitle}
														</Typography>
													</Box>
													<Typography
														variant="subtitle2"
														sx={{
															fontWeight: 600,
															color: 'success.main',
														}}
													>
														{item.amount}
													</Typography>
												</Box>
											</Box>
										)
									})}
								</CardContent>
							</Box>

							<Divider className="dividerHr" flexItem />

							<Box sx={{ width: '100%' }}>
								<CardHeader
									title="Withdraw"
									sx={{
										pt: 5.5,
										alignItems: 'center',
										'& .MuiCardHeader-action': { mt: 0.6 },
									}}
									action={
										<Typography
											style={{ cursor: 'pointer' }}
											variant="caption"
										>
											View All
										</Typography>
									}
									titleTypographyProps={{
										variant: 'h6',
										sx: {
											lineHeight: '1.6 !important',
											letterSpacing: '0.15px !important',
										},
									}}
								/>
								<CardContent
									sx={{
										pb: (theme) =>
											`${theme.spacing(2)} !important`,
									}}
								>
									{withdrawData.map((item, index) => {
										return (
											<Box
												key={item.title}
												sx={{
													display: 'flex',
													alignItems: 'center',
													mb:
														index !==
														depositData.length - 1
															? 6
															: 0,
												}}
											>
												<Box
													sx={{
														minWidth: 36,
														display: 'flex',
														justifyContent:
															'center',
													}}
												>
													<img
														src={item.logo}
														alt={item.title}
														width={item.logoWidth}
														height={item.logoHeight}
													/>
												</Box>
												<Box
													sx={{
														ml: 4,
														width: '100%',
														display: 'flex',
														flexWrap: 'wrap',
														alignItems: 'center',
														justifyContent:
															'space-between',
													}}
												>
													<Box
														sx={{
															marginRight: 2,
															display: 'flex',
															flexDirection:
																'column',
														}}
													>
														<Typography
															sx={{
																fontWeight: 600,
																fontSize:
																	'0.875rem',
															}}
														>
															{item.title}
														</Typography>
														<Typography variant="caption">
															{item.subtitle}
														</Typography>
													</Box>
													<Typography
														variant="subtitle2"
														sx={{
															fontWeight: 600,
															color: 'error.main',
														}}
													>
														{item.amount}
													</Typography>
												</Box>
											</Box>
										)
									})}
								</CardContent>
							</Box>
						</Card>
					</motion.div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
