import React from "react";
import { Home, AlertCircle } from "lucide-react";

interface NotFoundPageProps {
  onGoHome?: () => void;
  onGoBack?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onGoHome = () => (window.location.href = "/"),
}) => {
  const handleGoHome = () => {
    onGoHome();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 animate-pulse">
            <AlertCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-2 animate-bounce">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital wilderness. Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </button>
        </div>

        {/* Fun Animation */}
        <div className="mt-8 text-gray-400 text-sm">
          <div className="inline-flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
