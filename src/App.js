import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './views/Home';
import Navbar from './components/Navbar/Navbar';
import store from './redux/store';
import Details from './views/Details';
import './App.scss';

const App = () => (
  <Provider store={store}>
    <div className="wrapper">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/details" component={<Details />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
