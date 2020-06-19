import React from 'react';
import '../styles/main.css';
import { Icon } from 'semantic-ui-react';

const ModalGraph = props => {
	return (
		<div className='w-full h-screen absolute top-0 left-0 z-10 bg-black bg-opacity-75 flex justify-center items-center'>
			<div className='bg-gray-1100 w-3/5 h-auto text-orange-1000 rounded-lg'>
				<button
					className='relative top-0 right-0 h-8 w-8 m-3 py-1'
					onClick={() => props.closeModal()}
				>
					<Icon link name='close' />
				</button>
				<div className='py-5'>{props.children}</div>
			</div>
		</div>
	);
};

export default ModalGraph;
