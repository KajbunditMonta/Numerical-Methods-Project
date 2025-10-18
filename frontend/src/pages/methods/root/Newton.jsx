import { useState, useEffect } from 'react'
import '../../../styles/root/Newton.css'

import Newton from '../../../utils/root/Newton'

import axios from 'axios'
import Plot from 'react-plotly.js'

function NewtonRaphson () {

    const [ result, setResult ] = useState([])
    const [ history, setHistory] = useState([])

    useEffect(() => {
        const first_history = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/newton-raphson/history')
                setHistory(res.data)
            }
            catch (err) {
                console.log('Error get data : ', err)
            }
        }

        first_history()
    }, [])

    const cal = async () => {

        const fx = document.getElementById('fx').value
        const xi = parseFloat(document.getElementById('xi').value)
        const err = parseFloat(document.getElementById('err').value)
        
        const result = Newton(fx, xi, err)

        if (Array.isArray(result)) {
            setResult(result)

            try {
                await axios.post('http://localhost:3001/api/newton-raphson/save', {
                    fx : fx,
                    xi : xi,
                    error : err
                })
                console.log("Save data done! ")

                const res = await axios.get("http://localhost:3001/api/newton-raphson/history")
                setHistory(res.data)
                console.log('Save done')
            }
            catch (err) {
                console.log("Error save data! ", err)
            }

        }
        else {
            alert("Cann't Solve please change.")
        }

    }

    return (
        <div className="Nbody">
            <h1 className='Nh1'>Newton-Raphson Method</h1>

            {Array.isArray(history) && history.length > 0 && (
                <div className='history_table'>
                    <label className='history_label'>History</label>
                    <table>
                        <thead>
                            <tr>
                                <th>f(x)</th>
                                <th>X initial</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map( (row, index) =>
                                <tr key={index}>
                                    <td>{row.fx}</td>
                                    <td>{row.xi}</td>
                                    <td>{row.error}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <label className='fx_label'>f(x) : </label>
            <input className='fx_box' id='fx' type='text' defaultValue='x^2-7'></input>
            <br/><br/><br/>

            <label className='xi_label'>X Initial : </label>
            <input className='xi_box' id='xi' type='number' defaultValue='2' step='1'></input>

            <label className='error_label'> Error : </label>
            <input className='error_box' id='err' type='number' defaultValue='0.000001' step='0.000001'></input>
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
            
            <div className='result_graph'>
                <Plot
                    data = {[{
                        x : result.map(r => r.x),
                        y : result.map(r => r.x),
                        type : 'scatter',
                        mode : 'lines',
                        line : { color : 'blue' },
                        name : 'x = x'
                    }]}
                />
            </div>

        </div>
        
    )
}

export default NewtonRaphson;