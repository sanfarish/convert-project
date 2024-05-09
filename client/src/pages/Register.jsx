import React from 'react';
import RegisterModal from '../components/Modals/RegisterModal';
// import '../css/register/landing.css';
// import '../css/register/modal.css';

const Register = () => {

	return (
		<div className='register'>
			<div className="landing">
				<RegisterModal />
			</div>
		</div>
	);
};

export default Register;