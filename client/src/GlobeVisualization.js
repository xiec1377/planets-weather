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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import ThreeGlobe from 'three-globe'
import countries from './custom.geo.json'

function GlobeVisualization({cityName, lat, long}) {
  // const globeContainerRef = useRef()
  let [mouseX, setMouseX] = useState(0)
  let [mouseY, setMouseY] = useState(0)
  let windowHalfX = 2* (window.innerWidth / 3) / 2
  let windowHalfY = window.innerHeight / 2
  let renderer, camera, scene, controls, tbControls, gData
  let Globe
  let counter = 0

  console.log(`CITY NAME: ${cityName}`)
  console.log(`LATITUDE: ${lat}`)
  console.log(`LONGITUDE: ${long}`)

  useEffect(() => {
    if (counter == 0) {
      counter += 1
      console.log(`2* (window.innerWidth / 3): ${2* (window.innerWidth / 3)}`)
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
    renderer.setSize(2* (window.innerWidth / 3), window.innerHeight)
    // renderer.setClearColor(0x000000, 0) // ADDED
    document.body.appendChild(renderer.domElement)

    scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0xbbbbbb, 1)
    scene.add(ambientLight)
    scene.background = new THREE.Color(0x040d21)
    // scene.positionX = 200

    camera = new THREE.PerspectiveCamera()
    camera.aspect = 2* (window.innerWidth / 3) / window.innerHeight
    camera.updateProjectionMatrix()

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    camera.position.z = 400
    camera.position.x = 0
    camera.position.y = 0

    scene.add(camera)

    // camera controls
    // tbControls = new TrackballControls(camera, renderer.domElement)
    // tbControls.minDistance = 101
    // tbControls.rotateSpeed = 5
    // tbControls.zoomSpeed = 0.8

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dynamicDampingFactor = 0.01
    controls.enablePan = false
    controls.minDistance = 200
    controls.maxDistance = 400
    controls.rotateSpeed = 0.8
    controls.zoomSpeed = 0.8
    controls.autoRotate = false
    controls.minPolarAngle = Math.PI / 3.5
    controls.maxPolarAngle = Math.PI - Math.PI / 3
    // controls.position0 = 200

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
      // .translateX(2* (window.innerWidth / 3) / 8) //ADDED
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
      .labelDotRadius((d) => d.size * 2)
      .labelColor('color')

    // Globe.translateOnAxis(new THREE.Vector3(1, 0, 0), 200)

    const globeMaterial = Globe.globeMaterial()
    globeMaterial.color = new THREE.Color(0x3a228a)
    globeMaterial.emissive = new THREE.Color(0x220038)
    globeMaterial.emissiveIntensity = 0.1
    globeMaterial.shininess = 0.7

    scene.add(Globe)
    console.log(`ADDED GLOBE`)
  }

  function onMouseMove(event) {
    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
    console.log(`MOUSE`)
  }

  function onWindowResize() {
    // resize code here
    const aspectRatio = 3
    const width = 2* (window.innerWidth / 3) / aspectRatio
    const height = window.innerHeight
    camera.aspect = 2* (window.innerWidth / 3) / window.innerHeight
    camera.updateProjectionMatrix()
    windowHalfX = 2* (window.innerWidth / 3) / 2 //1.5
    windowHalfX = window.innerHeight / 2 //1,5
    renderer.setSize(2* (window.innerWidth / 3), window.innerHeight)
    console.log(`resized window`)
  }

  function animate() {
    // tbControls.update()
    controls.update()
    // camera.position.x =
    //   Math.abs(mouseX) <= windowHalfX / 2
    //     ? (mouseX / 2 - camera.position.x) * 0.005
    //     : 0
    // camera.position.y = (-mouseY / 2 - camera.position.y) * 0.005
    camera.lookAt(scene.position) //Globe position
    Globe.rotation.y += 0.002
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
}

export default GlobeVisualization
