import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
	return (
		<nav>
			<ul className='MyUl'>
				<li className='myLi'>
					<Link className='myA' to='/home'>
						Home
					</Link>
				</li>
				<li className='myLi'>
					<Link className='myA' to='/'>
						Killboard
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
