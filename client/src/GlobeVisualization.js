// import React, {
//   useEffect,
//   useRef,
//   onClick,
//   onWindowResize,
//   onMouseMove,
// } from 'react'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
// import * as THREE from 'three'
// import ThreeGlobe from 'three-globe'
// import countries from './custom.geo.json'

import React, { useEffect, useRef, useState } from 'react'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import * as THREE from 'three'
import ThreeGlobe from 'three-globe'
import countries from './custom.geo.json'

function GlobeVisualization() {
  // const globeContainerRef = useRef()
  let [mouseX, setMouseX] = useState(0)
  let [mouseY, setMouseY] = useState(0)
  let windowHalfX = window.innerWidth / 2
  let windowHalfY = window.innerHeight / 2
  let renderer, camera, scene, controls, tbControls, gData
  let Globe
  let counter = 0

  useEffect(() => {
    if (counter == 0) {
      counter += 1
      console.log(`window.innerWidth: ${window.innerWidth}`)
      console.log(`window.innerHeight: ${window.innerHeight}`)
      data()
      init()
      initGlobe()
      onWindowResize()
      animate()
    }
  }, [])

  function data() {
    const N = 1
    gData = [...Array(N).keys()].map(() => ({
      lat: 43.6532, //(Math.random() - 0.5) * 180,
      lng: -79.3832, //(Math.random() - 0.5) * 360,
      size: 1, //Math.random() / 3,
      color: 'white', //['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    }))
  }
  // function cleanUp() {

  //   Globe.dispose()
  //   renderer.dispose()
  //   controls.dispose()
  // }

  function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 1)
    scene.add(ambientLight)
    scene.background = new THREE.Color(0x040d21)

    camera = new THREE.PerspectiveCamera()
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    camera.position.z = 400 
    camera.position.x = 0
    camera.position.y = 0

    scene.add(camera)

    // camera controls
    tbControls = new TrackballControls(camera, renderer.domElement)
    tbControls.minDistance = 101
    tbControls.rotateSpeed = 5
    tbControls.zoomSpeed = 0.8

    scene.fog = new THREE.Fog(0x535ef3, 400, 2000)

    window.addEventListener('resize', onWindowResize, false)
    document.addEventListener('mousemove', onMouseMove)
    console.log(`INIT`)
  }

  function initGlobe() {
    Globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
    .translateX(-200) //ADDED
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      // .showAtmosphere(true)
      // .atmosphereColor('#3a228a')
      // .atmosphereAltitude(0.25)
      // .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      // .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color')
      .labelsData(gData)
      .labelText((d) => `TORONTO`) // (${Math.round(d.lat * 1e2) / 1e2}, ${Math.round(d.lng * 1e2) / 1e2})`)
      .labelSize('size')
      .labelDotRadius(d => d.size * 2)
      .labelColor('color')

    const globeMaterial = Globe.globeMaterial()
    globeMaterial.color = new THREE.Color(0x3a228a)
    globeMaterial.emissive = new THREE.Color(0x220038)
    globeMaterial.emissiveIntensity = 0.1
    globeMaterial.shininess = 0.7

    scene.add(Globe)
    console.log(`ADDED GLOBE`)
  }

  function onMouseMove(event) {
    // mouseX = event.clientX - windowHalfX
    // mouseY = event.clientY - windowHalfY
    console.log(`MOUSE`)
  }

  function onWindowResize() {
    // resize code here
    const aspectRatio = 3
    // const width = window.innerWidth / aspectRatio
    // const height = window.innerHeight
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    windowHalfX = window.innerWidth / 2 //1.5
    windowHalfX = window.innerHeight / 2 //1,5
    renderer.setSize(window.innerWidth, window.innerHeight)
    console.log(`resized window`)
  }

  function animate() {
    // tbControls.update()
    // camera.position.x =
    //   Math.abs(mouseX) <= windowHalfX / 2
    //     ? (mouseX / 2 - camera.position.x) * 0.005
    //     : 0
    // camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005
    // camera.lookAt(scene.position)
    Globe.rotation.y += 0.002
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
}

export default GlobeVisualization

// import React, {
//   useEffect,
//   useRef,
//   onClick,
//   onWindowResize,
//   onMouseMove,
// } from 'react'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
// import * as THREE from 'three'
// import ThreeGlobe from 'three-globe'
// import countries from './custom.geo.json'

// import React, { useEffect, useRef, useState } from 'react'
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
// import * as THREE from 'three'
// import ThreeGlobe from 'three-globe'
// import countries from './custom.geo.json'

// const GlobeVisualization = () => {
//   // const globeContainerRef = useRef()

//   // var renderer, camera, controls

//   // let mouseX = 0
//   // let mouseY = 0
//   let windowHalfX = window.innerWidth / 2
//   let windowHalfY = window.innerHeight / 2
//   // var Globe

//   // useEffect(() => {
//     // Gen random data
//     // const N = 1
//     // const gData = [...Array(N).keys()].map(() => ({
//     //   lat: 43.6532, //(Math.random() - 0.5) * 180,
//     //   lng: -79.3832, //(Math.random() - 0.5) * 360,
//     //   size: 1, //Math.random() / 3,
//     //   color: 'white', //['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
//     // }))

//     const Globe = new ThreeGlobe({
//       waitForGlobeReady: true,
//       animateIn: true,
//     })
//       .hexPolygonsData(countries.features)
//       .hexPolygonResolution(3)
//       .hexPolygonMargin(0.7)
//       .showAtmosphere(true)
//       .atmosphereColor('#3a228a')
//       .atmosphereAltitude(0.25)

//       // .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
//       // .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
//       // .pointsData(gData)
//       // .pointAltitude('size')
//       // .pointColor('color')
//       // .labelsData(gData)
//       // .labelText((d) => `TORONTO`) // (${Math.round(d.lat * 1e2) / 1e2}, ${Math.round(d.lng * 1e2) / 1e2})`)
//       // .labelSize('size')
//       // // .labelDotRadius(d => d.size / 5)
//       // .labelColor('color')

//     // Setup renderer
//     const renderer = new THREE.WebGLRenderer({antialias:true})
//     renderer.setPixelRatio(window.devicePixelRatio)
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     // globeContainerRef.current.appendChild(renderer.domElement)
//     // document.getElementById('globe').appendChild(renderer.domElement) // ADDED
//     document.body.appendChild(renderer.domElement) //ADDED

//     // Setup scene
//     const scene = new THREE.Scene()

//     scene.add(new THREE.AmbientLight(0xbbbbbb, 1)) //0.3))
//     // scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI))

//     // Setup camera
//     const camera = new THREE.PerspectiveCamera()
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     camera.position.z = 400
//     camera.position.x = 0
//     camera.position.y = 0
//     scene.add(camera)

//     // Add camera controls
//     const tbControls = new TrackballControls(camera, renderer.domElement)
//     tbControls.minDistance = 101
//     tbControls.rotateSpeed = 5
//     tbControls.zoomSpeed = 0.8

//     // setTimeout(() => {
//     //   gData.forEach((d) => (d.size = 1 / 4)) //Math.random()));
//     //   Globe.pointsData(gData)
//     // }, 4000)

//     const globeMaterial = Globe.globeMaterial()
//     globeMaterial.color = new THREE.Color(0x3a228a)
//     scene.add(Globe)

//     // Kick-off renderer
//     const animate = () => {
//       // Frame cycle
//       tbControls.update()
//       renderer.render(scene, camera)
//       requestAnimationFrame(animate)
//     }

//     animate()

//     // renderer.domElement.addEventListener('click', onClick)

//     // Clean up
//     return () => {
//       // renderer.domElement.removeEventListener('click', onClick);
//       renderer.dispose()
//       tbControls.dispose()
//     }
//   // }, [])

//   const onClick = (event) => {
//     console.log(`HI THERE`)
//   }

//   // return (
//   //   <div>
//   //     {/* <p> boo</p> */}
//   //     <div ref={globeContainerRef} onClick={onClick} />
//   //     {/* <p> i done</p> */}
//   //   </div>
//   // )
// }

// export default GlobeVisualization

// var renderer, camera, scene, controls

// let mouseX = 0
// let mouseY = 0
// let windowHalfX = window.innerWidth / 2
// let windowHalfY = window.innerHeight / 2
// var Globe

// init()
// initGlobe()
// // onWindowResize()
// // animate()

// function init() {
//   renderer = new THREE.WebGL1Renderer({ antialias: true })
//   renderer.setPixelRatio(window.devicePixelRatio)
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   document.body.appendChild(renderer.domElement)

//   scene = new THREE.Scene()

//   var AmbientLight = new THREE.AmbientLight(0xbbbbbb, 1)
//   scene.add(AmbientLight)
//   scene.background = new THREE.Color(0x040d21)

//   camera = new THREE.PerspectiveCamera()
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()

//   var DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
//   // DirectionalLight.getWorldPosition

//   camera.position.z = 400
//   camera.position.x = 0
//   camera.position.y = 0

//   scene.add(camera)

//   scene.fog = new THREE.Fog(0x535ef3, 400, 2000)

//   // controls = new OrbitCon

//   window.addEventListener('resize', onWindowResize, false)
//   document.addEventListener('mousemove', onMouseMove)
// }

// function initGlobe() {
//   Globe = new ThreeGlobe({
//     waitForGlobeReady: true,
//     animateIn: true,
//   })
// }

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import ThreeGlobe from 'three-globe';

// const GlobeVisualization = () => {
//   const globeContainerRef = useRef();

//   useEffect(() => {
//     // Create a ThreeGlobe instance
//     const GlobeInstance = new ThreeGlobe()
//       .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
//       .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');

//     // Setup renderer
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     globeContainerRef.current.appendChild(renderer.domElement);

//     // Setup scene
//     const scene = new THREE.Scene();
//     scene.add(GlobeInstance);
//     scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));
//     scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

//     // Setup camera
//     const camera = new THREE.PerspectiveCamera();
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     camera.position.z = 400;
//     scene.add(camera);

//     // Add camera controls
//     const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
//     tbControls.minDistance = 101;
//     tbControls.rotateSpeed = 5;
//     tbControls.zoomSpeed = 0.8;

//     // Kick-off renderer
//     const animate = () => {
//       // Frame cycle
//       tbControls.update();
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };

//     animate();

//     // Clean up
//     return () => {
//       GlobeInstance.dispose();
//       renderer.dispose();
//       tbControls.dispose();
//     };
//   }, []);

//   return <div ref={globeContainerRef} style={{ margin: 0, position: 'fixed' }} />;
// };

// export default GlobeVisualization
