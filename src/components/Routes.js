import React from 'react';
import { Route, Switch } from 'react-router-dom';
import KillboardList from './pages/KillboardList';
import BattleDetail from './pages/BattleDetail';
import Home from './pages/Home';

const Routes = () => {
	return (
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/killboards' exact component={KillboardList} />
			<Route path={`/killboards/:battleId`} component={BattleDetail} />
		</Switch>
	);
};

export default Routes;
