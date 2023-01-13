import JsonQuery from 'json-query';
import { useEffect, useState } from 'react';
// import ranking from './ranking.json';

function App() {
  const [students, setStudents] = useState([]);
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    fetch('ranking.json')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
        setStorage(data)
      });
  }, []);



  const handleSearch = (searchValue) => {
    const id = JsonQuery(`[*][*studentId~/${searchValue}/i]`,
      { data: students, allowRegexp: true }).value;

    const name = JsonQuery(`[*][*studentName~/${searchValue}/i]`,
      { data: students, allowRegexp: true }).value;

    if (id.length > name.length) {
      setStudents(id);
    } else if (id.length < name.length) {
      setStudents(name);
    } else {
      setStudents(storage);
    }

    console.log(id.length, name.length)
  }


  return (
    <div className="font-serif">
      <a href='https://forms.gle/NVh3M354BbbpAeGG6' className='p-3 m-3 text-right hover:underline'>
        <h1>Report/Feedback</h1>
      </a>


      <table className='table-auto w-11/12 mx-auto'>
        <tbody>
          <tr>
            <td colSpan={6}>
              <input onChange={(e) => handleSearch(e.target.value)} type="text" className='w-full p-3 text-center border rounded-lg' placeholder="191-15-2523 or Abdur Rahman" />

            </td>
          </tr>

          <tr className='font-bold text-xl '>
            {/* <td className="w-1 text-xs">No</td> */}
            <td className='py-1'>Rank</td>
            <td>Name</td>
            <td>Campus</td>
            <td>Student ID</td>
            <td>CGPA</td>
          </tr>


          {students?.length === 0 && <tr><td className='text-center font-xxl'>Loading...</td></tr>}

          {students?.map((item, serial) => {
            return (
              <tr className='border text-lg' key={item.studentId}>
                {/* <td className='text-center text-xs text-slate-500'>{serial + 1}</td> */}
                <td className='text-center'>{item.rank}</td>
                <td className='p-3'>{item.studentName}</td>
                <td className='p-3'>{item.campusName}</td>
                <td>{item.studentId}</td>
                <td>{item?.cgpa}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div>
  );
}

export default App;
