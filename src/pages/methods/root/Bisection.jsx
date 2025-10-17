import '../../../styles/root/Bisection.css'
import BisectionUtils from '../../../utils/root/Bisection'

import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'

function Bisection() {

  const [result, setResult] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/bisection/history');
        console.log("Auto-loaded history:", res.data);
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history on load:", err);
      }
    };

    fetchHistory();
  }, []);

  const cal = async () => {
    const fx = document.getElementById('fx').value
    const xstart = parseFloat(document.getElementById('xstart').value)
    const xend = parseFloat(document.getElementById('xend').value)
    const Error = parseFloat(document.getElementById('error').value)

    const resultData = BisectionUtils(xstart, xend, Error, fx)

    if (Array.isArray(resultData)) {
      setResult(resultData)

      try {
        await axios.post('http://localhost:3001/api/bisection/save', {
          fx,
          xStart: xstart,
          xEnd: xend,
          error: Error
        })
        console.log("Saved to database")

        const res = await axios.get('http://localhost:3001/api/bisection/history');
        setHistory(res.data);

      } catch (err) {
        console.error("Error saving or reloading:", err);
      }

    } else {
      alert("Cann't Solve please change.")
    }
  }

  return (
    <div className='Bbody'>
      <h1 className='Bh1'>Bisection search</h1>

      {Array.isArray(history) && history.length > 0 && (
        <div className='history_table'>
          <label className='label_history'>History</label>
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
              {history.map((row, index) => (
                <tr key={index}>
                  <td>{row.fx}</td>
                  <td>{row.xStart}</td>
                  <td>{row.xEnd}</td>
                  <td>{row.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <br />
      <label className='labelf'>f(x) : </label>
      <input className='fbox' id='fx' type='text' defaultValue="x^4-13" />
      <br /><br /><br />

      <label className='label'>X Start : </label>
      <input className='xbox' id='xstart' type='number' defaultValue='1.5' />
      <label className='label'> X End : </label>
      <input className='xbox' id='xend' type='number' defaultValue='2' />
      <label className='label'> Error : </label>
      <input className='pbox' id='error' type='number' defaultValue='0.000001' />
      <br /><br /><br />

      <button className='calBotton' onClick={cal}>Calculate</button>
      <br /><br /><br />

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
            {result.map((row, index) => (
              <tr key={index}>
                <td>{row.iter}</td>
                <td>{row.x}</td>
                <td>{row.y}</td>
                <td>{row.err}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Plot
        data={[{
          x: result.map(r => r.x),
          y: result.map(r => r.y),
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'red' },
          marker: { color: 'green' }
        }]}
      />
    </div>
  )
}

export default Bisection
