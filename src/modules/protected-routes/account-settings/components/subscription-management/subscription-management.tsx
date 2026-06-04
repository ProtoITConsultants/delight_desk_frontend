import AvailablePlans from "./components/available-plans";
import CurrentUserPlan from "./components/current-plan";

const SubscriptionManagement = () => {
  return (
    <div className="space-y-8">
      <CurrentUserPlan />
      <AvailablePlans />
    </div>
  );
};

export default SubscriptionManagement;
