import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MemoizedHeader from './components/Header';
import Routes from './routes/Routes';
import configurePlayerStore from './custom-store/slice/player-store';
import configureAlertStore from './custom-store/slice/alert-store';
import configureTeamStore from './custom-store/slice/team-store';

// Configuring all the slice store here so that their state is available for all the components.
configureAlertStore();
configurePlayerStore();
configureTeamStore();

function App() {
  return (
    <Router>
      <MemoizedHeader title="TEAM MANAGER" />
      <main>
        <Routes />
      </main>
    </Router>
  );
}

export default App;
