'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'three/src/math/MathUtils';
import { useRef, useState } from 'react';

function Particles() {
    const ref = useRef<any>();

    // Create sphere particles
    const [sphere] = useState(() => {
        const arr = new Float32Array(3000 * 3);
        for (let i = 0; i < 3000; i++) {
            const phi = Math.acos(-1 + (2 * i) / 3000);
            const theta = Math.sqrt(3000 * Math.PI) * phi;
            const radius = 1.6 + Math.random() * 0.5;

            arr[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
            arr[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
            arr[i * 3 + 2] = radius * Math.cos(phi);
        }
        return arr;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ff003c"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

export default function VolumetricBackground() {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-spBlack origin-center pointer-events-none">
            {/* Fog vignette layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] z-10 pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Particles />
            </Canvas>
        </div>
    );
}
