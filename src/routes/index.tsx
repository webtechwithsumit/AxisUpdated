import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'))
const Register = React.lazy(() => import('../pages/auth/Register'))
const Logout = React.lazy(() => import('../pages/auth/Logout'))
const ForgotPassword = React.lazy(() => import('../pages/auth/ForgotPassword'))
const LockScreen = React.lazy(() => import('../pages/auth/LockScreen'))

// // dashboard
const Dashboard = React.lazy(() => import('../pages/Dashboard'))

// // pages
const ProfilePages = React.lazy(() => import('../pages/other/Profile/'))
const InvoicePages = React.lazy(() => import('../pages/other/Invoice'))
const FAQPages = React.lazy(() => import('../pages/other/FAQ'))
const PricingPages = React.lazy(() => import('../pages/other/Pricing'))
const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'))
const StarterPages = React.lazy(() => import('../pages/other/Starter'))
const ContactListPages = React.lazy(() => import('../pages/other/ContactList'))
const TimelinePages = React.lazy(() => import('../pages/other/Timeline'))

// // Custom Pages Components
const EmployeeMaster = React.lazy(() => import('../pages/other/HomePages/EmployeeMaster/EmployeeMaster.tsx'))
const EmployeeMasterinsert = React.lazy(() => import('../pages/other/HomePages/EmployeeMaster/EmployeeMasterinsert.tsx'))

const ManagerMaster = React.lazy(() => import('../pages/other/HomePages/ManagerMaster/ManagerMaster.tsx'))
const ManagerMasterinsert = React.lazy(() => import('../pages/other/HomePages/ManagerMaster/ManagerMasterinsert.tsx'))




const DepartmentMaster = React.lazy(() => import('../pages/other/HomePages/DepartmentMaster/DepartmentMaster.tsx'))
const DepartmentMasterinsert = React.lazy(() => import('../pages/other/HomePages/DepartmentMaster/DepartmentMasterinsert.tsx'))

// const WorkFlow = React.lazy(() => import('../pages/other/HomePages/WorkFlow/WorkFlow.tsx'))
// const WorkFlowinsert = React.lazy(() => import('../pages/other/HomePages/WorkFlow/WorkFlowinsert.tsx'))

// const TaskMaster = React.lazy(() => import('../pages/other/HomePages/TaskMaster/TaskMaster/TaskMaster.tsx'))
// const TaskMasterinsert = React.lazy(() => import('../pages/other/HomePages/TaskMaster/TaskMaster/TaskMasterinsert.tsx'))

// const SubTaskMaster = React.lazy(() => import('../pages/other/HomePages/TaskMaster/SubTaskMaster/SubTaskMaster.tsx'))
// const SubTaskMasterinsert = React.lazy(() => import('../pages/other/HomePages/TaskMaster/SubTaskMaster/SubTaskMasterinsert.tsx'))

const ProductTypeMaster = React.lazy(() => import('../pages/other/HomePages/ProductType/ProductTypeMaster.tsx'))
const ProductTypeMasterinsert = React.lazy(() => import('../pages/other/HomePages/ProductType/ProductTypeinsertMaster.tsx'))

const CheckListMaster = React.lazy(() => import('../pages/other/HomePages/CheckListMaster/CheckListMaster.tsx'))
const CheckListMasterinsert = React.lazy(() => import('../pages/other/HomePages/CheckListMaster/CheckListMasterinsert.tsx'))


const DiscussionList = React.lazy(() => import('../pages/other/HomePages/DiscussionForum/DiscussionList.tsx'))
const DiscussionForum = React.lazy(() => import('../pages/other/HomePages/DiscussionForum/DiscussionForum.tsx'))

const RoleMaster = React.lazy(() => import('../pages/other/HomePages/RoleMaster/Rolemaster.tsx'))
const RoleMasterinsert = React.lazy(() => import('../pages/other/HomePages/RoleMaster/RoleMasterinsert.tsx'))

const ApprovalTask = React.lazy(() => import('../pages/other/HomePages/ApprovalTask/ApprovalTask.tsx'))
const AssigneeDepartment = React.lazy(() => import('../pages/other/HomePages/AssigneeDepartment/assigneeDepartment.tsx'))


const ProductMasterinsert = React.lazy(() => import('../pages/other/HomePages/ProductMaster/ProductMasterinsert.tsx'))
const OwnDepartmentProduct = React.lazy(() => import('../pages/other/HomePages/ProductMaster/OwnProduct.tsx'))
const OtherDepartmentProduct = React.lazy(() => import('../pages/other/HomePages/ProductMaster/OtherProduct.tsx'))
const RejectedProduct = React.lazy(() => import('../pages/other/HomePages/ProductMaster/RejectProduct.tsx'))
const SignedOffProduct = React.lazy(() => import('../pages/other/HomePages/ProductMaster/SignOffProduct.tsx'))

const InstantMail = React.lazy(() => import('../pages/other/HomePages/InstantMail/InstantMail.tsx'))
const ComposeMail = React.lazy(() => import('../pages/other/HomePages/InstantMail/ComposeMail.tsx'))


const Addholiday = React.lazy(() => import('../pages/other/HomePages/AddHoliday/Addholiday.tsx'))
const AddholidayInsert = React.lazy(() => import('../pages/other/HomePages/AddHoliday/AddholidayInsert.tsx'))







// // error
const Error404 = React.lazy(() => import('../pages/error/Error404'))
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'))
const Error500 = React.lazy(() => import('../pages/error/Error500'))

export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
}

// dashboards
const dashboardRoutes: RoutesProps = {
	path: '/admin',
	name: 'Dashboards',
	icon: 'home',
	header: 'Navigation',
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Dashboard />,
			route: PrivateRoute,
			roles: ['DME', 'User']

		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			element: <Dashboard />,
			route: PrivateRoute,
			roles: ['DME', 'User']
		},
	],
}

// pages
const customPagesRoutes = {
	path: '/pages',
	name: 'Pages',
	icon: 'pages',
	header: 'Custom',
	children: [
		{
			path: '/pages/profile',
			name: 'Profile',
			element: <PrivateRoute element={<ProfilePages />} roles={['DME', 'User']} />,
			route: PrivateRoute,

		},


		{
			path: '/pages/EmployeeMaster',
			name: 'EmployeeMaster',
			element: <EmployeeMaster />,
			route: PrivateRoute,
		},

		{
			path: '/pages/EmployeeMasterinsert',
			name: 'EmployeeMasterinsert',
			element: <EmployeeMasterinsert />,
			route: PrivateRoute,
		},
		{
			path: '/pages/EmployeeMasterinsert/:id',
			name: 'EmployeeMasterinsert',
			element: <EmployeeMasterinsert />,
			route: PrivateRoute,
		},
		{
			path: '/pages/ManagerMaster',
			name: 'ManagerMaster',
			element: <ManagerMaster />,
			route: PrivateRoute,
		},

		{
			path: '/pages/ManagerMasterinsert',
			name: 'ManagerMasterinsert',
			element: <ManagerMasterinsert />,
			route: PrivateRoute,
		},
		{
			path: '/pages/ManagerMasterinsert/:id',
			name: 'ManagerMasterinsert',
			element: <ManagerMasterinsert />,
			route: PrivateRoute,
		},

		{
			path: '/pages/DepartmentMaster',
			name: 'DepartmentMaster',
			element: <DepartmentMaster />,
			route: PrivateRoute,
		},

		{
			path: '/pages/DepartmentMasterinsert',
			name: 'DepartmentMasterinsert',
			element: <DepartmentMasterinsert />,
			route: PrivateRoute,
		},
		{
			path: '/pages/DepartmentMasterinsert/:id',
			name: 'DepartmentMasterinsert',
			element: <DepartmentMasterinsert />,
			route: PrivateRoute,
		},

		{
			path: '/pages/ProductTypeMaster',
			name: 'ProductTypeMaster',
			element: <ProductTypeMaster />,
			route: PrivateRoute,
		},

		{
			path: '/pages/ProductTypeMasterinsert',
			name: 'ProductTypeMasterinsert',
			element: <ProductTypeMasterinsert />,
			route: PrivateRoute,
		},
		{
			path: '/pages/ProductTypeMasterinsert/:id',
			name: 'ProductTypeMasterinsert',
			element: <ProductTypeMasterinsert />,
			route: PrivateRoute,
		},

		{
			path: '/pages/CheckListMaster',
			name: 'CheckListMaster',
			element: <CheckListMaster />,
			route: PrivateRoute,
		},

		{
			path: '/pages/CheckListMasterinsert',
			name: 'CheckListMasterinsert',
			element: <CheckListMasterinsert />,
			route: PrivateRoute,
		},
		{
			path: '/pages/CheckListMasterinsert/:id',
			name: 'CheckListMasterinsert',
			element: <CheckListMasterinsert />,
			route: PrivateRoute,
		},

		{
			path: '/pages/DiscussionList',
			name: 'DiscussionList',
			element: <DiscussionList />,
			route: PrivateRoute,
		},

		{
			path: '/pages/DiscussionForum',
			name: 'DiscussionForum',
			element: <DiscussionForum />,
			route: PrivateRoute,
		},
		{
			path: '/pages/RoleMaster',
			name: 'RoleMaster',
			element: <RoleMaster />,
			route: PrivateRoute,
		},

		{
			path: '/pages/RoleMasterinsert',
			name: 'RoleMasterinsert',
			element: <RoleMasterinsert />,
			route: PrivateRoute,
		},
		{
			path: '/pages/RoleMasterinsert/:id',
			name: 'RoleMasterinsert',
			element: <RoleMasterinsert />,
			route: PrivateRoute,
		},

		{
			path: '/pages/ApprovalTask',
			name: 'ApprovalTask',
			element: <ApprovalTask />,
			route: PrivateRoute,
		},

		{
			path: '/pages/AssigneeDepartment',
			name: 'AssigneeDepartment',
			element: <AssigneeDepartment />,
			route: PrivateRoute,
		},




		{
			path: '/pages/ProductMaster',
			name: 'ProductMasterinsert',
			element: <ProductMasterinsert />,
			route: PrivateRoute,
		},

		{
			path: '/pages/ProductMaster/ProductMasterinsert/:id',
			name: 'ProductMasterinsert',
			element: <ProductMasterinsert />,
			route: PrivateRoute,
		},


		{
			path: '/pages/ProductMaster/OwnDepartmentProduct',
			name: 'OwnDepartmentProduct',
			element: <OwnDepartmentProduct />,
			route: PrivateRoute,
		},

		{
			path: '/pages/ProductMaster/OtherDepartmentProduct',
			name: 'OtherDepartmentProduct',
			element: <OtherDepartmentProduct />,
			route: PrivateRoute,
		},
		{
			path: '/pages/ProductMaster/RejectedProduct',
			name: 'RejectedProduct',
			element: <RejectedProduct />,
			route: PrivateRoute,
		},
		{
			path: '/pages/ProductMaster/SignedOffProduct',
			name: 'SignedOffProduct',
			element: <SignedOffProduct />,
			route: PrivateRoute,
		},
		{
			path: '/pages/InstantMail',
			name: 'InstantMail',
			element: <InstantMail />,
			route: PrivateRoute,
		},
		{
			path: '/pages/ComposeMail',
			name: 'ComposeMail',
			element: <ComposeMail />,
			route: PrivateRoute,
		},
		{
			path: '/pages/Addholiday',
			name: 'Addholiday',
			element: <Addholiday />,
			route: PrivateRoute,
		},
		{
			path: '/pages/AddholidayInsert',
			name: 'AddholidayInsert',
			element: <AddholidayInsert />,
			route: PrivateRoute,
		},

		{
			path: '/pages/invoice',
			name: 'Invoice',
			element: <InvoicePages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/faq',
			name: 'FAQ',
			element: <FAQPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/pricing',
			name: 'Pricing',
			element: <PricingPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/starter',
			name: 'Starter Page',
			element: <StarterPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/contact-list',
			name: 'Contact List',
			element: <ContactListPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/timeline',
			name: 'Timeline',
			element: <TimelinePages />,
			route: PrivateRoute,
		},
		{
			path: 'pages/error-404-alt',
			name: 'Error - 404-alt',
			element: <Error404Alt />,
			route: PrivateRoute,
		},
	],
}


// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route,
	},
	{
		path: '/auth/register',
		name: 'Register',
		element: <Register />,
		route: Route,
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route,
	},
	{
		path: '/auth/forgot-password',
		name: 'Forgot Password',
		element: <ForgotPassword />,
		route: Route,
	},
	{
		path: '/auth/lock-screen',
		name: 'Lock Screen',
		element: <LockScreen />,
		route: Route,
	},
]

// public routes
const otherPublicRoutes = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route,
	},
	{
		path: '/pages/maintenance',
		name: 'Maintenance',
		element: <MaintenancePages />,
		route: Route,
	},
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [dashboardRoutes, customPagesRoutes]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export {
	publicRoutes,
	authProtectedRoutes,
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
}
