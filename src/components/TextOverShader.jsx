import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./TextOverShader.module.css"; // ✅ Scoped styling

const TextHoverShader = ({
  text = "Example Text",
  font = "Blanquotey",
  color = "#ffffff",
  fontWeight = "100",
  background = "#ffffff",
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const planeRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const easeFactorRef = useRef(0.02);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const prev = useRef({ x: 0.5, y: 0.5 });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;

    void main() {
      vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
      vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);

      vec2 mouseDirection = u_mouse - u_prevMouse;
      vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
      float pixelDistanceToMouse = length(pixelToMouseDirection);
      float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

      vec2 uvOffset = strength * -mouseDirection * 0.4;
      vec2 uv = vUv - uvOffset;

      vec4 color = texture2D(u_texture, uv);
      gl_FragColor = color;
    }
  `;

  const createTextTexture = (text, font, color, fontWeight) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = window.innerWidth * 2;
    const height = window.innerHeight * 2;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
    const fontSize = Math.floor(width * 0.3);

    ctx.fillStyle = "#1a1a1a";
    ctx.font = `${fontWeight} ${fontSize}px "${font}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.imageSmoothingEnabled = true;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const scaleFactor = Math.min(1, (width * 0.8) / textWidth);
    const aspect = width / height;

    ctx.setTransform(scaleFactor, 0, 0, scaleFactor / aspect, width / 2, height / 2);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = fontSize * 0.005;
    for (let i = 0; i < 3; i++) ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);

    return new THREE.CanvasTexture(canvas);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-1, 1, 1 / aspect, -1 / aspect, 0.1, 1000);
    camera.position.z = 1;

    const texture = createTextTexture(text, font, color, fontWeight);
    const uniforms = {
      u_mouse: { value: new THREE.Vector2() },
      u_prevMouse: { value: new THREE.Vector2() },
      u_texture: { value: texture },
    };

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    );

    scene.add(plane);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(background, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    planeRef.current = plane;
    rendererRef.current = renderer;

    const animate = () => {
      requestAnimationFrame(animate);
      const ef = easeFactorRef.current;
      const m = mouse.current;
      const t = target.current;

      m.x += (t.x - m.x) * ef;
      m.y += (t.y - m.y) * ef;

      plane.material.uniforms.u_mouse.value.set(m.x, 1 - m.y);
      plane.material.uniforms.u_prevMouse.value.set(prev.current.x, 1 - prev.current.y);

      renderer.render(scene, camera);
    };

    animate();

    const handleMove = (e) => {
      easeFactorRef.current = 0.035;
      const rect = container.getBoundingClientRect();
      prev.current = { ...target.current };
      target.current.x = (e.clientX - rect.left) / rect.width;
      target.current.y = (e.clientY - rect.top) / rect.height;
    };

    const handleEnter = (e) => {
      easeFactorRef.current = 0.01;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.current = target.current = { x, y };
    };

    const handleLeave = () => {
      easeFactorRef.current = 0.01;
      target.current = { ...prev.current };
    };

    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -1;
      camera.right = 1;
      camera.top = 1 / aspect;
      camera.bottom = -1 / aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      const newTexture = createTextTexture(text, font, color, fontWeight);
      plane.material.uniforms.u_texture.value = newTexture;
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      texture.dispose();
    };
  }, [text, font, color, fontWeight, background]);

  return <div ref={containerRef} className={styles.textContainer}></div>;
};

export default TextHoverShader;
