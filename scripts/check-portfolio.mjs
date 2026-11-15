import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Run after build: checks the rendered pages, including data loaded from Sanity.
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
for (const [prefix, certificates] of [
	["", "certificados"],
	["en/", "certificates"],
]) {
	const profile = `/${prefix}fernando/`;
	for (const route of [`${prefix}fernando`, `${prefix}${certificates}`]) {
		const html = read(`dist/${route}/index.html`);
		const header = html.match(/<header\b[^>]*class="site-header"[\s\S]*?<\/header>/)?.[0];
		assert.ok(header, `${route}: header exists`);
		assert.ok(!header.includes("Studio"), `${route}: personal branding`);
		const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
		assert.ok(
			footer?.includes(">GitHub</a>") && footer.includes(">LinkedIn</a>"),
			`${route}: personal social links`,
		);
		assert.ok(!/class="[^"]*\bwhatsapp-float\b/.test(html), `${route}: no commercial WhatsApp`);
		assert.match(html, /<title>[^<]* - Fernando Tello<\/title>/);
		const graph = JSON.parse(
			html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1],
		)["@graph"];
		assert.ok(
			graph.some((entry) => entry["@type"] === "Person" && new URL(entry.url).pathname === profile),
		);
		assert.ok(!graph.some((entry) => entry["@type"] === "Service"));
		for (const section of ["projects", "experience", "education"]) {
			assert.ok(header.includes(`href="${profile}#${section}"`), `${route}: ${section} navigation`);
		}
		assert.ok(header.includes(`href="/${prefix}${certificates}/"`));
		assert.match(html, new RegExp(`href="https?://[^"]+/${route}/" rel="canonical"`));
	}
	const html = read(`dist/${prefix}fernando/index.html`);
	for (const section of ["projects", "experience", "education", "contact"]) {
		assert.ok(html.includes(`id="${section}"`), `${profile}: ${section} section`);
	}
	assert.ok(html.includes('href="/resume.pdf"'));
	assert.ok(html.includes("MBIT") && html.includes("Udacity"));
	assert.ok(html.includes('class="project-card"'), `${profile}: projects loaded`);
	const cases = read(`dist/${prefix}${prefix ? "cases" : "casos"}/index.html`);
	assert.ok(
		!cases.includes('class="project-grid"'),
		"Cases no longer contains the technical archive",
	);
	assert.ok(cases.includes(`href="${profile}#projects"`));
	const home = read(`dist/${prefix}index.html`);
	assert.ok(/class="[^"]*\bwhatsapp-float\b/.test(home), "Studio retains commercial contact");
	assert.ok(home.includes(`href="${profile}"`));
	const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
	assert.ok(
		footer && !footer.includes(">GitHub</a>") && !footer.includes(">LinkedIn</a>"),
		"Studio footer keeps personal social links in the profile",
	);
	assert.ok(read(`dist/${prefix}${prefix ? "contact" : "contacto"}/index.html`).includes("<form"));
}
const sitemap = read("dist/sitemap-0.xml");
assert.ok(sitemap.includes("/fernando/") && sitemap.includes("/en/fernando/"));
assert.ok(!sitemap.includes("/sobre-mi/") && !sitemap.includes("/en/about/"));
const redirects = read("netlify.toml");
for (const [from, to] of [
	["/sobre-mi/", "/fernando/"],
	["/en/about/", "/en/fernando/"],
]) {
	assert.ok(redirects.includes(`from = "${from}"\nto = "${to}"\nstatus = 301`));
}
console.log("Portfolio checks passed (ES/EN profiles, certificates, Studio, SEO and redirects).");
