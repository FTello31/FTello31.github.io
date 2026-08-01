export type CredentialType = "certification" | "course" | "learning-path" | "nanodegree";

interface CertificateMetadata {
	credentialId?: string;
	credentialType: CredentialType;
	expirationDate?: string;
	issueDate?: string;
	skills: string[];
	verificationUrl?: string;
}

export const certificateMetadata: Record<string, CertificateMetadata> = {
	"1": {
		credentialId: "JMDFDFDLFQE1BW4",
		credentialType: "certification",
		expirationDate: "2024-03-01",
		issueDate: "2020-12-30",
		skills: ["AWS", "Cloud fundamentals", "Cloud architecture"],
		verificationUrl: "https://aws.amazon.com/verification",
	},
	"2": {
		credentialId: "ffcf4205227a4be3a56602d6c277c521",
		credentialType: "certification",
		expirationDate: "2027-11-12",
		skills: ["AWS", "Cloud development", "Serverless"],
		verificationUrl: "https://aws.amazon.com/verification",
	},
	"3": {
		credentialId: "G6J3EVKB2NV4QMWB",
		credentialType: "certification",
		expirationDate: "2027-03-31",
		issueDate: "2024-03-31",
		skills: ["AWS", "Cloud architecture", "Solution design"],
		verificationUrl: "https://aws.amazon.com/verification",
	},
	"4": {
		credentialId: "EE1P34YJBNB1105N",
		credentialType: "certification",
		expirationDate: "2024-07-18",
		skills: ["AWS", "Data analytics", "Data engineering"],
		verificationUrl: "https://aws.amazon.com/verification",
	},
	"5": {
		credentialType: "course",
		skills: ["Google Cloud", "Autoscaling", "Infrastructure automation"],
	},
	"6": {
		credentialType: "course",
		skills: ["Google Cloud", "Core services", "Cloud infrastructure"],
	},
	"7": {
		credentialType: "course",
		skills: ["Google Cloud", "IAM", "Storage"],
	},
	"8": {
		credentialType: "course",
		skills: ["Google Cloud", "Cloud infrastructure", "Networking"],
	},
	"9": {
		credentialType: "course",
		skills: ["Google Cloud", "Big data", "Machine learning"],
	},
	"10": {
		credentialId: "JFQ87NRTBZD8",
		credentialType: "course",
		skills: ["Google Cloud", "Compute", "Networking"],
		verificationUrl: "https://coursera.org/verify/JFQ87NRTBZD8",
	},
	"11": {
		credentialType: "course",
		skills: ["Google Cloud", "Cloud engineering", "Exam preparation"],
	},
	"12": {
		credentialType: "learning-path",
		skills: ["Google Cloud", "Cloud engineering", "Infrastructure"],
	},
	"13": {
		credentialType: "course",
		skills: ["Node.js", "Express", "Web applications"],
	},
	"14": {
		credentialType: "course",
		skills: ["Node.js", "Express", "REST APIs"],
	},
	"15": {
		credentialType: "course",
		skills: ["Node.js", "JavaScript", "Backend development"],
	},
	"16": {
		credentialType: "course",
		skills: ["Frontend", "Technical interviews", "Career development"],
	},
	"17": {
		credentialType: "certification",
		expirationDate: "2028-04-27",
		skills: ["Git", "GitHub", "Collaboration"],
		verificationUrl: "https://www.credly.com/go/fxZR4YI4",
	},
	"18": {
		credentialType: "course",
		skills: ["Android", "Java", "Mobile development"],
	},
	"19": {
		credentialType: "learning-path",
		skills: ["Artificial intelligence", "LLMs", "AI engineering"],
	},
	"20": {
		credentialType: "nanodegree",
		skills: ["DevOps", "CI/CD", "Cloud infrastructure"],
	},
	"21": {
		credentialType: "course",
		skills: ["Generative AI", "AWS", "Foundation models"],
	},
};
