import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, color: "#666" }}>Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
