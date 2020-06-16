import React from 'react';
import { Route, Switch } from 'react-router-dom';
import KillboardList from './KillboardList';
import BattleDetail from './BattleDetail';
import Home from './Home';

const Routes = props => {
	return (
		<Switch>
			<Route path='/killboards' component={KillboardList} />
			<Route path={`/${props.battleid}`} exact component={BattleDetail} />
			<Route path='/' exact component={Home} />
		</Switch>
	);
};

export default Routes;
