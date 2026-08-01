import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);
const outputDirectory = new URL("../public/certificates/previews/", import.meta.url);
const outputDirectoryPath = fileURLToPath(outputDirectory);
const query = '*[_type == "certificate"] | order(order asc){id,credentialUrl}';
const endpoint = new URL("https://o9vp89lc.api.sanity.io/v2026-07-21/data/query/production");
endpoint.searchParams.set("query", query);

const response = await fetch(endpoint);
if (!response.ok) throw new Error(`Sanity request failed with ${response.status}`);
const { result: certificates } = await response.json();
await mkdir(outputDirectoryPath, { recursive: true });

for (const certificate of certificates) {
	const temporaryDirectory = await mkdtemp(join(tmpdir(), `certificate-${certificate.id}-`));
	try {
		const sourceResponse = await fetch(certificate.credentialUrl);
		if (!sourceResponse.ok) {
			throw new Error(`Certificate ${certificate.id} failed with ${sourceResponse.status}`);
		}
		const sourceBuffer = Buffer.from(await sourceResponse.arrayBuffer());
		const contentType = sourceResponse.headers.get("content-type") ?? "";
		const isPdf =
			certificate.credentialUrl.toLowerCase().includes(".pdf") || contentType.includes("pdf");
		let renderSource = sourceBuffer;

		if (isPdf) {
			const inputPath = join(temporaryDirectory, "source.pdf");
			const outputPrefix = join(temporaryDirectory, "page");
			await writeFile(inputPath, sourceBuffer);
			await execFileAsync("pdftoppm", [
				"-f",
				"1",
				"-l",
				"1",
				"-singlefile",
				"-png",
				"-r",
				"180",
				inputPath,
				outputPrefix,
			]);
			renderSource = await readFile(`${outputPrefix}.png`);
		}

		for (const width of [480, 1440]) {
			await sharp(renderSource)
				.rotate()
				.flatten({ background: "#f4f3ef" })
				.resize({ fit: "inside", width, withoutEnlargement: false })
				.webp({ effort: 5, quality: width === 480 ? 78 : 84 })
				.toFile(join(outputDirectoryPath, `${certificate.id}-${width}.webp`));
		}
		console.log(`Generated previews for certificate ${certificate.id}`);
	} finally {
		await rm(temporaryDirectory, { force: true, recursive: true });
	}
}
