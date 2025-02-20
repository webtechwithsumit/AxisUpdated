import { Image } from 'react-bootstrap'
import logo from '../../assets/images/Axis-securities.png'
import { PageBreadcrumb } from '@/components'
<title>Axis-Securities</title>

const Dashboard = () => {


	return (
		<>
			<PageBreadcrumb title="Welcome" />
			<div className='w-50 m-auto mt-5 pt-5'>
				<Image src={logo} alt="logo" className='w-100 ' />
			</div>

		</>
	)
}

export default Dashboard
