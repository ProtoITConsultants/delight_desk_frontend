const DashboardHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
      {/* Text Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-sm sm:text-lg text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
