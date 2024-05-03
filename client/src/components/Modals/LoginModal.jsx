import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginModal = () => {

	const { postLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {

		e.preventDefault();
		const formLogin = new FormData(e.target);
		const res = await postLogin(formLogin);

		if (res.message) {
			alert (res.response.data.message);
		} else {
			localStorage.setItem('accessToken', res.data.data.accessToken);
			navigate('/transactions');
		};
	};

	return (
		<div className='modal'>

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

			<div className="form-footer">Don't have an account? <NavLink to='/register'>Register here.</NavLink></div>
		</div>
	);
};

export default LoginModal;