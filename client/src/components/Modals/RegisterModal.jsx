import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';
import { message } from 'antd';
import './RegisterModal.css';

const RegisterModal = () => {

	const { setLoad } = useContext(GlobalContext);
	const { postRegister } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {

		e.preventDefault();
		setLoad(true);
		const formRegister = new FormData(e.target);
		const res = await postRegister(formRegister);

		if (res.message) {
			setLoad(false);
			message.error(res.response.data.message);
		} else {
			message.success('Registration successed!!');
			setLoad(false);
			navigate('/login');
		};
	};

	return (
		<div className='reg-modal'>

			<div className="form-header">Register:</div>

			<form onSubmit={handleSubmit}>

				<label>
					Name:
					<input type="text" name="user_name" id="user_name" autoComplete='name' />
				</label>

				<label>
					Email:
					<input type="text" name="user_email" id="user_email" autoComplete='email' />
				</label>

				<label>
					Password:
					<input type="text" name="user_password" id="user_password" />
				</label>

				<button type="submit">Register</button>
			</form>

			<div className="form-footer">Already have an account?&nbsp;<NavLink to='/login' className='log-link'>Login here.</NavLink></div>
		</div>
	);
};

export default RegisterModal;