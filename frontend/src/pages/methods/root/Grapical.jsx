import '../../../styles/root/Grapical.css'
import GrapicalUtils from '../../../utils/root/Grapical'

import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'

function Graphical() {

    const [result, setResult] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        const first_history = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/graphical/history')
                setHistory(res.data)
            }
            catch (err) {
                console.log('Error get data : ', err)
            }
        }

        first_history()
    }, [])

    const cal = async () => {

        const fx = document.getElementById('fx').value;
        const xstart = parseFloat(document.getElementById('xstart').value);
        const xend = parseFloat(document.getElementById('xend').value);
        const ps = parseFloat(document.getElementById('ps').value);

        const result = GrapicalUtils(xstart, xend, ps, fx);

        if (Array.isArray(result)) {
            setResult(result);

            try {

                await axios.post('http://localhost:3001/api/graphical/save', {
                    fx : fx,
                    Xstart : xstart,
                    Xend : xend,
                    Plus_step : ps
                })
                
                const res = await axios.get('http://localhost:3001/api/graphical/history')
                setHistory(res.data)
                console.log('Save done')

            }
            catch (err) {
                console.log('error save : ', err)
            } 

        }
        else {
            alert("Cann't Solve please change.");
        }

    }

    return(
        <div className='Gbody'>
            <h1 className='Gh1' >Graphical methods</h1>

            { Array.isArray(history) && history.length > 0 && (
                <div className='history_table'>
                    <label className='history_label'>History</label>
                    <table>

                        <thead>
                            <tr>
                                <th>f(x)</th>
                                <th>X start</th>
                                <th>X end</th>
                                <th>Plus step</th>
                            </tr>
                        </thead>

                        <tbody>
                            {history.map( (row, index) =>
                                <tr key={index}>
                                    <td>{row.fx}</td>
                                    <td>{row.Xstart}</td>
                                    <td>{row.Xend}</td>
                                    <td>{row.Plus_step}</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            )}

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