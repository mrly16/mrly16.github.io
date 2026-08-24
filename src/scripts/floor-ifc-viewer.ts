const initializeViewer = async (root: HTMLElement) => {
  if (root.dataset.initialized === "true") return;
  root.dataset.initialized = "true";

  const canvas = root.querySelector("canvas");
  const status = root.querySelector<HTMLElement>("[data-ifc-status]");
  const modelUrl = root.dataset.modelUrl;
  if (!(canvas instanceof HTMLCanvasElement) || !modelUrl) return;

  const [THREE, { OrbitControls }, { GLTFLoader }] = await Promise.all([
    import("three"),
    import("three/addons/controls/OrbitControls.js"),
    import("three/addons/loaders/GLTFLoader.js"),
  ]);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080909);

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.screenSpacePanning = true;
  controls.minZoom = 0.65;
  controls.maxZoom = 5;

  scene.add(new THREE.HemisphereLight(0xf7f4eb, 0x242927, 2.25));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
  keyLight.position.set(8, -10, 14);
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0x93adff, 0.7);
  fillLight.position.set(-10, 6, 8);
  scene.add(fillLight);

  let modelCenter = new THREE.Vector3();
  let modelSize = new THREE.Vector3(1, 1, 1);
  let modelRadius = 1;
  let currentView: "top" | "axon" = "axon";
  let orthoHeight = 10;

  const resize = () => {
    const width = Math.max(root.clientWidth, 1);
    const height = Math.max(root.clientHeight, 1);
    const renderedWidth = Math.max(root.getBoundingClientRect().width, 1);
    const layoutZoom = renderedWidth / width;
    const aspect = width / height;
    camera.left = (-orthoHeight * aspect) / 2;
    camera.right = (orthoHeight * aspect) / 2;
    camera.top = orthoHeight / 2;
    camera.bottom = -orthoHeight / 2;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * layoutZoom, 2));
    renderer.setSize(width, height, false);
  };

  const setView = (view: "top" | "axon") => {
    currentView = view;
    const aspect = Math.max(root.clientWidth / Math.max(root.clientHeight, 1), 0.1);

    if (view === "top") {
      camera.up.set(0, 1, 0);
      camera.position.set(modelCenter.x, modelCenter.y, modelCenter.z + modelRadius * 2.8);
      orthoHeight = Math.max(modelSize.y * 1.22, (modelSize.x * 1.22) / aspect);
    } else {
      camera.up.set(0, 0, 1);
      camera.position.set(
        modelCenter.x + modelRadius * 1.35,
        modelCenter.y - modelRadius * 1.35,
        modelCenter.z + modelRadius * 1.18,
      );
      orthoHeight = Math.max(modelSize.x, modelSize.y) * 1.18;
    }

    camera.zoom = 1;
    camera.near = 0.01;
    camera.far = modelRadius * 30;
    controls.target.copy(modelCenter);
    camera.lookAt(modelCenter);
    controls.update();
    resize();

    root.querySelectorAll<HTMLButtonElement>("[data-ifc-view]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.ifcView === view);
    });
  };

  root.querySelectorAll<HTMLButtonElement>("[data-ifc-view]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const requested = button.dataset.ifcView;
      setView(requested === "top" ? "top" : "axon");
    });
  });

  new GLTFLoader().load(
    modelUrl,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = Array.isArray(child.material)
            ? child.material.map((material) => material.clone())
            : child.material.clone();
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((material) => {
            material.side = THREE.DoubleSide;
            material.needsUpdate = true;
          });
        }
      });

      const bounds = new THREE.Box3().setFromObject(model);
      modelCenter = bounds.getCenter(new THREE.Vector3());
      modelSize = bounds.getSize(new THREE.Vector3());
      modelRadius = Math.max(modelSize.x, modelSize.y, modelSize.z, 1);
      setView("axon");
      root.classList.add("is-ready");
      if (status) status.textContent = "IFC / GLB";
    },
    undefined,
    () => {
      root.classList.add("has-error");
      if (status) status.textContent = "Model unavailable";
    },
  );

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  resize();

  const animate = () => {
    if (root.closest("[data-viewer-episode]")?.classList.contains("is-active")) {
      controls.update();
      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  };
  animate();

  root.addEventListener("dblclick", () => setView(currentView));
};

const setupIfcViewers = () => {
  document.querySelectorAll<HTMLElement>("[data-floor-ifc-viewer]").forEach((root) => {
    if (root.dataset.observed === "true") return;
    root.dataset.observed = "true";

    const episode = root.closest("[data-viewer-episode]");
    const initializeWhenActive = () => {
      if (!episode?.classList.contains("is-active")) return;
      initializeViewer(root).catch(() => {
        root.classList.add("has-error");
        const status = root.querySelector<HTMLElement>("[data-ifc-status]");
        if (status) status.textContent = "Viewer unavailable";
      });
    };

    initializeWhenActive();
    if (episode) {
      new MutationObserver(initializeWhenActive).observe(episode, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupIfcViewers, { once: true });
} else {
  setupIfcViewers();
}

document.addEventListener("astro:page-load", setupIfcViewers);
