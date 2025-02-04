import { useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/common';

type TopbarProps = {
	topbarDark?: boolean;
	toggleMenu?: () => void;
	navOpen?: boolean;
};

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
	const navigate = useNavigate();
	const { user, updateRole } = useAuthContext();
	const userRoles = localStorage.getItem('userRoles');

	// Loader state for role switching
	const [loading, setLoading] = useState(false);

	const handleRoleChange = (newRole: string) => {
		setLoading(true); // Show loader
		setTimeout(() => {
			updateRole(newRole);
			setLoading(false); // Hide loader after 1 sec
			navigate('/'); // Redirect to home page
		}, 1000);
	};

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
			{/* Global Loader Overlay */}
			{loading && (
				<div className="global-loader">
					<Spinner animation="border" variant="primary" />
				</div>
			)}

			<div className="navbar-custom">
				<Row>
					<Col sm={12}>
						<div className="m-3">
							<Row>
								<Col>
									<h4 className="text-primary fw-bold">Welcome</h4>
									<h5 className="text-dark">{user?.employeeName} - {user?.userName}</h5>
								</Col>
								<Col>
									<h4 className="text-primary fw-bold">Department</h4>
									<h5 className="text-dark">{user?.departmentName}</h5>
								</Col>

								{userRoles === 'Convener level 2' && (
									<Col lg={3}>
										<h4 className="text-primary fw-bold">Operate as</h4>
										<h5 className="m-0">
											<Button
												variant={user.roles === 'Department level 2' ? 'primary' : 'outline-primary'}
												className="me-2 p-1"
												onClick={() => handleRoleChange('Department level 2')}
												disabled={loading}
											>
												Department Level 2
											</Button>
											<Button
												className="p-1"
												variant={user.roles === 'Convener level 2' ? 'primary' : 'outline-primary'}
												onClick={() => handleRoleChange('Convener level 2')}
												disabled={loading}
											>
												Convener Level 2
											</Button>
										</h5>
									</Col>
								)}
								{userRoles !== 'Convener level 2' && (
									<Col lg={3}>
										<h4 className="text-primary fw-bold">Operate as</h4>
										<h5 className="text-dark">{user?.roles}</h5>
									</Col>
								)}

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

			{/* Loader Styles */}
			<style>{`
				.global-loader {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(255, 255, 255, 0.8);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 9999;
				}
			`}</style>
		</>
	);
};

export default Topbar;
