import React from 'react';
import '../styles/main.css';
import { Icon } from 'semantic-ui-react';

const ModalGraph = props => {
	let mySize;
	if (props.size === 'big') {
		mySize = 'w-auto h-screen';
	} else {
		mySize = 'w-1/5 h-auto';
	}
	return (
		<div className=' w-full h-screen absolute top-0 left-0 z-10 bg-black bg-opacity-75 flex justify-center items-center'>
			<div
				className={`align-middle overflow-y-auto bg-gray-1100 ${mySize}  text-orange-1000 rounded-lg`}
			>
				<button
					className='relative top-0 right-0 h-8 w-8 mt-3 ml-3 py-1'
					onClick={() => props.closeModal()}
				>
					<Icon link name='close' />
				</button>
				<div className='p-4'>{props.children}</div>
			</div>
		</div>
	);
};

export default ModalGraph;
