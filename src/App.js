import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ranking from './ranking.json';

function App() {
  const students = [];
  let rank = 1;

  for (let i = 0; i < ranking.length; i++) {
    if (i === 0) {
      students.push({ ...ranking[i], rank });

    } else {
      if (ranking[i].cgpa === ranking[i - 1].cgpa) {
        students.push({ ...ranking[i], rank });
      } else {
        rank = rank + 1;
        students.push({ ...ranking[i], rank });
      }
    }
  }



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

        {students?.length === 0 && <tr><td className='text-center font-xxl'>Loading...</td></tr>}
        {students?.map((item) => {
          return (
            <tr className='border text-lg' key={item.studentId}>
              <td className='text-center'>{item.rank}</td>
              <td className='p-3'>{item.studentName}</td>
              <td className='p-3'>{item.campusName}</td>
              <td>{item.studentId}</td>
              <td>{item?.cgpa}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
