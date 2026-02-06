/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Cria um componente de admonição.
 *
 * @param {Object} properties - As propriedades do componente.
 * @param {string} [properties.title] - Um título opcional.
 * @param {('tip'|'note'|'important'|'caution'|'warning')} type - O tipo de admonição.
 * @param {import('mdast').RootContent[]} children - Os elementos filhos do componente.
 * @returns {import('mdast').Parent} O componente de admonição criado.
 */
export function AdmonitionComponent(properties, children, type) {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid admonition directive. (Admonition directives must be of block type ":::note{name="name"} <content> :::")',
		);

	let label = null;
	if (properties?.["has-directive-label"]) {
		label = children[0]; // O primeiro filho é o rótulo
		// biome-ignore lint/style/noParameterAssign: <verificar depois>
		children = children.slice(1);
		label.tagName = "div"; // Muda a tag <p> para <div>
	}

	return h("blockquote", { class: `admonition bdm-${type}` }, [
		h("span", { class: "bdm-title" }, label ? label : type.toUpperCase()),
		...children,
	]);
}
