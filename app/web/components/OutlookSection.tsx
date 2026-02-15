import ContentBlocks from "@/components/ContentBlocks";

type Block = {
 title?: string;
 population_group?: string;
 confidence?: string;
 evidence_grade?: string;
 text?: string;
 evidence_refs?: string[];
};

type Props = {
 blocks?: Block[] | null;
 outlookText?: string | null;
 interestBullets?: string[] | null;
 wrapCard?: boolean;
 hideTitle?: boolean;
};

export default function OutlookSection({ blocks, outlookText, interestBullets, wrapCard = true, hideTitle = false }: Props) {
 const list = (blocks ?? []).filter(Boolean);
 const t = (outlookText ?? "").trim();
 const bullets = (interestBullets ?? []).filter(Boolean);

 const Wrapper: any = wrapCard ? "section" : "div";
 const wrapperProps = wrapCard ? { className: "pt-card" } : {};

 return (
  <Wrapper {...wrapperProps}>
   {!hideTitle ? <h2 className="pt-card-title">Current outlook and intended use</h2> : null}

   <p className="pt-card-subtext">Why it's getting attention and how it is commonly discussed in real-world wellness, rehabilitation, and athletic communities.</p>

   {t ? (
    <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55 }}>
     {t}
    </div>
   ) : null}

   {bullets.length ? (
    <div style={{ marginTop: 14 }}>
     <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 8 }}>
      Why it's getting attention
     </div>
     <ul style={{ paddingLeft: 22, margin: 0, listStyleType: "disc", listStylePosition: "outside" }}>
      {bullets.map((b, i) => (
       <li key={i} style={{ marginBottom: 6, fontSize: 14, lineHeight: 1.45 }}>
        {b}
       </li>
      ))}
     </ul>
    </div>
   ) : (
    <div style={{ marginTop: 14, fontSize: 13, opacity: 0.75 }}>
     Outlook copy hasn’t been added yet.
    </div>
   )}

   {list.length ? (
    <div style={{ marginTop: 14 }}>
     <ContentBlocks heading="" blocks={list} wrapCard={false} hideHeading />
    </div>
   ) : null}
  </Wrapper>
 );
}
