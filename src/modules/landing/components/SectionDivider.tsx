import { Zap } from "lucide-react";

const SectionDivider = () => {
  return (
    <div className="relative py-4 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-center">
          {/* Left line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/50"></div>

          {/* Lightning bolt icon */}
          <div className="mx-6 md:mx-8 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>

          {/* Right line */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-purple-500/30 to-purple-500/50"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
