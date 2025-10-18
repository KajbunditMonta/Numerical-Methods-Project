import axios from 'axios'
import '../../../styles/root/Secant.css'

import Secant from '../../../utils/root/Secant.js'
import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'

function SecantPages () {

    const [ result, setResult ] = useState([])
    const [ history, setHistory ] = useState([])

    useEffect( () => {
        const first_load = async () => {

            try {
                const res = await axios.get('http://localhost:3001/api/secant/history')
                setHistory(res.data)
                console.log("first load done!")
            }
            catch (err) {
                console.log("Error load data! ", err)
            }

        }

        first_load()

    }, [])

    const cal = async () => {

        const fx = document.getElementById('fx').value
        const x0 = parseFloat(document.getElementById('x0').value)
        const x1 = parseFloat(document.getElementById('x1').value)
        const error = parseFloat(document.getElementById('error').value)
        
        const result = Secant(fx, x0, x1, error)

        if (Array.isArray(result)) {
            setResult(result)

            try {
                axios.post('http://localhost:3001/api/secant/save', {
                    fx : fx,
                    x0 : x0,
                    x1 : x1,
                    error : error
                })

                const res = await axios.get('http://localhost:3001/api/secant/history')
                setHistory(res.data)
                console.log('Save done')

            }
            catch (err) {
                console.log("Error save data! ", err)
            }

        }
        else {

        }

    }

    return (
        <div className='secant_body'>
            <h1 className='secant_head'>Secant methods</h1>
            
            { Array.isArray(history) && history.length > 0 && (
                <div className='history_table'>
                    <label className='history_label'>History</label>
                    <table>
                        <thead>
                            <tr>
                                <th>f(x)</th>
                                <th>x(0)</th>
                                <th>x(1)</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map( (row, index) =>
                                <tr key={index}>
                                    <td>{row.fx}</td>
                                    <td>{row.x0}</td>
                                    <td>{row.x1}</td>
                                    <td>{row.error}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <label className='fx_label'>X(n+1) = </label>
            <input className='fx_box' id='fx' type='text' defaultValue='x^2-7'></input>
            <br/><br/><br/>

            <label className='x0_label'>X(0) : </label>
            <input className='x0_box' id='x0' type='number' step='1' defaultValue='2'></input>

            <label className='x1_label'> x(1) : </label>
            <input className='x1_box' id='x1' type='number' step='1' defaultValue='3'></input>

            <label className='error_label'> Error : </label>
            <input className='error_box' id='error' type='number' step='0.000001' defaultValue='0.000001'></input>
            <br/><br/><br/>

            <button className='cal_button' onClick={cal}>Calculate</button>
            <br/><br/><br/>

            <div className='result_table'>
                <table>
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
                                <td>{row.fx}</td>
                                <td>{row.err}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <br/><br/><br/>

            <div className='result_graph'>
                <Plot
                    data = {[
                        {
                            x : result.map(r => r.x),
                            y : result.map(r => r.x),
                            type : 'scatter',
                            mode : 'lines',
                            line : { color : 'blue' },
                            name : 'x = x'
                        }
                    ]}
                />
            </div>

        </div>
        
    )
}

export default SecantPages;