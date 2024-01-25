// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react'

function App() {

  // state variable to contain backend data
  const [backendData, setBackendData] = useState([{}])

  // fetch backend api
  useEffect(() => {
    fetch("/api").then(
      res => res.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []) // [] runs useEffect block on first render of component

  return (
    <div>
      {(typeof backendData.mockData == 'undefined') ? (
        <p>Loading...</p>
      ) :
      backendData.mockData.map((data, i) => (
        <p key={i}>{data}</p>
      ))}
    </div>
  )
}

export default App