import process from "node:process";
import { serve } from "srvx";

// Run the server!
// Start the server
const server = serve({
    fetch(_request) {
        return new Response("👋 Hello there!");
    },
    port: 1993,
    hostname: "0.0.0.0",
    silent: true,
});

server.ready().then(() => {
    console.log(
        `Server listening on ${server.url}`,
    );
});

process.on("SIGINT", async () => {
    await server.close();
    console.info("Server closed");
    process.exit(0);
});
