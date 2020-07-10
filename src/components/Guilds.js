import React from 'react';
import '../styles/main.css';
//import { Table } from 'semantic-ui-react';
//import Table from 'react-bootstrap/Table';

Number.prototype.format = function (n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

const Guilds = ({ result, guilds }) => {
	let myCSS;
	if (result === 'winner') {
		myCSS = 'font-bold bg-orange-1000 border-collapse text-left';
	} else {
		myCSS = 'font-bold bg-gray-1200 text-gray-1000 border-collapse text-left';
	}
	const tableCss = 'border-collapse text-left';

	return (
		<table className='w-full border border-solid border-collapse border-gray-700'>
			<thead>
				<tr>
					<th className={myCSS}>Alliance</th>
					<th className={myCSS}>Guild</th>
					<th className={myCSS}>Players</th>
					<th className={myCSS}>Kills</th>
					<th className={myCSS}>Deaths</th>
					<th className={myCSS}>Kill Fame</th>
					<th className={myCSS}>Average IP</th>
				</tr>
			</thead>
			<tbody>
				{guilds.map((guild, i) => (
					<React.Fragment key={i}>
						<tr>
							<td className={tableCss}>{guild.alliance}</td>
							<td className={tableCss}>{guild.name}</td>
							<td className={tableCss}>{guild.totalPlayers}</td>
							<td className={tableCss}>{guild.kills}</td>
							<td className={tableCss}>{guild.deaths}</td>
							<td className={tableCss}>{guild.killFame.format()}</td>
							<td className={tableCss}>{guild.averageItemPower}</td>
						</tr>
					</React.Fragment>
				))}
			</tbody>
		</table>
	);
};

export default Guilds;
