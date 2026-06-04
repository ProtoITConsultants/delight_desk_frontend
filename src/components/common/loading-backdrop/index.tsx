const LoadingBackdrop = () => {
  return (
    <div
      className={`h-screen w-screen fixed top-0 left-0 z-[1300] flex justify-center items-center bg-white/30 backdrop-blur-sm`}
    >
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2A85FF]"></div>
    </div>
  );
};

export default LoadingBackdrop;
