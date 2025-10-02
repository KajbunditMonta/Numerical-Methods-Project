import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../styles/Home.css'

function Home() {

    const [solution, setSolutions] = useState([]);
    const navigate = useNavigate();

    const handleProblemChange = (e) => {
        const selected = e.target.value;

        if (selected === "root") {
            setSolutions([
                {label : "Graphical methods", path : "/pages/methods/root/Grapical"},
                {label : "Bisection search", path : "/pages/methods/root/Bisection"},
                {label : "False-position methods", path : "/pages/methods/root/False"},
                {label : "One-position methods", path : "/pages/methods/root/One"},
                {label : "Newton-Raphson Method", path : "/pages/methods/root/NewtonRaphson"},
                {label : "Secant methods", path : "/pages/methods/root/Secant"}
            ]);
        }
        else if (selected === "linear") {
            setSolutions([
                {label : "Cramer's Rule", path : "/pages/methods/linear/Cramer"}, 
                {label : "Gauss Elimination", path : "/pages/methods/linear/Gauss"}, 
                {label : "Gauss-Jordan Elimination", path : "/pages/methods/linear/GaussJordan"}, 
                {label : "Matrix Inversion", path : "/pages/methods/linear/Matrix"},
                {label : "LU Decomposition Methods", path : "/pages/methods/linear/LU"}, 
                {label : "Jacobi Iteration", path : "/pages/methods/linear/Jacobi"}, 
                {label : "Conjugate Gradient Methods", path : "/pages/methods/linear/Conjugate"}
            ]);
        }
        else if (selected === "inter") {
            setSolutions([
                {label : "Newton divided-differences", path : "/pages/methods/iter/NewtonDivided"},
                {label : "Lagrange interpolation", path : "/pages/methods/iter/Lagrange"}, 
                {label : "Spline interpolation", path : "/pages/methods/iter/Spline"}
            ]);
        }
        else if (selected === "extra") {
            setSolutions([
                {label : "Simple Regression", path : "/pages/methods/extra/Simple"}, 
                {label : "Multiple Regression", path : "/pages/methods/extra/Multiple"}
            ]);
        }
        else if (selected === "integrat") {
            setSolutions([
                {label : "Trapezoidal Rule", path : "/pages/methods/integrat/Trapezoidal"}, 
                {label : "Composite Trapezoidal Rule", path : "/pages/methods/integrat/CompositeTrapezoidal"},
                {label : "Simpson Rule", path : "/pages/methods/integrat/Simpson"},
                {label : "Composite Simpson Rule", path : "/pages/methods/integrat/CompositeSimpson"}
            ]);
        }
        else if (selected === "diff") {
            setSolutions([
                {label : "Numerical Differentiation", path : "/pages/methods/diff/Diff"}
            ]);
        }

    }

    const handleSolutionChange = (e) => {
        const selected = e.target.value;
        navigate(selected);
    }

    return(
        <div className="Home-item">
            <h1>Numerical methods Project</h1>

            <label className="label">Problem : </label>
            <select className="option" onChange={handleProblemChange}>
                <option value="-" hidden>-</option>
                <option value="root">Root of Equation</option>
                <option value="linear">Linear algebra equation</option>
                <option value="inter">Interpolation</option>
                <option value="extra">Extrapolation</option>
                <option value="integrat">Integration</option>
                <option value="diff">Differentiation</option>
            </select>

            <label className="label"> Solution : </label>
            <select className="option" onChange={handleSolutionChange}>
                <option value="-" hidden>-</option>
                {solution.map((sol, idx) => (<option key={idx} value={sol.path}>{sol.label}</option>) )}
            </select>

        </div>
    )
}

export default Home;