import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import KillboardList from './pages/KillboardList';
import BattleDetail from './pages/BattleDetail';
import Home from './pages/Home';
import { AnimatePresence } from 'framer-motion';

const Routes = () => {
	const location = useLocation();
	return (
		<AnimatePresence exitBeforeEnter>
			<Switch location={location} key={location.key}>
				<Route path='/' exact component={Home} />
				<Route path='/killboards' exact component={KillboardList} />
				<Route path={`/killboards/:battleId`} component={BattleDetail} />
			</Switch>
		</AnimatePresence>
	);
};

export default Routes;
