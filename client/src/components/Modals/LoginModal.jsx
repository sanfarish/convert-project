import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';
import { Button, Form, Input, message } from 'antd';
import Logo from './logo-standard.png';
import './LoginModal.css';

const LoginModal = () => {

	const { setLoad, setToken } = useContext(GlobalContext);
	const { postLogin } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (values) => {

		const formLogin = new FormData();
		setLoad(true);
		formLogin.append('user_email',values.user_email)
		formLogin.append('user_password',values.user_password)
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
			<img src={Logo} alt='logo' className='LogoImg'></img>
			<div className="form-header">Login</div>
			<Form layout='vertical'onFinish={handleSubmit} autoComplete='off'>
    			<Form.Item 
				label={<label style={{ color:"white"}}>Email : </label>} 
				name='user_email' rules={[
              	{
					required:true,
                    message:'Please input your Email!'
                },
                {
                    type:'email',
                    message:'Email is not valid'
                }
                ]}>
		    		<Input placeholder='Input your Email'/>
			    </Form.Item>
			    <Form.Item 
                label={<label style={{ color:"white"}}>Password : </label>}
                name="user_password" rules={[
                {
                    required:true,
                    message:'Please input your password!'
                }
                ]}>
                    <Input.Password placeholder='Input your password'/>
                </Form.Item>
			    <Form.Item>
			        <Button className='btn' type='primary' size='medium' htmlType='submit'>Submit</Button>
			    </Form.Item>
			</Form>
			<div className="form-footer">Don't have an account?&nbsp;<NavLink to='/register' className='log-link'>Register here.</NavLink></div>
		</div>
	);
};

export default LoginModal;