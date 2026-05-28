import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdx-options";
import { mdxComponents } from "@/components/mdx/components";

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={mdxOptions}
      components={mdxComponents}
    />
  );
}
