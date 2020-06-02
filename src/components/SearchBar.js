import React from 'react';
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
		<div>
			<form onSubmit={onFormSubmit} className='ui search'>
				<input type='text' value={SearchTerm} onChange={onChangeHandler} />
			</form>
		</div>
	);
};

export default SearchBar;
