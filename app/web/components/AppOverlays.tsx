"use client";

import { useEffect, useMemo, useState } from "react";
import { getAnnouncementConfig } from "@/lib/announcements";

const KEY_WELCOME_DISMISSED = "pt_welcome_dismissed_v1";
const KEY_ANNOUNCE_LAST_SEEN = "pt_announce_last_seen_v1"; // stores announcement id string

function readLS(key: string): string {
 if (typeof window === "undefined") return "";
 try {
  return String(window.localStorage.getItem(key) || "");
 } catch {
  return "";
 }
}

function writeLS(key: string, value: string) {
 if (typeof window === "undefined") return;
 try {
  window.localStorage.setItem(key, value);
 } catch {
  // ignore
 }
}

function OverlayShell({
 title,
 children,
 onClose,
 footer,
}: {
 title: string;
 children: React.ReactNode;
 onClose: () => void;
 footer?: React.ReactNode;
}) {
 return (
  <div
   role="dialog"
   aria-modal="true"
   style={{
    position: "fixed",
    inset: 0,
    zIndex: 200,
    background: "rgba(0,0,0,0.45)",
    display: "grid",
    placeItems: "center",
    padding: 16,
   }}
   onClick={onClose}
  >
   <div
    onClick={(e) => e.stopPropagation()}
    style={{
     width: "100%",
     maxWidth: 520,
     background: "#fff",
     borderRadius: 18,
     border: "1px solid rgba(0,0,0,0.08)",
     boxShadow: "0 18px 60px rgba(0,0,0,0.18)",
     overflow: "hidden",
    }}
   >
    <div style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
     <div style={{ fontWeight: 950, fontSize: 16 }}>{title}</div>
     <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      style={{
       border: "none",
       background: "transparent",
       cursor: "pointer",
       fontSize: 18,
       lineHeight: 1,
       padding: 6,
       borderRadius: 10,
      }}
     >
      ✕
     </button>
    </div>

    <div style={{ padding: "0 16px 14px 16px" }}>{children}</div>

    {footer ? (
     <div style={{ padding: "0 16px 16px 16px", display: "flex", justifyContent: "flex-end", gap: 10 }}>
      {footer}
     </div>
    ) : null}
   </div>
  </div>
 );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
 return (
  <button
   type="button"
   onClick={onClick}
   style={{
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#000",
    color: "#fff",
    borderRadius: 12,
    padding: "10px 12px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 14,
   }}
  >
   {children}
  </button>
 );
}

function GhostButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
 return (
  <button
   type="button"
   onClick={onClick}
   style={{
    border: "1px solid rgba(0,0,0,0.10)",
    background: "#fff",
    color: "#000",
    borderRadius: 12,
    padding: "10px 12px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: 14,
   }}
  >
   {children}
  </button>
 );
}

export default function AppOverlays() {
 const [ready, setReady] = useState(false);

 // Welcome state
 const [showWelcome, setShowWelcome] = useState(false);
 const [dontShowAgain, setDontShowAgain] = useState(false);

 // Announcement state
 const config = useMemo(() => getAnnouncementConfig(), []);
 const [showAnnounce, setShowAnnounce] = useState(false);

 useEffect(() => {
  // Only decide after client hydration
  const welcomeDismissed = readLS(KEY_WELCOME_DISMISSED) === "1";
  setShowWelcome(!welcomeDismissed);

  if (config?.id) {
   const lastSeen = readLS(KEY_ANNOUNCE_LAST_SEEN);
   const shouldShow = config.force ? true : lastSeen !== config.id;
   setShowAnnounce(shouldShow);
  }

  setReady(true);
 }, [config?.id, config?.force]);

 if (!ready) return null;

 const closeWelcome = () => {
  if (dontShowAgain) writeLS(KEY_WELCOME_DISMISSED, "1");
  setShowWelcome(false);
 };

 const closeAnnounce = () => {
  if (config?.id) writeLS(KEY_ANNOUNCE_LAST_SEEN, config.id);
  setShowAnnounce(false);
 };

 return (
  <>
   {showAnnounce && config ? (
    <OverlayShell
     title={config.title}
     onClose={closeAnnounce}
     footer={
      <>
       <GhostButton onClick={closeAnnounce}>Close</GhostButton>
       <PrimaryButton onClick={closeAnnounce}>Got it</PrimaryButton>
      </>
     }
    >
     <p style={{ margin: 0, color: "#333", lineHeight: 1.45, fontSize: 14, whiteSpace: "pre-wrap" }}>
      {config.body}
     </p>
     {config.force ? (
      <p style={{ marginTop: 10, color: "#777", fontSize: 12 }}>
       This message is marked as important and may reappear until acknowledged.
      </p>
     ) : null}
    </OverlayShell>
   ) : null}

   {showWelcome ? (
    <OverlayShell
     title="Welcome to Pep-Talk"
     onClose={closeWelcome}
     footer={
      <>
       <GhostButton onClick={closeWelcome}>Continue</GhostButton>
       <PrimaryButton onClick={closeWelcome}>Let’s go</PrimaryButton>
      </>
     }
    >
     <p style={{ margin: 0, color: "#333", lineHeight: 1.45, fontSize: 14 }}>
      Pep-Talk is an educational reference for peptides and blends.
     </p>

     <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14, fontSize: 13, color: "#333" }}>
      <input
       type="checkbox"
       checked={dontShowAgain}
       onChange={(e) => setDontShowAgain(e.target.checked)}
      />
      Don’t show this again
     </label>
    </OverlayShell>
   ) : null}
  </>
 );
}
