import { useEffect } from 'react';
import LoginModal from '../components/Modals/LoginModal';

const Login = () => {

	useEffect(() => {
		document.title = 'Login | Expense Manager';
	}, []);

	return (
		<div className='login'>
			<div className="landing">
				<LoginModal />
			</div>
		</div>
	);
};

export default Login;