import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';

import Home from './pages/Home';
import Graphical from './pages/methods/root/Grapical';
import Bisection from './pages/methods/root/Bisection';

function App() {
  return (
    <Router>
      <Routes>

        <Route path = "/" element = {<Home />} />

        <Route path = "/pages/methods/root/Grapical" element = {<Graphical />} />
        <Route path = "/pages/methods/root/Bisection" element = {<Bisection />} />

      </Routes>
    </Router>
  )
}

export default App;