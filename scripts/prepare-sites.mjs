import { mkdir, writeFile } from "node:fs/promises";

await mkdir(new URL("../dist/server/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../dist/server/index.js", import.meta.url),
  `export default {
  async fetch() {
    return new Response("This private preview has been disabled.", {
      status: 410,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  },
};
`,
);
