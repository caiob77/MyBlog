// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString de mdast-util-to-string>
import { toString } from "mdast-util-to-string";

/* Usa o primeiro parágrafo do post como o trecho */
export function remarkExcerpt() {
	return (tree, { data }) => {
		let excerpt = "";
		for (const node of tree.children) {
			if (node.type !== "paragraph") {
				continue;
			}
			excerpt = toString(node);
			break;
		}
		data.astro.frontmatter.excerpt = excerpt;
	};
}
