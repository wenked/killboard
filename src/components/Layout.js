import React from 'react';
import NavBar from './NavBar';
import '../styles/main.css';
import Footer from './Footer';
import BattleContext from '../context/BattleContext';
import SearchBar from './SearchBar';

const Layout = props => {
	const battleContext = React.useContext(BattleContext);
	return (
		<React.Fragment>
			<div className='flex flex-col min-h-screen'>
				<NavBar />
				<SearchBar SubmitFunction={battleContext.onFormSubmit} />
				{props.children}
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default Layout;
