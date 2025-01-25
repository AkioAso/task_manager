'use client'
import React, { useEffect } from "react";
import * as THREE from 'three'

const Space: React.FC = () => {
  let canvas: HTMLElement
  useEffect(() => {
    if (canvas) return
    // canvasを取得
    canvas = document.getElementById('canvas')!

    // シーン
    const scene = new THREE.Scene()

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    )

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)


    // 地球の作成。
    const earthPosition = {
      x: -3,
      y: 0,
      z: -4
    }
    const earthGeometry = new THREE.SphereGeometry(1, 36, 36);
    const txLoader  = new THREE.TextureLoader();
    const earthMap = txLoader.load('/materials/stars/earthmap1k.jpg');
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: earthMap,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.x = earthPosition.x
    earth.position.z = earthPosition.z
    scene.add(earth);

    // 月の作成。
    const moonGeometry = new THREE.SphereGeometry(0.25, 36, 36);
    const moonMap = txLoader.load('/materials/stars/moonmap1k.jpg');
    const moonMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: moonMap,
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.z = -4
    scene.add(moon);


    // ライト  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  
    scene.add(ambientLight);  

    const pointLight = new THREE.PointLight(0xffffff, 1);  
    pointLight.position.set(1, 2, 3);  
    scene.add(pointLight);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 1000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);


    // アニメーション
    const clock = new THREE.Clock()
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      earth.rotation.y = elapsedTime / 4;
      moon.rotation.y = elapsedTime / 16;
      moon.position.x =  earthPosition.x +  Math.cos(elapsedTime) * 2;
      moon.position.z =  earthPosition.z + Math.sin(elapsedTime) * 2;
      particlesMesh.rotation.y += 0.002;

      window.requestAnimationFrame(tick);
      renderer.render(scene, camera);
    }
    tick()

    // ブラウザのリサイズ処理
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })
  }, [])
  return (
    <div>
      <canvas id="canvas" className="bg-black"></canvas>
    </div>
  )
};

export default Space;




