import React, { useEffect, useState } from 'react'
import ThreeGlobe from 'three-globe'
import GlobeVisualization from './GlobeVisualization'
import SearchBar from './SearchBar'

function App() {
  const [cityName, setCityName] = useState('')

  const handleCitySubmit = (city) => {
    setCityName(city)
  }


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
    // // </div>
    // <div className="flex">
    //   <GlobeVisualization />
    //   <div className="">
    //     <SearchBar />
    //   </div>
    <>
      {/* <BackgroundVisualization /> */}
      {/* <div
        className=" absolute w-screen h-screen"
        style={{ backgroundColor: '#040d21' }}
      ></div> */}
      <GlobeVisualization cityName={cityName}/>
      <div className="absolute h-screen w-1/2 end-0">
        <div className="flex items-center h-screen w-full">
          <SearchBar onCitySubmit={handleCitySubmit} />
        </div>
      </div>
    </>
  )
}

export default App
