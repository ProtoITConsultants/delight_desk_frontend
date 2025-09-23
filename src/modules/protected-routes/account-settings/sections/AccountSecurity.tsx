"use client";
import ChangeEmailCard from "../components/ChangeEmailCard";
import ChangePasswordCard from "../components/ChangePasswordCard";
import DeleteAccountCard from "../components/DeleteAccountCard";

const AccountSecurity = () => {
  return (
    <div className="space-y-6">
      <ChangeEmailCard />
      <ChangePasswordCard />
      <DeleteAccountCard />
    </div>
  );
};

export default AccountSecurity;
