import React from 'react';
import { Icon } from 'semantic-ui-react';
import './KillboardList.css';
//import {Search} from 'semantic-ui-react';

const SearchBar = (props) => {
	const [SearchTerm, setSearchTerm] = React.useState('');

	const onChangeHandler = (e) => {
		setSearchTerm(e.target.value);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		props.SubmitFunction(SearchTerm);
	};

	console.log(SearchTerm);
	//console.log(Loading);

	return (
		<div className='wrapper'>
			<form onSubmit={onFormSubmit} className='ui search'>
				<Icon className='search-icon' name='search' size='small' />
				<input
					className='searchbar'
					type='text'
					value={SearchTerm}
					onChange={onChangeHandler}
				/>
			</form>
		</div>
	);
};

export default SearchBar;
