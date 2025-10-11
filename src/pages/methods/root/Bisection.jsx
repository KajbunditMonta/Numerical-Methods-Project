import '../../../styles/root/Bisection.css'
import BisectionUtils from '../../../utils/root/Bisection'

import { useState } from 'react'
import Plot from 'react-plotly.js'

function Bisection() {

    const [result, setResult] = useState([])

    const cal = () => {

        const fx = document.getElementById('fx').value
        const xstart = parseFloat(document.getElementById('xstart').value)
        const xend = parseFloat(document.getElementById('xend').value)
        const Error = parseFloat(document.getElementById('error').value)

        const result = BisectionUtils(xstart, xend, Error, fx)

        if (Array.isArray(result)) {
            setResult(result);
        }
        else {
            alert("Cann't Solve please change.");
        }

    }

    return(
        <div className='Bbody'>
            <h1 className='Bh1'>Bisection search</h1>
            <br/>

            <label className='labelf'>f(x) : </label>
            <input className='fbox' id='fx' type='text' defaultValue="x^4-13"></input>
            <br/><br/><br/>

            <label className='label'>X Start : </label>
            <input className='xbox' id='xstart' type='number' defaultValue='1.5' step='1'></input>

            <label className='label'> X End : </label>
            <input className='xbox' id='xend' type='number' defaultValue='2' step='1'></input>

            <label className='label'> Error : </label>
            <input className='pbox' id='error' type='number' defaultValue='0.000001' step='0.000001'></input>
            <br/><br/><br/>

            <button className='calBotton' onClick={cal}>Calculate</button>
            <br/><br/><br/>

            <div className='Gtable'>
                <table className='inGtable'>

                    <thead>
                        <tr>
                            <th>iter</th>
                            <th>x</th>
                            <th>f(x)</th>
                            <th>Error</th>
                        </tr>
                    </thead>

                    <tbody>
                        {result.map( (row, index) =>
                            <tr key={index}>
                                <td>{row.iter}</td>
                                <td>{row.x}</td>
                                <td>{row.y}</td>
                                <td>{row.err}</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            <Plot
                data = {[
                    {
                        x : result.map(r => r.x),
                        y : result.map(r => r.y),
                        type : 'scatter',
                        mode : 'lines+markers',
                        line : {color : 'red'},
                        marker : {color : 'green'}
                    }
                ]}
            />

        </div>
    );
}

export default Bisection;