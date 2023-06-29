import React from 'react';
import ReactDOM from 'react-dom';
import {
    Router,
    Routes, // instead of "Switch"
    Route
}
    from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Contact from './pages/Contact';
import Navigation from './components/Navigation';

function App() {
    ReactDOM.render(
        <Router>
            <Navigation />
            <Routes>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/rooms" component={Rooms} />
                <Route path="/contact" component={Contact} />
            </Routes>
        </Router>
    );
}

export default App;
