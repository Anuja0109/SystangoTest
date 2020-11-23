// Custome-Store-Slice for Selecting Team Members & their respective Positions
import { initStore } from '../store';

const configureStore = () => {
  const actions = {
    // COMPOSE_TEAM: (currentState, team) => {
    //   const updatedTeam = { ...currentState.team.teamSelected };
    //   updatedTeam = [...updatedTeam, team];
    //   updatedState =
    // },
  };
  initStore(actions, {
    team: {
      teamSelected: [],
      positions: [
        { title: 'Point Guard (PG)', id: 'PG' },
        { title: 'Shooting Guard(SG)', id: 'SG' },
        { title: 'Small Forward (SF)', id: 'SF' },
        { title: 'Power Forward (PF)', id: 'PF' },
        { title: 'Center (C)', id: 'C' },
      ],
    },
  });
};

export default configureStore;
