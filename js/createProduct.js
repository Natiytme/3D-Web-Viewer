function createProduct(scene) {
  // Group to hold all car parts
  const car = new THREE.Group();

  // Materials
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000, // Red car body
    metalness: 0.8, // Shiny, metallic look
    roughness: 0.2, // Smooth surface
    clearcoat: 0.5, // Glossy coating
    clearcoatRoughness: 0.1,
  });
  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x333333, // Dark gray for wheels and accents
    metalness: 0.9,
    roughness: 0.1,
  });
  const windowMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x111111, // Dark tinted windows
    metalness: 0.5,
    roughness: 0.3,
    transparent: true,
    opacity: 0.7,
  });
  const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White, unaffected by lighting for glow

  // Body (stretched box)
  const bodyGeometry = new THREE.BoxGeometry(2, 0.6, 1);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, 0.6, 0);
  body.name = "Body";
  car.add(body);

  // Cabin (smaller box on top)
  const cabinGeometry = new THREE.BoxGeometry(1, 0.4, 0.8);
  const cabin = new THREE.Mesh(cabinGeometry, windowMaterial);
  cabin.position.set(0, 1, 0);
  cabin.name = "Cabin";
  car.add(cabin);

  // Wheels (cylinders)
  const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32);
  const wheel1 = new THREE.Mesh(wheelGeometry, accentMaterial);
  wheel1.position.set(0.8, 0.3, 0.5);
  wheel1.rotation.z = Math.PI / 2;
  wheel1.name = "Front Left Wheel";
  car.add(wheel1);

  const wheel2 = new THREE.Mesh(wheelGeometry, accentMaterial);
  wheel2.position.set(0.8, 0.3, -0.5);
  wheel2.rotation.z = Math.PI / 2;
  wheel2.name = "Front Right Wheel";
  car.add(wheel2);

  const wheel3 = new THREE.Mesh(wheelGeometry, accentMaterial);
  wheel3.position.set(-0.8, 0.3, 0.5);
  wheel3.rotation.z = Math.PI / 2;
  wheel3.name = "Rear Left Wheel";
  car.add(wheel3);

  const wheel4 = new THREE.Mesh(wheelGeometry, accentMaterial);
  wheel4.position.set(-0.8, 0.3, -0.5);
  wheel4.rotation.z = Math.PI / 2;
  wheel4.name = "Rear Right Wheel";
  car.add(wheel4);

  // Headlights (small spheres)
  const headlightGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const headlight1 = new THREE.Mesh(headlightGeometry, headlightMaterial);
  headlight1.position.set(1, 0.6, 0.4);
  headlight1.name = "Left Headlight";
  car.add(headlight1);

  const headlight2 = new THREE.Mesh(headlightGeometry, headlightMaterial);
  headlight2.position.set(1, 0.6, -0.4);
  headlight2.name = "Right Headlight";
  car.add(headlight2);

  // Add point lights for headlight glow
  const headlightLight1 = new THREE.PointLight(0xffffff, 1, 2, 2);
  headlightLight1.position.set(1, 0.6, 0.4);
  car.add(headlightLight1);

  const headlightLight2 = new THREE.PointLight(0xffffff, 1, 2, 2);
  headlightLight2.position.set(1, 0.6, -0.4);
  car.add(headlightLight2);

  // Center the car
  car.position.set(0, 0, 0); // Ground level
  scene.add(car);

  return car;
}
