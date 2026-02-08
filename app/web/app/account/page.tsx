import BackHomeLink from "@/components/BackHomeLink";
import AccountClient from "./accountClient";

export default function AccountPage() {
 return (
  <main className="pt-page">
   <section className="pt-card">
    <BackHomeLink />
    <h1 className="pt-card-title">Account</h1>
    <AccountClient />
   </section>
  </main>
 );
}
