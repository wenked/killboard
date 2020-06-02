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

	return (
		<div>
			<Container>
				<Header color='white' floated='left' size='medium'>
					ID:{battleContext.selectBattle.id}
				</Header>
				<Header floated='left' size='small' inverted='true'>
					Total Players:{battleContext.selectBattle.totalPlayers}
				</Header>
				<Header floated='left' size='small' inverted='true'>
					Total Kills: {battleContext.selectBattle.totalKills}
				</Header>
				<Header floated='left' size='small' inverted='true'>
					Total Fame: {battleContext.selectBattle.totalFame}
				</Header>
			</Container>
			<br />
			<br />
			<Container>
				<Header textAlign='left'> Winners </Header>
				<Table color='grey' inverted='true'>
					<Table.Header>
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
			</Container>
			<br />
			<Container>
				<WinnerPlayer />
			</Container>
			<br />
			<Container>
				<Header textAlign='left'> Losers </Header>
				<Table color='black' inverted='true'>
					<Table.Header>
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
			</Container>
			<br />
			<Container>
				<LoserPlayers />
			</Container>
		</div>
	);
};

export default BattleDetail;
