const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  </div>
);

export default LoadingSpinner;