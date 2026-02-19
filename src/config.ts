import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	ProjectsConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Home",
	subtitle: "Caio beniel",
	lang: "en", // Código do idioma, ex: 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Matiz padrão para a cor do tema, de 0 a 360. ex: vermelho: 0, azul-petróleo: 200, ciano: 250, rosa: 345
		fixed: false, // Ocultar o seletor de cor do tema para visitantes
	},
	banner: {
		enable: true,
		src: "assets/images/demo-banner.png", // Relativo ao diretório /src. Relativo ao diretório /public se começar com '/'
		position: "center", // Equivalente a object-position, suporta apenas 'top', 'center', 'bottom'. 'center' por padrão
		title: "BENIEL", // Título animado no banner (deixe vazio para usar o nome do site em maiúsculas)
		tagline: " · TENHA CORAGEM PARA SE TORNAR AQUILO QUE SONHA.", // Tagline no rodapé do banner
		credit: {
			enable: false, // Exibir o texto de crédito da imagem do banner
			text: "", // Texto de crédito a ser exibido
			url: "", // (Opcional) Link URL para a arte original ou página do artista
		},
	},
	toc: {
		enable: true, // Exibir o índice no lado direito do post
		depth: 2, // Profundidade máxima de cabeçalhos a mostrar no índice, de 1 a 3
	},
	favicon: [
		// Deixe este array vazio para usar o favicon padrão
		// {
		//   src: '/favicon/icon.png',    // Caminho do favicon, relativo ao diretório /public
		//   theme: 'light',              // (Opcional) 'light' ou 'dark', defina apenas se tiver favicons diferentes para modo claro e escuro
		//   sizes: '32x32',              // (Opcional) Tamanho do favicon, defina apenas se tiver favicons de tamanhos diferentes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Projects,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/caiob77", // Links internos não devem incluir o caminho base, pois é adicionado automaticamente
			external: true, // Mostrar um ícone de link externo e abrirá em uma nova aba
		},
	],
};

export const projectsConfig: ProjectsConfig = {
	items: [
		{
			title: "Finance App",
			href: "https://github.com/caiob77/finance-App",
			description:
				"Projeto focado em aperfeiçoamento técnico, com design patterns baseados em SOLID. Backend em camadas com clean code e desacoplamento.",
			technologies: "Node.js, SOLID, arquitetura em camadas",
			type: "passion",
			image: "/images/projects/FinanceApp.svg", // Coloque a imagem em public/images/projects/
		},
		{
			title: "BEWER E-commerce",
			href: "https://github.com/caiob77/BEWER-ECOMMERCE",
			description:
				"Plataforma de e-commerce completa com autenticação e sistema de pagamentos com Stripe.",
			technologies: "Next.js, Stripe, autenticação",
			type: "passion",
			image: "/images/projects/ecomerce.svg",
		},
		{
			title: "Fintrack",
			href: "https://github.com/caiob77/Fintrack",
			description:
				"Aplicação de controle financeiro aplicando SOLID no frontend, com React Query, Redux e Tailwind.",
			technologies: "React, React Query, Redux, Tailwind CSS, Shadcn",
			type: "passion",
			image: "/images/projects/fintrack.svg",
		},
		{
			title: "JuriAI",
			href: "https://github.com/caiob77/JuriAi",
			description:
				"Primeiro projeto com IA: agentes para solução de problemas jurídicos. RAG, embeddings, LangChain, OCR e processamento assíncrono.",
			technologies: "Python, Django, LangChain, Agno, RAG, OCR, Django-Q",
			type: "tool",
			image: "/images/projects/juriAi.svg",
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/eu.png", // Relativo ao diretório /src. Relativo ao diretório /public se começar com '/'
	name: "Caio Beniel",
	bio: "Desenvolvedor de software e entusiasta de tecnologia.",
	links: [
		{
			name: "LinkedIn",
			icon: "logos:linkedin-icon", // Visite https://icones.js.org/ para códigos de ícones
			// Você precisará instalar o conjunto de ícones correspondente se ainda não estiver incluído
			// `pnpm add @iconify-json/<nome-do-conjunto-de-ícones>`
			url: "https://www.linkedin.com/in/caio-beniel-82381b22b/",
		},
		{
			name: "Instagram",
			icon: "logos:instagram-icon",
			url: "https://www.instagram.com/benielsena_bx/",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/caiob77",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Nota: Alguns estilos (como cor de fundo) estão sendo sobrescritos, veja o arquivo astro.config.mjs.
	// Por favor, selecione um tema escuro, pois este tema de blog atualmente suporta apenas cor de fundo escura
	theme: "github-dark",
};
