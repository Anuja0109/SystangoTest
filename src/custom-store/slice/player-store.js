// Custome-Store-Slice for Adding Players in Team
import { initStore } from '../store';

const configureStore = () => {
  const actions = {
    ADD_PLAYER: (currentState, player) => {
      const updatedPlayers = [...currentState.players, player];
      return { players: updatedPlayers };
    },
  };
  initStore(actions, {
    players: [],
  });
};

export default configureStore;
