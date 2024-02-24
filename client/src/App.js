import React, { useEffect, useState } from 'react'
import ThreeGlobe from 'three-globe'
import GlobeVisualization from './GlobeVisualization'
import SearchBar from './SearchBar'

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
    <>
      <GlobeVisualization className="absolute" />
      <div className="absolute h-screen w-screen">
        <div className="flex justify-center items-center h-screen w-2/4">
          <SearchBar className="" />
        </div>
      </div>
    </>
  )
}

export default App
