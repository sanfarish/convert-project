import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

const LoadLayer = () => {

	const { load } = useContext(GlobalContext);

	return load && <div className='loader-screen' style={{
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		height: '100vh',
		width: '100vw',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '30pt'
	}}>Loading...</div>;
};

export default LoadLayer;