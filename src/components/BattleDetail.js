import React from 'react';
import { Table, Header, Container } from 'semantic-ui-react';
import BattleContext from '../context/BattleContext';
import WinnerPlayer from './WinnerPlayers';
import LoserPlayers from './LoserPlayers';
import './KillboardList.css';

const BattleDetail = (props) => {
	const battleContext = React.useContext(BattleContext);
	const Winners = battleContext.selectBattle.winners.guilds;
	const Losers = battleContext.selectBattle.losers.guilds;
	const mystyle = {
		margin: '10px',
		padding: '10px',
	};

	return (
		<div>
			<Container style={mystyle}>
				<div className='idInfoFont'>ID: {battleContext.selectBattle.id}</div>
				<div className='headerInfoFont'>
					Total Players:{battleContext.selectBattle.totalPlayers} Total Kills:
					{'     '}
					{battleContext.selectBattle.totalKills} Total Fame:{'      '}
					{battleContext.selectBattle.totalFame}
				</div>
			</Container>
			<br />
			<br />
			<div className='gridheaders'>
				<Container>
					<div className='headerWfont'>Winners</div>
				</Container>
				<Container>
					<div className='headerLfont'>Losers</div>
				</Container>
			</div>
			<div className='testegrid'>
				<Table size='small' inverted='true' className='tableList'>
					<Table.Header className='tableList'>
						<Table.Row>
							<Table.HeaderCell>Alliance</Table.HeaderCell>
							<Table.HeaderCell>Guild</Table.HeaderCell>
							<Table.HeaderCell>Players</Table.HeaderCell>
							<Table.HeaderCell>Kills</Table.HeaderCell>
							<Table.HeaderCell>Deaths</Table.HeaderCell>
							<Table.HeaderCell>Kill Fame</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{Winners.map((winner) => (
							<React.Fragment>
								<Table.Row>
									<Table.Cell>{winner.alliance}</Table.Cell>
									<Table.Cell>{winner.name}</Table.Cell>
									<Table.Cell>{winner.totalPlayers}</Table.Cell>
									<Table.Cell>{winner.kills}</Table.Cell>
									<Table.Cell>{winner.deaths}</Table.Cell>
									<Table.Cell>{winner.killFame}</Table.Cell>
								</Table.Row>
							</React.Fragment>
						))}
					</Table.Body>
				</Table>

				<Table size='small' inverted='true' className='loserTable'>
					<Table.Header className='loserTable'>
						<Table.Row>
							<Table.HeaderCell>Alliance</Table.HeaderCell>
							<Table.HeaderCell>Guild</Table.HeaderCell>
							<Table.HeaderCell>Players</Table.HeaderCell>
							<Table.HeaderCell>Kills</Table.HeaderCell>
							<Table.HeaderCell>Deaths</Table.HeaderCell>
							<Table.HeaderCell>Kill Fame</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{Losers.map((winner) => (
							<React.Fragment>
								<Table.Row>
									<Table.Cell>{winner.alliance}</Table.Cell>
									<Table.Cell>{winner.name}</Table.Cell>
									<Table.Cell>{winner.totalPlayers}</Table.Cell>
									<Table.Cell>{winner.kills}</Table.Cell>
									<Table.Cell>{winner.deaths}</Table.Cell>
									<Table.Cell>{winner.killFame}</Table.Cell>
								</Table.Row>
							</React.Fragment>
						))}
					</Table.Body>
				</Table>

				<WinnerPlayer />

				<LoserPlayers />
			</div>
		</div>
	);
};

export default BattleDetail;
