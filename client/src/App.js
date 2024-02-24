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
    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
      <img
        class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        src="/sarah-dayan.jpg"
        alt=""
        width="384"
        height="512"
      />
      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p class="text-lg font-medium">
            “Tailwind CSS is the only framework that I've seen scale on large
            teams. It’s easy to customize, adapts to any design, and the build
            size is tiny.”
          </p>
        </blockquote>
        <figcaption class="font-medium">
          <div class="text-sky-500 dark:text-sky-400">Sarah Dayan</div>
          <div class="text-slate-700 dark:text-slate-500">
            Staff Engineer, Algolia
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

export default App
