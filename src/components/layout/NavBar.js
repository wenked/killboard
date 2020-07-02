import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import '../../styles/main.css';

const NavBar = () => {
	return (
		<nav>
			<ul className='MyUl bg-gray-1200 block md:flex xl:flex'>
				<li className='myLi'>
					<Link className='myA' to='/'>
						Home
					</Link>
				</li>
				<li className='myLi'>
					<Link className='myA active:text-orange-1000' to='/killboards'>
						Killboards
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
