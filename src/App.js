import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('ranking.json',)
      .then(response => response.json())
      .then(data => setData(data))
  }, [])


  return (
    <div className="font-serif">
      <a href='https://forms.gle/NVh3M354BbbpAeGG6' className='p-3 m-3 text-right hover:underline'>
        <h1>Report/Feedback</h1>
      </a>

      <table className='table-auto w-11/12 mx-auto'>
        <tr className='font-bold text-xl '>
          <td className='p-3'>Rank</td>
          <td>Name</td>
          <td>Campus</td>
          <td>Student ID</td>
          <td>CGPA</td>
        </tr>
        {data?.length === 0 && <tr><td className='text-center font-xxl'>Loading...</td></tr>}
        {data?.map((item, rank) => {
          return (
            <tr className='border text-lg' key={item.studentId}>
              <td className='text-center'>{rank + 1}</td>
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
