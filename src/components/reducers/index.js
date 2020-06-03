import React from 'react';
import BattleContext from '../../context/BattleContext';

const BattleReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GETLIST':
			const newstate = { ...state, battles: action.battles };
			return newstate;
		case 'SELECT':
			const selected = state.battles.filter(
				(battle) => battle.id === action.id
			);
			return { ...state, selected: selected };
		default:
			return state;
	}
};

export default BattleReducer;
