import React, { useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, MeshDistortMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';

const SkillNode = ({ position, label, color, onClick }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const elapsed = performance.now() / 1000;
    if (meshRef.current) {
      meshRef.current.rotation.x = elapsed * 0.5;
      meshRef.current.rotation.y = elapsed * 0.5;
      
      // Gentle pulsing when hovered
      if (hovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh 
          ref={meshRef}
          onPointerOver={() => {
            setHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = 'auto';
          }}
          onClick={onClick}
          castShadow
        >
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial 
            color={hovered ? '#ffffff' : color} 
            metalness={0.9} 
            roughness={0.1} 
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={0.8}
            envMapIntensity={2}
            wireframe={hovered}
          />
        </mesh>
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.25}
          color={hovered ? "#ffffff" : "#A0A0A0"}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1O4a0Ew.woff"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {label}
        </Text>
      </Float>
    </group>
  );
};

const OrbitingSystem = ({ onSelectCategory }: any) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const elapsed = performance.now() / 1000;
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.05;
      groupRef.current.rotation.z = Math.sin(elapsed * 0.1) * 0.1;
    }
  });

  const categories = useMemo(() => [
    { id: 'design', label: 'Design Tools', color: '#C9A84C', pos: [3.5, 0, 0] },
    { id: 'motion', label: 'Motion & 3D', color: '#E8D48B', pos: [-3.5, 0, 0] },
    { id: 'web', label: 'Web Dev', color: '#C9A84C', pos: [0, 0, 3.5] },
    { id: 'proto', label: 'Prototyping', color: '#E8D48B', pos: [0, 0, -3.5] },
    { id: 'analytics', label: 'Analytics', color: '#C9A84C', pos: [2.5, 2.5, 2.5] },
    { id: 'prod', label: 'Productivity', color: '#E8D48B', pos: [-2.5, -2.5, -2.5] },
  ], []);

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial 
          color="#050505" 
          distort={0.5} 
          speed={1.5} 
          roughness={0.1} 
          metalness={1} 
          envMapIntensity={3} 
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
      
      {/* Orbiting Nodes */}
      {categories.map((cat, i) => (
        <SkillNode 
          key={i} 
          position={cat.pos} 
          label={cat.label} 
          color={cat.color} 
          onClick={() => onSelectCategory(cat.id)}
        />
      ))}
    </group>
  );
};

export const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skillData: Record<string, string[]> = {
    design: ['Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Sketch', 'Adobe XD', 'CorelDraw'],
    motion: ['After Effects', 'Cinema 4D', 'Blender', 'Spline 3D', 'Rive'],
    web: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Webflow', 'WordPress'],
    proto: ['Framer', 'ProtoPie', 'InVision', 'Principle'],
    analytics: ['Google Analytics', 'Hotjar', 'Mixpanel'],
    prod: ['Notion', 'Asana', 'Jira', 'Miro', 'Slack']
  };

  const categoryTitles: Record<string, string> = {
    design: 'Design Tools',
    motion: 'Motion & 3D',
    web: 'Web Development',
    proto: 'Prototyping',
    analytics: 'Analytics & Research',
    prod: 'Productivity & Management'
  };

  return (
    <section className="relative w-full h-screen bg-bg-dark overflow-hidden" id="skills">
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 2, 10], fov: 45 }} 
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#C9A84C" castShadow />
          <spotLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
          <Environment preset="city" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          <OrbitingSystem onSelectCategory={setSelectedCategory} />
          <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={20} blur={2} far={5} />
        </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pointer-events-none h-full flex flex-col">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Expertise</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-4">
            {t('skills')}
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">Interactive Skill Matrix. Click on a node to explore.</p>
        </motion.div>

        <div className="flex-grow flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedCategory && (
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                className="max-w-2xl w-full mx-auto glass-panel p-10 md:p-12 rounded-[2.5rem] border border-gold-primary/30 pointer-events-auto shadow-[0_0_80px_rgba(201,168,76,0.2)] relative overflow-hidden"
              >
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-8 relative z-10">
                  <h3 className="text-4xl font-display font-bold text-gold-primary">
                    {categoryTitles[selectedCategory]}
                  </h3>
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-text-secondary-dark hover:text-white hover:bg-gold-primary/20 hover:border-gold-primary/50 border border-transparent transition-all duration-300 btn-ripple"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4 relative z-10">
                  {skillData[selectedCategory].map((skill, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={i} 
                      className="px-6 py-3 bg-black/40 rounded-full border border-white/10 text-text-primary-dark hover:border-gold-primary hover:text-gold-secondary transition-all duration-300 cursor-default hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:-translate-y-1 font-light tracking-wide"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
