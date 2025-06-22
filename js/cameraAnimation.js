let isUserInteracting = false;

function initCameraAnimation(camera, controls) {
  // Detect user interaction to pause auto-rotation
  controls.addEventListener("start", () => {
    isUserInteracting = true;
  });
  controls.addEventListener("end", () => {
    isUserInteracting = false;
  });

  // Animation function
  function animateCamera(time) {
    if (!isUserInteracting) {
      // Orbit around Y-axis
      const radius = 5;
      const speed = 0.5; // Degrees per second
      const angle = ((time / 1000) * speed * Math.PI) / 180;
      camera.position.x = radius * Math.sin(angle);
      camera.position.z = radius * Math.cos(angle);
      camera.position.y = 2; // Keep height constant
      camera.lookAt(0, 0, 0); // Always look at origin
    }
  }

  return animateCamera;
}
