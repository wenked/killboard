import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './KillboardList.css';

//import {Search} from 'semantic-ui-react';

const SearchBar = (props) => {
	const [SearchTerm, setSearchTerm] = React.useState('');

	const onChangeHandler = (e) => {
		setSearchTerm(e.target.value);
		console.log(props.location);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		props.SubmitFunction(SearchTerm);
		console.log(props.location.pathname);
		props.history.push('/killboard');
	};

	const myheader = {
		'justify-content': 'center',
		height: '100vh',
		'align-items': 'center',
		display: 'flex',
	};

	const searchfield = {
		height: '50px',
		padding: '10px',
		border: 'none',
		'border-radius': '25px',
		outline: 'none',
	};

	const myH1 = {
		color: '#d4d4dc',
		'margin-bottom': '50px',
		'margin-left': '20px',
		'font-size': '45px',
		'letter-spacing': '2px',
	};

	console.log(SearchTerm);
	console.log(props.location.pathname);
	let myHead;
	let searchF;
	let iconSize;

	//console.log(Loading);
	if (props.location.pathname === '/home') {
		myHead = 'myheader';
		searchF = 'searchfield';
		iconSize = 'large';
	} else {
		myHead = 'wrapper';
		searchF = 'searchbar';
		iconSize = 'small';
	}

	return (
		<div>
			<div className={myHead}>
				<form onSubmit={onFormSubmit} className='ui search'>
					{props.location.pathname === '/home' && (
						<h1 style={myH1}>KillBoard</h1>
					)}
					<Icon className='search-icon' name='search' size={iconSize} />
					<input
						className={searchF}
						type='text'
						value={SearchTerm}
						onChange={onChangeHandler}
					/>
				</form>
			</div>
		</div>
	);
};

export default withRouter(SearchBar);
