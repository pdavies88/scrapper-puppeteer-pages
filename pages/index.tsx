import { Key, useEffect, useState } from 'react';

export default function Home() {
  const [fetchData, setFetchData] = useState([]);
  const getData = async () => {
    const res = await fetch('/api/getData');
    const data = await res.json();
    setFetchData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <h1>Next Pages Router</h1>
      <div>INFO HERE</div>
      {/* <button
        type='button'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        onClick={getData}>
        Fetch Data
      </button> */}
      {fetchData &&
        fetchData.map((item: { title: string; votes: string }, i: Key) => (
          <div key={i}>
            <h2>{item.title}</h2>
            <p>{item.votes}</p>
          </div>
        ))}
    </main>
  );
}
