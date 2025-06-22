let robot, animateCameraFunc; // Note: 'robot' is now 'car', but keeping variable name for compatibility

function init() {
  // Initialize scene
  initScene();

  // Create product
  robot = createProduct(scene); // This creates the car

  // Add lighting
  addLighting(scene);

  // Initialize interaction
  initInteraction(scene, camera);

  // Initialize camera animation
  animateCameraFunc = initCameraAnimation(camera, controls);

  // Start animation loop
  animate();
}

function animate(time) {
  requestAnimationFrame(animate);

  // Update camera animation
  animateCameraFunc(time);

  // Car animations
  const body = robot.getObjectByName("Body");
  const wheels = [
    robot.getObjectByName("Front Left Wheel"),
    robot.getObjectByName("Front Right Wheel"),
    robot.getObjectByName("Rear Left Wheel"),
    robot.getObjectByName("Rear Right Wheel"),
  ];
  if (body) {
    // Slight bobbing effect for body
    body.position.y = 0.6 + 0.05 * Math.sin(time * 0.001);
  }
  wheels.forEach((wheel) => {
    if (wheel) {
      // Rotate wheels for rolling effect
      wheel.rotation.x += 0.01;
    }
  });

  // Render scene
  renderer.render(scene, camera);
}

// Start the app
init();
