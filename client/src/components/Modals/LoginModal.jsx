import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';
import { message } from 'antd';
import './LoginModal.css';

const LoginModal = () => {

	const { setLoad, setToken } = useContext(GlobalContext);
	const { postLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {

		e.preventDefault();
		setLoad(true);
		const formLogin = new FormData(e.target);
		const res = await postLogin(formLogin);

		if (res.response) {
			setLoad(false);
			message.error(res.response.data.message);
		} else {
			localStorage.setItem('accessToken', res.data.data.accessToken);
			setToken(localStorage.getItem('accessToken'));
			message.success('Login successfully!');
			setLoad(false);
			navigate('/transactions');
		};
	};

	return (
		<div className='log-modal'>

			<div className="form-header">Login:</div>

			<form onSubmit={handleSubmit}>

				<label>
					Email:
					<input type="text" name="user_email" id="user_email" autoComplete='email' />
				</label>

				<label>
					Password:
					<input type="text" name="user_password" id="user_password" />
				</label>

				<button type='submit'>Login</button>
			</form>

			<div className="form-footer">Don't have an account?&nbsp;<NavLink to='/register' className='log-link'>Register here.</NavLink></div>
		</div>
	);
};

export default LoginModal;