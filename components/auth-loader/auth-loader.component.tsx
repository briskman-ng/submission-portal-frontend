import NDDCLogo from "../NDDCLogo";

const AuthLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center flex flex-col gap-4">
        {/* NDDC Logo */}
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <NDDCLogo size="xl" />
          <div>
            <span className="font-display font-semibold text-emerald-900 text-lg">
              NDDC
            </span>
            <span className="text-stone-400 text-sm ml-2">Connect Hub</span>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="mb-4 flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 font-medium">Authenticating...</p>
        <p className="text-gray-400 text-sm mt-2">
          Please wait while we verify your credentials
        </p>
      </div>
    </div>
  );
};

export default AuthLoader;
