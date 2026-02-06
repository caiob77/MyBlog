import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Fuwari",
	subtitle: "Demo Site",
	lang: "en", // Código do idioma, ex: 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Matiz padrão para a cor do tema, de 0 a 360. ex: vermelho: 0, azul-petróleo: 200, ciano: 250, rosa: 345
		fixed: false, // Ocultar o seletor de cor do tema para visitantes
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relativo ao diretório /src. Relativo ao diretório /public se começar com '/'
		position: "center", // Equivalente a object-position, suporta apenas 'top', 'center', 'bottom'. 'center' por padrão
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
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/saicaca/fuwari", // Links internos não devem incluir o caminho base, pois é adicionado automaticamente
			external: true, // Mostrar um ícone de link externo e abrirá em uma nova aba
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/demo-avatar.png", // Relativo ao diretório /src. Relativo ao diretório /public se começar com '/'
	name: "Lorem Ipsum",
	bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	links: [
		{
			name: "Twitter",
			icon: "fa6-brands:twitter", // Visite https://icones.js.org/ para códigos de ícones
			// Você precisará instalar o conjunto de ícones correspondente se ainda não estiver incluído
			// `pnpm add @iconify-json/<nome-do-conjunto-de-ícones>`
			url: "https://twitter.com",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://store.steampowered.com",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/saicaca/fuwari",
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
