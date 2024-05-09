import React from 'react';
import LoginModal from '../components/Modals/LoginModal';
// import '../css/login/landing.css';
// import '../css/login/modal.css';

const Login = () => {

	return (
		<div className='login'>
			<div className="landing">
				<LoginModal />
			</div>
		</div>
	);
};

export default Login;