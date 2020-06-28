import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './pages/KillboardList.css';
import '../styles/main.css';

//import {Search} from 'semantic-ui-react';
let myHead;
let searchF;
let iconSize;
let iconCSS;
let divFormCSS;

const SearchBar = props => {
	const [SearchTerm, setSearchTerm] = React.useState('');

	const onChangeHandler = e => {
		setSearchTerm(e.target.value);
	};

	const onFormSubmit = e => {
		e.preventDefault();
		props.SubmitFunction(SearchTerm);

		props.history.push('/killboards');
	};

	//console.log(Loading);
	if (props.location.pathname === '/') {
		myHead = 'justify-center h-full items-center flex';
		searchF = 'h-10 p-3 border-none rounded-full outline-none w-px400';
		iconSize = 'large';
		iconCSS = 'inline-block mt-24';
		divFormCSS = '';
	} else {
		myHead = 'relative flex m-w-100';
		searchF =
			'border-solid border border-black rounded-full h-6 w-full pt-1 pr-6 pb-1 pl-3 outline-none m-1 inline-flex';
		iconSize = 'small';
		iconCSS = 'mt-0';
		divFormCSS = 'pb-3';
	}

	//display: inline-flex;
	//color: #d4d4dc;

	return (
		<div>
			<div className={myHead}>
				<div className={divFormCSS}>
					<form onSubmit={onFormSubmit}>
						{props.location.pathname === '/' && (
							<h1 className='text-gray-1000 text-5xl mb-8  tracking-normal text-center hover:text-orange-1000'>
								KillBoard
							</h1>
						)}

						<input
							className={`bg-gray-800 text-gray-1000 ${searchF} focus:shadow-outline `}
							type='text'
							value={SearchTerm}
							onChange={onChangeHandler}
							placeholder='Guilds'
						/>
					</form>
				</div>
				<div className={iconCSS}>
					<button className='inline-flex hover:text-orange-1000'>
						<Icon
							className={`text-gray-1000 pl-2 hover:text-orange-1000`}
							name='search'
							size={iconSize}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default withRouter(SearchBar);
