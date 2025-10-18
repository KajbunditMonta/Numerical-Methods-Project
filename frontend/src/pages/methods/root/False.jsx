import '../../../styles/root/False.css'

import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import FalseUtils from '../../../utils/root/False.js';
import axios from 'axios';

function False () {

    const [ result, setResult ] = useState([])
    const [ history, setHistory] = useState([])

    useEffect( () => {
        const f_his = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/false/history')
                setHistory(res.data)
            }
            catch (err) {
                console.log("Error get history : ",err)
            }
        }

        f_his()
    }, [])

    const cal = async () => {
        
        const fx = document.getElementById('fx').value
        const Xstart = parseFloat(document.getElementById('xstart').value)
        const Xend = parseFloat(document.getElementById('xend').value)
        const Error = parseFloat(document.getElementById('err').value)

        const result = FalseUtils(Xstart, Xend, Error, fx)

        if (Array.isArray(result)) {
            setResult(result)

            try {
                await axios.post('http://localhost:3001/api/false/save', {
                    fx : fx,
                    xstart : Xstart,
                    xend : Xend,
                    error : Error
                })

                const res = await axios.get('http://localhost:3001/api/false/history')
                setHistory(res.data)
                console.log("Save done")

            }
            catch (err) {
                console.log("Save error! : ", err)
            }

        }
        else {
            alert("Cann't Solve please change.")
        }
    }

    return (
        <div className='F_body'>

            <h1 className='Fh1'>False-position methods</h1>

            {Array.isArray(history) && history.length > 0 && (
                <div className='t_his'>
                    <label className='history_label'>History</label>
                    <table>
                        <thead>
                            <tr>
                                <th>f(x)</th>
                                <th>X start</th>
                                <th>X end</th>
                                <th>Error</th>
                            </tr>
                        </thead>

                        <tbody>
                            {history.map( (row, index) => 
                                <tr key={index}>
                                    <td>{row.fx}</td>
                                    <td>{row.xstart}</td>
                                    <td>{row.xend}</td>
                                    <td>{row.error}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <br/>

            <label className='label_f'>f(x) : </label>
            <input className='box_f' type='text' id='fx' defaultValue='x^4-13'></input>
            <br/><br/><br/>

            <label className='label_x'>X Start : </label>
            <input className='box_x' type='number' id='xstart' defaultValue='1.5' step='1'></input>

            <label className='label_x'> X End : </label>
            <input className='box_x' type='number' id='xend' defaultValue='2' step='1'></input>

            <label className='label_x'> Error : </label>
            <input className='box_e' type='number' id='err' defaultValue='0.000001' step='0.000001'></input>
            <br/><br/><br/>

            <button className='button_cal' onClick={cal}>Calculate</button>
            <br/><br/><br/>
            
            <div className='false_table'>
                <table className='in_false_table'>

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
                    x : result.map( r => r.x),
                    y : result.map( r => r.y),
                    type : 'scatter',
                    mode : 'lines+markers',
                    line : { color : 'red' },
                    marker : { color : 'green' }
                }
            ]}
        />              
        
        </div>
    )
}

export default False;