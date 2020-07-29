import React from 'react';
import NavBar from './NavBar';
import '../../styles/main.css';
import Footer from './Footer';

const Layout = ({ children }) => {
	return (
		<React.Fragment>
			<div className='flex flex-col min-h-screen'>
				<NavBar />
				<div className='ml-4 mr-4 pb-4'>{children}</div>
				<Footer />
			</div>
		</React.Fragment>
	);
};

export default Layout;
