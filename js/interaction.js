let raycaster, mouse;
let originalMaterials = new Map();
let originalScales = new Map();

function initInteraction(scene, camera) {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Click handler
  document.addEventListener("click", onClick);

  function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      // Store original material and scale
      if (!originalMaterials.has(object)) {
        originalMaterials.set(object, object.material.clone());
        originalScales.set(object, object.scale.clone());
      }
      // Highlight effect (glow and scale)
      object.material.emissive = new THREE.Color(0x00ffcc); // Cyan glow
      object.material.emissiveIntensity = 0.5;
      object.scale.set(
        originalScales.get(object).x * 1.2,
        originalScales.get(object).y * 1.2,
        originalScales.get(object).z * 1.2
      );
      // Show part name
      const infoPanel = document.getElementById("info-panel");
      infoPanel.textContent = `Part: ${object.name}`;
      infoPanel.style.display = "block";
      // Revert after 1 second
      setTimeout(() => {
        object.material.emissive =
          originalMaterials.get(object).emissive || new THREE.Color(0x000000);
        object.material.emissiveIntensity =
          originalMaterials.get(object).emissiveIntensity || 0;
        object.scale.copy(originalScales.get(object));
        infoPanel.style.display = "none";
      }, 1000);
    }
  }

  // Hover effect
  document.addEventListener("mousemove", onMouseMove);

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    // Reset all objects
    scene.traverse((object) => {
      if (object.isMesh && originalMaterials.has(object)) {
        object.material.emissive =
          originalMaterials.get(object).emissive || new THREE.Color(0x000000);
        object.material.emissiveIntensity =
          originalMaterials.get(object).emissiveIntensity || 0;
        object.scale.copy(
          originalScales.get(object) || new THREE.Vector3(1, 1, 1)
        );
      }
    });
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (!originalMaterials.has(object)) {
        originalMaterials.set(object, object.material.clone());
        originalScales.set(object, object.scale.clone());
      }
      object.material.emissive = new THREE.Color(0xffff00); // Yellow glow on hover
      object.material.emissiveIntensity = 0.3;
      object.scale.set(
        originalScales.get(object).x * 1.1,
        originalScales.get(object).y * 1.1,
        originalScales.get(object).z * 1.1
      );
    }
  }
}
