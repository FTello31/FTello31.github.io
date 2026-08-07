import type { Locale } from "@/types";

export interface Service {
	code: string;
	description: string;
	deliverables: string[];
	duration: string;
	exclusions: string;
	idealFor: string;
	title: string;
}

export const services = {
	es: [
		{
			code: "AUT",
			description:
				"Conecto las herramientas que ya utiliza el negocio para eliminar tareas repetitivas, errores y pasos que frenan la operación.",
			deliverables: [
				"Mapa del flujo actual",
				"Automatización e integraciones",
				"Pruebas, alertas y documentación",
			],
			duration: "Orientación: 3–8 semanas",
			exclusions:
				"No incluye licencias de terceros ni rediseños completos de los sistemas conectados.",
			idealFor:
				"Equipos que copian datos, generan documentos o coordinan tareas manualmente entre varias herramientas.",
			title: "Automatización operativa",
		},
		{
			code: "INT",
			description:
				"Creo paneles, portales y aplicaciones internas que convierten procesos dispersos en una forma de trabajar clara y medible.",
			deliverables: [
				"Diseño de flujos e interfaz",
				"Desarrollo y despliegue",
				"Importación de datos y documentación",
			],
			duration: "Orientación: 6–12 semanas",
			exclusions:
				"No incluye soporte 24/7 ni carga manual de datos históricos salvo acuerdo expreso.",
			idealFor:
				"Operaciones que han crecido más allá de hojas de cálculo, correos y herramientas genéricas.",
			title: "Herramientas internas",
		},
		{
			code: "WEB",
			description:
				"Diseño y desarrollo productos web para clientes, proveedores o empleados, desde el primer alcance hasta su lanzamiento.",
			deliverables: [
				"Alcance y arquitectura",
				"Frontend, backend e integraciones",
				"Despliegue, analítica técnica y traspaso",
			],
			duration: "Orientación: 8–16 semanas",
			exclusions:
				"No incluye creación continua de contenidos, campañas de adquisición ni costes de infraestructura.",
			idealFor:
				"Negocios que necesitan digitalizar un servicio o lanzar una experiencia propia que no encaja en un SaaS estándar.",
			title: "Aplicaciones web a medida",
		},
		{
			code: "EVO",
			description:
				"Mejoro software existente cuando el rendimiento, la experiencia de uso o la deuda técnica ya limitan al negocio.",
			deliverables: [
				"Diagnóstico y prioridades",
				"Mejoras por alcance",
				"Pruebas, documentación y plan de evolución",
			],
			duration: "Orientación: desde 3 semanas",
			exclusions:
				"No implica una reescritura total ni mantenimiento indefinido si no forma parte del alcance.",
			idealFor:
				"Productos que funcionan, pero son lentos de cambiar, difíciles de mantener o generan fricción a sus usuarios.",
			title: "Evolución de software existente",
		},
	],
	en: [
		{
			code: "AUT",
			description:
				"I connect the tools your business already uses to remove repetitive work, errors and operational bottlenecks.",
			deliverables: [
				"Current workflow map",
				"Automation and integrations",
				"Testing, alerts and documentation",
			],
			duration: "Typical range: 3–8 weeks",
			exclusions: "Third-party licences and full redesigns of connected systems are not included.",
			idealFor:
				"Teams that copy data, create documents or coordinate work manually across multiple tools.",
			title: "Operations automation",
		},
		{
			code: "INT",
			description:
				"I build dashboards, portals and internal applications that turn scattered processes into a clear, measurable way of working.",
			deliverables: [
				"Workflow and interface design",
				"Development and deployment",
				"Data import and documentation",
			],
			duration: "Typical range: 6–12 weeks",
			exclusions:
				"24/7 support and manual historical data entry are not included unless explicitly agreed.",
			idealFor: "Operations that have outgrown spreadsheets, email and generic tools.",
			title: "Internal tools",
		},
		{
			code: "WEB",
			description:
				"I design and build web products for customers, suppliers or employees, from the initial scope through launch.",
			deliverables: [
				"Scope and architecture",
				"Frontend, backend and integrations",
				"Deployment, technical analytics and handover",
			],
			duration: "Typical range: 8–16 weeks",
			exclusions:
				"Ongoing content creation, acquisition campaigns and infrastructure costs are not included.",
			idealFor:
				"Businesses that need to digitise a service or launch an owned experience that does not fit an off-the-shelf SaaS.",
			title: "Custom web applications",
		},
		{
			code: "EVO",
			description:
				"I improve existing software when performance, user experience or technical debt starts holding the business back.",
			deliverables: [
				"Assessment and priorities",
				"Scoped improvements",
				"Tests, documentation and evolution plan",
			],
			duration: "Typical range: from 3 weeks",
			exclusions:
				"A full rewrite or indefinite maintenance is not included unless it is part of the agreed scope.",
			idealFor:
				"Products that work but are slow to change, difficult to maintain or frustrating for users.",
			title: "Existing software evolution",
		},
	],
} satisfies Record<Locale, Service[]>;
