import { build } from "esbuild";

await build({
    entryPoints: ["main.ts"],
    bundle: true,
    platform: "node",
    outdir: "out",
    format: "esm", // same bug with cjs format (default)
    conditions: ["deno"]
});

console.log("Bundled server");
