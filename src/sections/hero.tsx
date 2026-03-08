import React, { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AbstractK: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    const elapsed = performance.now() / 1000;
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.15;
      meshRef.current.rotation.x = Math.sin(elapsed * 0.3) * 0.1;
      
      // Mouse parallax
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, (state.mouse.x * 1.5), 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, (state.mouse.y * 1.5), 0.05);
    }
    if (materialRef.current) {
      materialRef.current.time = elapsed;
    }
  });

  // Create a complex abstract geometry
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.5, 3), []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <MeshTransmissionMaterial 
          ref={materialRef}
          backside
          samples={16}
          resolution={1024}
          transmission={1}
          roughness={0.1}
          thickness={1.5}
          ior={1.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#E8D48B"
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh scale={0.8}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#C9A84C" wireframe />
      </mesh>
    </Float>
  );
};

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bg-dark" id="home">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 45 }} 
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#C9A84C" castShadow />
          <spotLight position={[-10, 10, -5]} intensity={1} color="#ffffff" />
          <Environment preset="city" />
          <AbstractK />
          <Sparkles count={400} scale={20} size={4} speed={0.2} opacity={0.4} color="#E8D48B" />
          <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={20} blur={2.5} far={5} color="#000000" />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-gold-secondary to-gold-primary mb-2 leading-none tracking-tighter drop-shadow-2xl">
            {t('name')}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-4"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-primary to-gold-secondary blur opacity-30 rounded-full" />
          <h2 className="relative text-xl md:text-3xl font-sans font-light text-white mb-8 tracking-[0.3em] uppercase px-10 py-3 border border-white/20 rounded-full bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(201,168,76,0.2)]">
            {t('title')}
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-text-secondary-dark max-w-3xl mx-auto mb-16 font-light leading-relaxed tracking-wide"
        >
          {t('tagline')}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16"
        >
          {[
            { value: "200+", label: "Projects" },
            { value: "40+", label: "Identities" },
            { value: "12", label: "Awards" },
            { value: "15+", label: "Years" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center px-8 py-6 glass-panel rounded-3xl border border-white/10 hover:bg-white/10 hover:border-gold-primary/50 transition-all duration-500 group cursor-default shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.2)] hover:-translate-y-2">
              <span className="text-4xl md:text-5xl font-display font-bold text-gold-primary group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{stat.value}</span>
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-text-secondary-dark mt-3 group-hover:text-white transition-colors duration-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a href="#case-studies" id="btn-view-work" className="px-10 py-5 bg-gradient-to-r from-gold-primary to-gold-secondary text-bg-dark font-bold rounded-full hover:opacity-90 hover:scale-105 hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] transition-all duration-300 uppercase tracking-widest text-sm relative overflow-hidden group inline-block btn-ripple">
            <span className="relative z-10">{t('viewWork')}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </a>
          <a href="#" id="btn-download-cv" className="px-10 py-5 border border-gold-primary/50 text-gold-primary font-bold rounded-full hover:bg-gold-primary/10 hover:border-gold-primary transition-all duration-300 uppercase tracking-widest text-sm backdrop-blur-sm inline-block hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] btn-ripple">
            <span className="btn-content">{t('downloadCV')}</span>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-gold-secondary mb-4 font-mono">Scroll</span>
        <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: [-96, 96] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-gold-primary to-transparent absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
};
