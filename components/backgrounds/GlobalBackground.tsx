"use client";

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import LiquidMercury from './LiquidMercury';
import OilCSSBackground from '@/components/visuals/OilCSSBackground';

export default function GlobalBackground() {
    const [useWebGL, setUseWebGL] = useState(true);
    const [webGLLost, setWebGLLost] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        
        const checkWebGL = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                const hasWebGL = !!gl;
                console.log('[GlobalBackground] WebGL support:', hasWebGL);
                return hasWebGL;
            } catch (e) {
                console.log('[GlobalBackground] WebGL check failed:', e);
                return false;
            }
        };

        const hasWebGL = checkWebGL();
        if (!hasWebGL) {
            console.log('[GlobalBackground] WebGL not supported, using CSS fallback');
            setUseWebGL(false);
        } else {
            console.log('[GlobalBackground] WebGL supported, using LiquidMercury');
        }
    }, []);

    useEffect(() => {
        if (!useWebGL) return;
        
        const handleContextLost = (e: Event) => {
            e.preventDefault();
            setWebGLLost(true);
            setUseWebGL(false);
        };

        const handleContextRestored = () => {
            setWebGLLost(false);
            setUseWebGL(true);
        };

        window.addEventListener('webglcontextlost', handleContextLost);
        window.addEventListener('webglcontextrestored', handleContextRestored);

        return () => {
            window.removeEventListener('webglcontextlost', handleContextLost);
            window.removeEventListener('webglcontextrestored', handleContextRestored);
        };
    }, [useWebGL]);

    if (!isClient) {
        return <OilCSSBackground />;
    }

    if (!useWebGL || webGLLost) {
        return <OilCSSBackground />;
    }

    return (
        <div className="fixed inset-0" style={{ pointerEvents: 'none', zIndex: -1 }}>
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 2]}
                gl={{
                    alpha: true,
                    antialias: false,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false
                }}
                onCreated={({ gl }) => {
                    console.log('[GlobalBackground] Canvas created, WebGL context:', gl.getContext());
                    const canvas = gl.domElement;
                    canvas.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault();
                        console.log('[GlobalBackground] WebGL context lost');
                        setWebGLLost(true);
                        setUseWebGL(false);
                    });
                    canvas.addEventListener('webglcontextrestored', () => {
                        console.log('[GlobalBackground] WebGL context restored');
                        setWebGLLost(false);
                        setUseWebGL(true);
                    });
                }}
            >
                <Suspense fallback={<OilCSSBackground />}>
                    <LiquidMercury />
                </Suspense>
            </Canvas>
        </div>
    );
}
