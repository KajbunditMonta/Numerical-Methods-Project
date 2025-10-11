import '../../../styles/root/Grapical.css'
import GrapicalUtils from '../../../utils/root/Grapical'

import { useState } from 'react'
import Plot from 'react-plotly.js';

function Graphical() {

    const [result, setResult] = useState([]);

    const cal = () => {

        const fx = document.getElementById('fx').value;
        const xstart = parseFloat(document.getElementById('xstart').value);
        const xend = parseFloat(document.getElementById('xend').value);
        const ps = parseFloat(document.getElementById('ps').value);

        const result = GrapicalUtils(xstart, xend, ps, fx);

        if (Array.isArray(result)) {
            setResult(result);
        }
        else {
            alert("Cann't Solve please change.");
        }

    }

    return(
        <div className='Gbody'>
            <h1 className='Gh1' >Graphical methods</h1>
            <br/>

            <label className='labelf'> f(x) : </label>
            <input className='fbox' id='fx' type='text' defaultValue="43x-180" step="0.000001"></input>
            <br/><br/><br/>

            <label className='label'>X Start : </label>
            <input className='xbox' id='xstart' type='number' defaultValue="0" step="1"></input>

            <label className='label'> X End : </label>
            <input className='xbox' id='xend' type='number' defaultValue="10" step="1"></input>

            <label className='label'> Plus Step : </label>
            <input className='pbox' id='ps' type='number' defaultValue="0.000001" step="0.000001"></input>
            <br/><br/><br/>

            <button className='calBotton' onClick={cal}>Calculate</button>
            <br/><br/><br/>

            <div className='Gtable' >
                <table className='inGtable'>

                    <thead>
                        <tr>
                            <th>iter</th>
                            <th>x</th>
                            <th>f(x)</th>
                            <th>error</th>
                        </tr>
                    </thead>

                    <tbody>

                        {result.slice(0, 4).map( (row, index) => 
                            <tr key={index}>
                                <td>{row.iter}</td>
                                <td>{row.x}</td>
                                <td>{row.y}</td>
                                <td>{row.error}</td>
                            </tr>
                        )}

                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        
                        {result.slice(result.length - 4, result.length).map( (row, index) => 
                            <tr key={index}>
                                <td>{row.iter}</td>
                                <td>{row.x}</td>
                                <td>{row.y}</td>
                                <td>{row.error}</td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
            
            <Plot
                data = {[
                    {
                        x : result.map( r => r.x),
                        y : result.map( r => r.y),
                        type : 'scatter',
                        mode : 'lines+markers',
                        marker : { color: 'green' },
                        line : { color : 'red'}
                    },
                ]}
            />

        </div>
    );
}

export default Graphical;