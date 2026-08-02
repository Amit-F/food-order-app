// Node ESM loader hook: intercepts .png imports (which assets.js uses as Vite-style
// module imports) and resolves them to their absolute filesystem path as a plain
// string default export, instead of trying to parse image bytes as JavaScript.
// This lets scripts import assets.js directly from plain Node, outside Vite,
// so the 48-meal migration reads the real source of truth instead of a hand
// transcribed copy.
import { fileURLToPath } from 'url';

export async function load(url, context, nextLoad) {
    if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.svg')) {
        const path = fileURLToPath(url);
        return {
            format: 'module',
            source: `export default ${JSON.stringify(path)};`,
            shortCircuit: true
        };
    }
    return nextLoad(url, context);
}
