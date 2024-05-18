import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { AuthContext } from '../../context/AuthContext';
import { Form,Button, Input, message } from 'antd';
import Logo from './logo-standard.png';
import './RegisterModal.css';

const RegisterModal = () => {

  const { setLoad } = useContext(GlobalContext);
	const { postRegister } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (values) => {

		const formRegister = new FormData();
		setLoad(true);
		formRegister.append('user_name',values.user_name)
		formRegister.append('user_email',values.user_email)
		formRegister.append('user_password',values.user_password)
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
			<img src={Logo} alt='logo' className='LogoImg'></img>
			<div className="form-header">Register</div>
			<Form layout='vertical' onFinish={handleSubmit} autoComplete='off'>
            <Form.Item label={<label style={{ color:"white"}}>Full Name : </label>}  
			name="user_name" rules={[
              {
                required:true,
                message:'Please input your full name!'
              }
            ]}>
              <Input placeholder='Input your full name'/>
            </Form.Item>
            <Form.Item label={<label style={{ color:"white"}}>Email : </label>}
			name="user_email" rules={[
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
            <Form.Item label={<label style={{ color:"white"}}>Password : </label>} name="user_password" rules={[
              {
                required:true,
                message:'Please input your password!'
              }
            ]}>
              <Input.Password placeholder='Input your password'/>
            </Form.Item>
            <Form.Item>
              <Button
              type='primary' 
              htmlType='submit' 
              size='medium' 
              className='btn'
              > Create Account</Button>
            </Form.Item>
          </Form>
		<div className="form-footer">Already have an account?&nbsp;<NavLink to='/login' className='log-link'>Login here.</NavLink></div>
	</div>
	);
};

export default RegisterModal;