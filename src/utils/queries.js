export const queryBattleList = `query Battles($guildName: String!){
	battleList(guildName: $guildName){
		endTime
		totalFame
		totalKills
		totalPlayers
		id
		winnerGuilds
		losersGuilds
		winnerAllys
		losersAllys
	}
}`;

export const queryBattleDetail = `
query Battle($id: Int!) {
	battleById(id: $id) {
	  battleId
	  totalKills
	  totalFame
	  totalPlayers
	  guilds {
		alliance
		deaths
		totalPlayers
		kills
		name
		guildAverageIp
		killFame
		tanks {
			weapon
			role	
		}
		healers	{
			weapon
			role	
		}
		supports {
			weapon
			role	
		}
		rangedDps{
			weapon
			role	
		}
		melees{
			weapon
			role	
		}

	  }
	  winners {
		players{
			id
			name
			kills
			deaths
			guildName
			allianceName
			weapon
			averageIp
			killFame
		  }
		guilds {
		  alliance
		  deaths
		  totalPlayers
		  kills
		  name
		  guildAverageIp
		  killFame
		  
		}
	  }
	  losers {
		players{
			id
			name
			kills
			deaths
			guildName
			allianceName
			weapon
			averageIp
			killFame
			
		  }
		guilds {
		  alliance
		  deaths
		  totalPlayers
		  kills
		  name
		  guildAverageIp
		  killFame
		  
		}
	  }
	}
  }

`;
