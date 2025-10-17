import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/App.css';

import Navbar from './pages/components/Navbar';

import Home from './pages/Home';

import Graphical from './pages/methods/root/Grapical';
import Bisection from './pages/methods/root/Bisection';
import False from './pages/methods/root/False';
import One from './pages/methods/root/One';
import NewtonRaphson from './pages/methods/root/Newton-Raphson';
import Secant from './pages/methods/root/Secant';

import Cramer from './pages/methods/linear/Cramer';
import Gauss from './pages/methods/linear/Gauss';
import GaussJordan from './pages/methods/linear/GaussJordan';
import Matrix from './pages/methods/linear/Matrix';
import LU from './pages/methods/linear/LU';
import Jacobi from './pages/methods/linear/Jacobi';
import Conjugate from './pages/methods/linear/Conjugate';

import NewtonDivided from './pages/methods/inter/NewtonDivided';
import Lagrange from './pages/methods/inter/Lagrange';
import Spline from './pages/methods/inter/Spline';

import Simple from './pages/methods/exter/Simple';
import Multiple from './pages/methods/exter/Multiple';

import Trapezoidal from './pages/methods/integrat/Trapezoidal';
import CompositeTrapezoidal from './pages/methods/integrat/CompositeTrapezoidal';
import Simpson from './pages/methods/integrat/Simpson';
import CompositeSimpson from './pages/methods/integrat/CompositeSimpson';

import Diff from './pages/methods/diff/Diff'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path = "/" element = {<Home />} />

        <Route path = "/pages/methods/root/Grapical" element = {<Graphical />} />
        <Route path = "/pages/methods/root/Bisection" element = {<Bisection />} />
        <Route path = "/pages/methods/root/False" element = {<False />} />
        <Route path = "/pages/methods/root/One" element = {<One />} />
        <Route path = "/pages/methods/root/NewtonRaphson" element = {<NewtonRaphson />} />
        <Route path = "/pages/methods/root/Secant" element = {<Secant />} />

        <Route path = "/pages/methods/linear/Cramer" element = {<Cramer />} />
        <Route path = "/pages/methods/linear/Gauss" element = {<Gauss />} />
        <Route path = "/pages/methods/linear/GaussJordan" element = {<GaussJordan />} />
        <Route path = "/pages/methods/linear/Matrix" element = {<Matrix />} />
        <Route path = "/pages/methods/linear/LU" element = {<LU />} />
        <Route path = "/pages/methods/linear/Jacobi" element = {<Jacobi />} />
        <Route path = "/pages/methods/linear/Conjugate" element = {<Conjugate />} />

        <Route path = "/pages/methods/iter/NewtonDivided" element = {<NewtonDivided />} />
        <Route path = "/pages/methods/iter/Lagrange" element = {<Lagrange />} />
        <Route path = "/pages/methods/iter/Spline" element = {<Spline />} />

        <Route path = "/pages/methods/extra/Simple" element = {<Simple />} />
        <Route path = "/pages/methods/extra/Multiple" element = {<Multiple />} />

        <Route path = "/pages/methods/integrat/Trapezoidal" element = {<Trapezoidal />} />
        <Route path = "/pages/methods/integrat/CompositeTrapezoidal" element = {<CompositeTrapezoidal />} />
        <Route path = "/pages/methods/integrat/Simpson" element = {<Simpson />} />
        <Route path = "/pages/methods/integrat/CompositeSimpson" element = {<CompositeSimpson />} />

        <Route path = "/pages/methods/diff/Diff" element = {<Diff />} />

      </Routes>
    </Router>
  )
}

export default App;