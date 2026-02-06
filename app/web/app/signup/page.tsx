import { Suspense } from "react";
import SignupClient from "./SignupClient";

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, color: "#666" }}>Loading…</div>}>
      <SignupClient />
    </Suspense>
  );
}
