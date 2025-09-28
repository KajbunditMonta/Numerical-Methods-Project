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
                {label : "False-position methods", path : ""},
                {label : "One-position methods", path : ""},
                {label : "Newton-Raphson Method", path : ""},
                {label : "Secant methods", path : ""}
            ]);
        }
        else if (selected === "linear") {
            setSolutions(["Cramer's Rule", "Gauss Elimination", "Gauss-Jordan Elimination", "Matrix Inversion", "LU Decomposition Methods", "Jacobi Iteration", "Conjugate Gradient Methods"]);
        }
        else if (selected === "inter") {
            setSolutions(["Newton divided-differences", "Lagrange interpolation", "Spline interpolation"]);
        }
        else if (selected === "extra") {
            setSolutions(["Simple Regression", "Multiple Regression"]);
        }
        else if (selected === "integrat") {
            setSolutions(["Trapezoidal Rule", "Composite Trapezoidal Rule", "Simpson Rule", "Composite Simpson Rule"]);
        }
        else if (selected === "diff") {
            setSolutions(["Numerical Differentiation"]);
        }

    }

    const handleSolutionChange = (e) => {
        const selected = e.target.value;
        navigate(selected);
    }

    return(
        <>
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

        </>
    )
}

export default Home;