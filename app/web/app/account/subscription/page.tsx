import BackHomeLink from "@/components/BackHomeLink";
import SubscriptionClient from "./subscriptionClient";

export default function SubscriptionPage() {
 return (
  <main className="pt-page">
   <section className="pt-card">
    <BackHomeLink />
    <h1 className="pt-card-title">Manage subscription</h1>
    <SubscriptionClient />
   </section>
  </main>
 );
}
