
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AuthScreenProps {
  onLogin: (userData: { name: string; email: string; avatar?: string }) => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const handleGoogleLogin = () => {
    // Simulate Google login for demo purposes
    // In a real app, this would integrate with Google OAuth
    const mockUser = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    };
    onLogin(mockUser);
  };

  const handleAppleLogin = () => {
    // Placeholder for Apple login
    alert("Apple login coming soon!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">EveryNote</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Capture your thoughts, your way.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Text, voice, or media—Jyn Writer makes it effortless to record your day and reflect with AI-powered clarity.
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="w-64 h-64 bg-gray-700/50 rounded-full flex items-center justify-center border border-gray-600">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-600 rounded-lg mb-4 mx-auto flex items-center justify-center">
                <svg 
                  width="60" 
                  height="60" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  className="text-gray-300"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <path d="M14 2v6h6"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
              </div>
              <div className="flex space-x-2 justify-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-3 transition-colors"
            variant="secondary"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Log In with Google</span>
          </Button>

          <Button
            onClick={handleAppleLogin}
            className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-3 transition-colors border border-gray-700"
            variant="outline"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
            </svg>
            <span>Log In with Apple</span>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-gray-400 hover:text-gray-300 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-400 hover:text-gray-300 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
