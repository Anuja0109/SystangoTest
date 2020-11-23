import { useState, useEffect } from 'react';

// Initialising store objects
let globalState = {};
let listeners = [];
let actions = {};

// Custom-Hook to be used as Redux store
// Didn't use Redux here as its a small app.
// Put shouldListen=true for optimization
export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    // eslint-disable-next-line no-restricted-syntax
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  // Using useEffect-hook for optimization when listening for any actions
  // Checking shouldListen=true to stop uneccessary rerenders of components which uses globalState
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

// Function for Initialising Store with actions & initialState
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
