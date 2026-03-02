import BackHomeLink from "@/components/BackHomeLink";
import AccountClient from "./accountClient";

export default function AccountPage() {
  return (
    <main className="pt-account-page">
      <div className="pt-account-page__inner">
        <div className="pt-account-page__back">
          <BackHomeLink />
        </div>
        <h1 className="pt-account-page__title">Account</h1>
        <AccountClient />
      </div>
    </main>
  );
}
