"use client";
import ChangePasswordCard from "../components/ChangePasswordCard";
import DeleteAccountCard from "../components/DeleteAccountCard";

const AccountSecurity = () => {
  return (
    <div className="space-y-6">
      <ChangePasswordCard />
      <DeleteAccountCard />
    </div>
  );
};

export default AccountSecurity;
