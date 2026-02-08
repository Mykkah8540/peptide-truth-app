import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

type Props = {
 kind: "peptide" | "blend";
 slug: string;
 alt?: string;
 size?: number;
};

function publicFileExists(relFromPublic: string): boolean {
 // relFromPublic like "vials/peptide/bpc-157.png"
 const fp = path.join(process.cwd(), "public", relFromPublic);
 return existsSync(fp);
}

export default function VialImage({ kind, slug, alt, size = 112 }: Props) {
 const candidate = `vials/${kind}/${slug}.png`;
 const fallback = `vials/${kind}/_generic.svg`;

 const rel = publicFileExists(candidate) ? candidate : fallback;
 const src = `/${rel}`;

 return (
  <Image
   src={src}
   alt={alt ?? `${slug} vial`}
   width={size}
   height={size}
   priority
   style={{
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "white",
   }}
  />
 );
}
