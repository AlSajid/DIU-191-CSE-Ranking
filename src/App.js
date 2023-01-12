import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/serial')
      .then(response => response.json())
      .then(data => setData(data))
  }, [])


  return (
    <div className="font-serif">
      <table className='table-auto w-11/12 mx-auto'>
        <tr className='font-bold text-xl '>
          <td className='p-3'>Rank</td>
          <td>Name</td>
          <td>Campus</td>
          <td>Student ID</td>
          <td>CGPA</td>
        </tr>
        {data.map((item, rank) => {
          return (
            <tr className='border text-lg'>
              <td className='text-center'>{rank+1}</td>
              <td className='p-3'>{item.studentName}</td>
              <td className='p-3'>{item.campusName}</td>
              <td>{item.studentId}</td>
              <td>{item?.cgpa?.toFixed(2)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
