import JsonQuery from 'json-query';
import { useEffect, useState } from 'react';
// import ranking from './ranking.json';

function App() {
  const [students, setStudents] = useState([]);
  const [storage, setStorage] = useState([]);
  const [campus, setCampus] = useState('all');

  useEffect(() => {
    fetch('ranking.json')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data)
        setStorage(data)
      });
  }, []);

  const handleCampus = (campus) => {
    const campusData = JsonQuery(`[*campusName=${campus}]`, { data: storage }).value;
    console.log(campusData.length)
    console.log(campus)

    if (campus === 'all') {
      setStudents(storage);
    } else {
      setStudents(campusData);
    }
  }

  const handleSearch = (searchValue) => {
    setCampus('all');
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
      <a href='https://forms.gle/NVh3M354BbbpAeGG6' className=' text-right hover:underline'>
        <h1>Report/Feedback</h1>
      </a>


      <table className='table-auto w-11/12 mx-auto'>
        <tbody>
          <tr>
            <td colSpan={5}>
              <select name="cars" id="cars" className='w-full p-3 text-center'
                onChange={(e) => { handleCampus(e.target.value); setCampus(e.target.value) }}
              >
                <option value="all">All</option>
                <option value="Ashulia">Ashulia</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Uttara">Uttara</option>
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={5}>
              <input onChange={(e) => handleSearch(e.target.value)} type="text" className='w-full p-3 text-center border rounded-lg' placeholder="191-15-2523 or Abdur Rahman" />

            </td>
          </tr>

          <tr className='font-bold text-xl '>
            <td className='py-1'>Rank</td>
            <td className='text-center'>Name</td>
            <td className='text-center'>Campus</td>
            <td className='text-center'>Student ID</td>
            <td className='text-center'>CGPA</td>
          </tr>


          {students?.length === 0 && <tr><td className=' font-xxl'>Loading...</td></tr>}

          {students?.map((item, serial) => {
            return (
              <tr className='border text-lg' key={item.studentId}>
                {/* <td className='text-center text-xs text-slate-500'>{serial + 1}</td> */}
                <td className='text-center'>{campus === 'all' ? item.rank : (serial + 1)}</td>
                <td className='p-3'>{item.studentName}</td>
                <td className='p-3'>{item.campusName}</td>
                <td>{item.studentId}</td>
                <td>{item?.cgpa}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

    </div >
  );
}

export default App;
