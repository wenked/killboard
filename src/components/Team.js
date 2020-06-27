import React from 'react';
import '../styles/main.css';

const Team = ({ team, setTeam }) => {
	const teamMap = team.map(guild => (
		<div>
			<button
				onClick={() =>
					setTeam(
						team.filter(selectedguild => selectedguild.name !== guild.name)
					)
				}
			>
				<div className='text-gray-1000 block'>{guild.name}</div>
			</button>
		</div>
	));
	return <div>{teamMap}</div>;
};

export default Team;
