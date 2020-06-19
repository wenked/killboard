import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './pages/KillboardList.css';
import '../styles/main.css';

//import {Search} from 'semantic-ui-react';
let myHead;
let searchF;
let iconSize;

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
		myHead = 'myheader';
		searchF = 'searchfield';
		iconSize = 'large';
	} else {
		myHead = 'wrapper';
		searchF = 'searchbar';
		iconSize = 'small';
	}

	//display: inline-flex;
	//color: #d4d4dc;

	return (
		<div>
			<div className={myHead}>
				<form onSubmit={onFormSubmit}>
					{props.location.pathname === '/' && (
						<h1 className='text-gray-1000 text-5xl mb-8  tracking-normal text-center hover:text-orange-1000'>
							KillBoard
						</h1>
					)}

					<input
						className={searchF}
						type='text'
						value={SearchTerm}
						onChange={onChangeHandler}
						placeholder='Guilds'
					/>
					<button className='inline-flex hover:text-orange-1000'>
						<Icon
							className='text-gray-1000 pl-2 hover:text-orange-1000'
							name='search'
							size={iconSize}
						/>
					</button>
				</form>
			</div>
		</div>
	);
};

export default withRouter(SearchBar);
