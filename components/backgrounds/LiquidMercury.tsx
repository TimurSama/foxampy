"use client";

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uFlowSpeed;
uniform float uViscosity;
uniform float uMetallic;
uniform float uInteractionStrength;

varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0) )
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 4; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

float fastFresnel(vec3 normal, vec3 viewDir, float power) {
    return pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), power);
}

void main() {
    vec2 uv = vUv;
    vec2 mouse = uMouse / uResolution;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;
    mouse.x *= aspect;

    float t = uTime * uFlowSpeed;
    
    float mouseDist = length(uv - mouse);
    float mouseForce = exp(-mouseDist * 3.0) * uInteractionStrength;
    
    vec2 q = vec2(0.);
    q.x = fbm(uv + 0.00 * t);
    q.y = fbm(uv + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm(uv + 1.0 * q + vec2(1.7, 9.2) + 0.15 * t + mouseForce);
    r.y = fbm(uv + 1.0 * q + vec2(8.3, 2.8) + 0.126 * t - mouseForce);

    float f = fbm(uv + r);

    vec2 e = vec2(0.01, 0.0);
    float h = f;
    float h_r = fbm(uv + e.xy + r);
    float h_u = fbm(uv + e.yx + r);
    vec3 normal = normalize(vec3(h - h_r, h - h_u, 0.1 * uViscosity));

    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 lightDir = normalize(vec3(0.5, 0.5, 1.0));
    
    vec3 halfDir = normalize(lightDir + viewDir);
    float NdotH = max(0.0, dot(normal, halfDir));
    float specular = pow(NdotH, 120.0 * uMetallic);
    
    vec3 color = mix(uColor1, uColor2, smoothstep(0.2, 0.8, f));
    color = mix(color, uColor3, smoothstep(0.45, 0.5, length(q)));

    color += vec3(specular) * 0.4;
    
    float rim = length(normal.xy);
    color += vec3(rim) * 0.1 * uColor3;

    gl_FragColor = vec4(color, 1.0);
}
`;

interface LiquidMercuryProps {
    config?: {
        color1: string;
        color2: string;
        color3: string;
        speed: number;
        viscosity: number;
        metallic: number;
        interactionStrength: number;
    }
}

export default function LiquidMercury({ config }: LiquidMercuryProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, viewport } = useThree();

    const defaultConfig = {
        color1: '#000000',
        color2: '#0a0a0a',
        color3: '#505050',
        speed: 0.05,
        viscosity: 1.0,
        metallic: 0.6,
        interactionStrength: 0.1
    };

    const currentConfig = { ...defaultConfig, ...config };

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(size.width / 2, size.height / 2) },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uColor1: { value: new THREE.Color(currentConfig.color1) },
        uColor2: { value: new THREE.Color(currentConfig.color2) },
        uColor3: { value: new THREE.Color(currentConfig.color3) },
        uFlowSpeed: { value: currentConfig.speed },
        uViscosity: { value: currentConfig.viscosity },
        uMetallic: { value: currentConfig.metallic },
        uInteractionStrength: { value: currentConfig.interactionStrength }
    }), []);

    const LOOP_DURATION = 20;

    useFrame((state) => {
        if (!meshRef.current) return;

        const rawTime = state.clock.elapsedTime;
        const fullCycle = LOOP_DURATION * 2;
        let loopTime = rawTime % fullCycle;
        if (loopTime > LOOP_DURATION) {
            loopTime = fullCycle - loopTime;
        }
        uniforms.uTime.value = loopTime;
        uniforms.uResolution.value.set(size.width, size.height);

        uniforms.uColor1.value.set(currentConfig.color1);
        uniforms.uColor2.value.set(currentConfig.color2);
        uniforms.uColor3.value.set(currentConfig.color3);
        uniforms.uFlowSpeed.value = currentConfig.speed;
        uniforms.uViscosity.value = currentConfig.viscosity;
        uniforms.uMetallic.value = currentConfig.metallic;
        uniforms.uInteractionStrength.value = currentConfig.interactionStrength;

        if (state.pointer) {
            const x = (state.pointer.x + 1) * 0.5 * size.width;
            const y = (state.pointer.y + 1) * 0.5 * size.height;

            uniforms.uMouse.value.x += (x - uniforms.uMouse.value.x) * 0.1;
            uniforms.uMouse.value.y += (y - uniforms.uMouse.value.y) * 0.1;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={[0, 0, 0]}
            scale={[viewport.width, viewport.height, 1]}
        >
            <planeGeometry args={[1, 1, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}
