import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './views/Home';
import Navbar from './components/Navbar/Navbar';
import store from './redux/store';
import './App.scss';
import TournamentPage from './views/TournamentPage';
import LeaguePage from './views/LeaguePage';
import EventsPage from './views/EventsPage';

const App = () => (
  <Provider store={store}>
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<TournamentPage />} />
            <Route path="/:leagueName" element={<LeaguePage />} />
            <Route path="/events/" element={<EventsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
