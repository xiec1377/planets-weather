import React, { useEffect, useState } from 'react'
import ThreeGlobe from 'three-globe'
import GlobeVisualization from './GlobeVisualization'

function App() {
  // state variable to contain backend data
  // const [backendData, setBackendData] = useState([{}])

  // fetch backend api
  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBackendData(data)
  //     })
  // }, []) // [] runs useEffect block on first render of component

  return (
    // <div>
    //   {(typeof backendData.mockData == 'undefined') ? (
    //     <p>Loading...</p>
    //   ) :
    //   backendData.mockData.map((data, i) => (
    //     <p key={i}>{data}</p>
    //   ))}
    // </div>
    <div>
      {/* <p> hello</p> */}
      <GlobeVisualization />
      {/* <p> hello</p> */}
    </div>
  )
}

export default App
