# Case study authoring

Case studies live in `content/case-studies/<locale>/` as Markdown or MDX. Copy the draft `_template.mdx`, rename it with the public slug and create an authorised translation with the same `translationKey`.

Before setting `draft: false`, confirm that the client approved the displayed name or anonymised label, images, results and any testimonial included. A case marked `featured: true` fails content validation unless it contains at least one result; testimonials remain optional and must never be invented.

To connect an existing technical project card to an internal case, use the project's existing `translationKey` as the case study `translationKey`. Otherwise, the project continues to use its external URL.

Do not add estimates, reconstructed metrics or unapproved quotes. Technologies belong in `services`; the MDX body should prioritise context, problem, solution and process.
