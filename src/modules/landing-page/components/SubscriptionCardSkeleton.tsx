const SubscriptionCardSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      key={index}
      className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 text-center relative shadow-2xl stripe-scale-in"
    >
      <div className="animate-pulse">
        <div className="h-6 bg-white/20 rounded mb-2"></div>
        <div className="h-4 bg-white/10 rounded mb-8"></div>
        <div className="h-12 bg-white/20 rounded mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
        </div>
      </div>
    </div>
  ));
};

export default SubscriptionCardSkeleton;
