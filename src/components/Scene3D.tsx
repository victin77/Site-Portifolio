import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle system for subtle depth
function Particles({ count = 60 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    
    return { positions };
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.008;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.004;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#555555"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Mouse parallax effect
function MouseParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.08,
        0.015
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -pointer.y * 0.05,
        0.015
      );
    }
  });

  return <group ref={group}>{children}</group>;
}

// Elegant geometric shapes instead of text
function AbstractShapes() {
  const torusRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.05;
      torusRef.current.rotation.y = t * 0.08;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x = -t * 0.03;
      boxRef.current.rotation.y = t * 0.06;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(t * 0.3) * 0.2;
    }
  });

  return (
    <>
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Main torus - center */}
        <mesh ref={torusRef} position={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.08, 16, 100]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.9}
            envMapIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.3}>
        {/* Secondary box - left */}
        <mesh ref={boxRef} position={[-2.5, 0.5, -1]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshPhysicalMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      <Float speed={0.5} rotationIntensity={0.08} floatIntensity={0.25}>
        {/* Small sphere - right */}
        <mesh ref={sphereRef} position={[2.8, -0.3, -0.5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial
            color="#151515"
            metalness={1}
            roughness={0.02}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      {/* Thin lines / wireframe accents */}
      <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.15}>
        <mesh position={[0, -1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.22, 64]} />
          <meshBasicMaterial color="#333333" transparent opacity={0.4} />
        </mesh>
      </Float>
    </>
  );
}

// Scene component
function Scene() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.08} />
      
      {/* Key light - main white light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        color="#ffffff"
      />
      
      {/* Rim light - subtle edge highlight */}
      <directionalLight
        position={[-5, 2, -5]}
        intensity={0.25}
        color="#808080"
      />
      
      {/* Top fill light */}
      <pointLight
        position={[0, 10, 0]}
        intensity={0.15}
        color="#ffffff"
      />
      
      <MouseParallax>
        <AbstractShapes />
        <Particles count={50} />
      </MouseParallax>
      
      <Environment preset="night" />
    </>
  );
}

// Loading state
function Loader() {
  return null;
}

// CSS Fallback - elegant animated gradient
function CSSFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Animated gradient circles */}
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-10 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}

export default function Scene3D() {
  // Check for WebGL support
  const hasWebGL = useMemo(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }, []);

  if (!hasWebGL) {
    return <CSSFallback />;
  }

  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
