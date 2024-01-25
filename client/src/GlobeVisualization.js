import React, { useEffect, useRef } from 'react'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import * as THREE from 'three'
import ThreeGlobe from 'three-globe'
import countries from './custom.geo.json'

const GlobeVisualization = () => {
  const globeContainerRef = useRef()

  useEffect(() => {
    // Gen random data
    // const N = 300
    // const gData = [...Array(N).keys()].map(() => ({
    //   lat: (Math.random() - 0.5) * 180,
    //   lng: (Math.random() - 0.5) * 360,
    //   size: Math.random() / 3,
    //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
    // }));

        
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    globeContainerRef.current.appendChild(renderer.domElement)


    // Setup scene
    const scene = new THREE.Scene()
    
    scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3))
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI))

    // Setup camera
    const camera = new THREE.PerspectiveCamera()
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    camera.position.z = 400
    // camera.add()
    scene.add(camera)

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement)
    tbControls.minDistance = 101
    tbControls.rotateSpeed = 5
    tbControls.zoomSpeed = 0.8


    const Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn:true,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)

    //   .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    //   .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    //   .pointsData(gData)
    //   .pointAltitude('size')
    //   .pointColor('color');

    // setTimeout(() => {
    //   gData.forEach((d) => (d.size = Math.random()));
    //   Globe.pointsData(gData);
    // }, 4000);

    const globeMaterial = Globe.globeMaterial()
    globeMaterial.color = new THREE.Color(0x3a228a)
    scene.add(Globe)

    // Kick-off renderer
    const animate = () => {
      // Frame cycle
      tbControls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
    //   Globe.dispose()
      renderer.dispose()
      tbControls.dispose()
    }
  }, [])

  return (
    <div>
      {/* <p> boo</p> */}
      <div ref={globeContainerRef}/>
      {/* <p> i done</p> */}
    </div>
  )
}

export default GlobeVisualization


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