function addLighting(scene) {
  // Ambient light for soft base illumination
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Dim gray light
  scene.add(ambientLight);

  // Directional light for highlights and shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
  directionalLight.position.set(3, 5, 3); // Angled for dramatic effect
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024; // Sharper shadows
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);

  // Additional point light for extra sci-fi glow
  const pointLight = new THREE.PointLight(0x00ffcc, 1, 5, 2);
  pointLight.position.set(-2, 2, 2); // Cyan light from the side
  scene.add(pointLight);

  // Enable shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadow edges

  scene.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
}
