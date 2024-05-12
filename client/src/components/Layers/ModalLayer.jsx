import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import './ModalLayer.css';

const ModalLayer = () => {

	const { modal } = useContext(DataContext);

	const handleStyle = () => modal ? {
		top: '50%',
		opacity: 1,
		backdropFilter: 'brightness(0.9) blur(1px)',
		transition: 'opacity 0s ease-in-out, top 0s ease-in-out, backdrop-filter 200ms ease-out'
	} : {};

	return (
		<div className='modal-layer' style={handleStyle()}></div>
	);
};

export default ModalLayer;