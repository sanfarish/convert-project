import { useEffect } from 'react';
import RegisterModal from '../components/Modals/RegisterModal';

const Register = () => {

	useEffect(() => {
		document.title = 'Register | Expense Manager';
	}, []);

	return (
		<div className='register'>
			<div className="landing">
				<RegisterModal />
			</div>
		</div>
	);
};

export default Register;