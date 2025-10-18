import '../../../styles/root/One.css'

import Plot from 'react-plotly.js'
import { useEffect, useState } from 'react'
import OneUtils from '../../../utils/root/One'
import axios from 'axios'

function One () {

    const [ result, setResult ] = useState([])
    const [ history, setHistory] = useState([])

    useEffect( () => {
        const firstLoad = async () => {

            try {
                const res = await axios.get('http://localhost:3001/api/one-point/history')
                setHistory(res.data)
                console.log("First load done")
            }

            catch (err) {
                console.log("Error first load", err)
            }

        }

        firstLoad()

    }, [])

    const cal = async () => {

        const fx = document.getElementById('fx').value
        const Xstart = parseFloat(document.getElementById('Xstart').value)
        const Error = parseFloat(document.getElementById('Error').value)

        const result = OneUtils(fx, Xstart, Error)

        if (Array.isArray(result)) {
            setResult(result)

            try {
                await axios.post('http://localhost:3001/api/one-point/save', {
                    fx : fx,
                    xi : Xstart,
                    error : Error
                })

                const res = await axios.get('http://localhost:3001/api/one-point/history')
                setHistory(res.data)
                console.log('Save done')

            }
            catch (err) {
                console.log("Error save data", err)
            }

        }
        else{
            alert("Cann't Solve please change.")
        }

    }

    return (
        <div className="one_body">

            <h1 className='one_h1'>One-position methods</h1>

            {Array.isArray(history) && history.length > 0 && (
                <div className='load_table'>
                    <label className='history_label'>History</label>
                    <table>
                        <thead>
                            <tr>
                                <th>X(i+1)</th>
                                <th>X Initial</th>
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
            
            <br/>

            <label className='label_fx'> X(i+1) = </label>
            <input className='fx_box' id='fx' type='text' defaultValue='( 7+x ) / ( 1+x )'></input>
            <br/><br/><br/>

            <label className='label_x'>X Initial : </label>
            <input className='x_box' id='Xstart' type='number' defaultValue='0'></input>

            <label className='label_x'> Error : </label>
            <input className='err_box' id='Error' type='number' defaultValue='0.000001'></input>
            <br/><br/><br/>

            <button className='button_cal' onClick={cal}>Calculate</button>
            <br/><br/><br/>

            <div className='one_table'>
                <table className='in_one_table'>

                    <thead>
                        <tr>
                            <th>iter</th>
                            <th>x</th>
                            <th>Error</th>
                        </tr>
                    </thead>

                    <tbody>
                        {result.map( (row, index) => 
                            <tr key={index}>
                                <td>{row.iter}</td>
                                <td>{row.x}</td>
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
                        y : result.map(r => r.x),
                        type : 'scatter',
                        mode : 'lines',
                        line : { color : 'blue' },
                        name : 'x = x'
                    }
                ]}
            />

        </div>
    )
}

export default One;