import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/common';


type TopbarProps = {
	topbarDark?: boolean
	toggleMenu?: () => void
	navOpen?: boolean
}


export interface MessageItem {
	id: number
	name: string
	subText: string
	avatar: string
	createdAt: Date
}

export interface NotificationItem {
	id: number
	title: string
	icon: string
	variant: string
	createdAt: Date
}

export interface ProfileOption {
	label: string
	icon: string
	redirectTo: string
}

const Topbar = ({ toggleMenu, navOpen }: TopbarProps) => {
	const { user } = useAuthContext();




	if (!user) {
		return (
			<div className="navbar-custom">
				<Row>
					<Col sm={12}>
						<div className="m-3">
							<Row>
								<Col>
									<h4 className="text-primary fw-bold">Welcome</h4>
									<h5 className="text-dark">Loading...</h5>
								</Col>
								<Col>
									<h4 className="text-primary fw-bold">Department</h4>
									<h5 className="text-dark">Loading...</h5>
								</Col>
								<Col lg={3}>
									<h4 className="text-primary fw-bold">Operate as</h4>
									<h5 className="text-dark">Loading...</h5>
								</Col>
								<Col lg={2} className="d-flex justify-content-end align-items-center">
									<span>
										<Button className="fw-bold">
											<Link to="/auth/logout" className="text-white">Logout</Link>
										</Button>
									</span>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		);
	}

	return (
		<>
			<div className="navbar-custom">
				<Row>
					<Col sm={12}>
						<div className=" m-3">
							<Row>
								<Col>
									<h4 className="text-primary fw-bold">Welcome</h4>
									<h5 className="text-dark">{user?.employeeName} - {user?.userName}</h5>
								</Col>
								<Col>
									<h4 className="text-primary fw-bold">Department</h4>
									<h5 className="text-dark">{user?.departmentName}</h5>
								</Col>
								<Col lg={3}>
									<h4 className="text-primary fw-bold">Operate as</h4>

									{user?.roles === 'Convener level 2' ? (
										<h5 className="text-dark">Department Level 1 | {user?.roles}</h5>
									) : (
										<h5 className="text-dark">{user?.roles}</h5>
									)}
								</Col>
								<Col lg={2} className="d-flex justify-content-end align-items-center">
									<span>
										<Button className="fw-bold">
											<Link to="/auth/logout" className="text-white">Logout</Link>
										</Button>
									</span>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Topbar;
