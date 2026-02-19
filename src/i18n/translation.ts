import { siteConfig } from "../config";
import type I18nKey from "./i18nKey";
import { en } from "./languages/en";
import { es } from "./languages/es";

export type Translation = {
	[K in I18nKey]: string;
};

const defaultTranslation = en;

const map: Record<string, Translation> = {
	en,
	en_us: en,
	en_gb: en,
	en_au: en,
	es,
	zh_cn: en,
	zh_tw: en,
	ja: en,
	ja_jp: en,
	ko: en,
	ko_kr: en,
	th: en,
	th_th: en,
	vi: en,
	vi_vn: en,
	id: en,
	tr: en,
	tr_tr: en,
};

export function getTranslation(lang: string): Translation {
	return map[lang.toLowerCase()] || defaultTranslation;
}

export function i18n(key: I18nKey): string {
	const lang = siteConfig.lang || "en";
	return getTranslation(lang)[key];
}
