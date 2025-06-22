let scene, camera, renderer, controls;

function initScene() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc); // Light gray background

  // Set up camera
  camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
  );
  camera.position.set(0, 2, 5); // Position camera to view car
  camera.lookAt(0, 0, 0); // Look at origin

  // Set up renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableRotate = true; // Allow rotation
  controls.enableZoom = true; // Allow zoom
  controls.enablePan = true; // Allow panning
  controls.autoRotate = false; // We'll handle auto-rotation separately

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
