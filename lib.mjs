import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
await MeshoptDecoder.ready; await MeshoptEncoder.ready;
export const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
export function getA(p, s) { const a = p.getAttribute(s); if (!a) return null; const n = a.getCount(), e = a.getElementSize(), o = new Float32Array(n * e), t = []; for (let i = 0; i < n; i++) { a.getElement(i, t); o.set(t, i * e); } return { arr: o, e }; }
