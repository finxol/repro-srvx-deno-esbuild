import { build } from "esbuild";

await build({
    entryPoints: ["main.ts"],
    bundle: true,
    platform: "node",
    outdir: "out",
    format: "esm", // same bug with cjs format (default)
});

console.log("Bundled server");
