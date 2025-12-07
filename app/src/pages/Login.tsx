// import React from 'react';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/app');
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <ChefHat className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pantry Chef</h1>
        <p className="text-gray-500 mb-8">Turn your leftover ingredients into culinary masterpieces.</p>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all shadow-sm"
        >
          <div className="w-5 h-5 bg-contain bg-no-repeat bg-center" style={{backgroundImage: 'url(https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg)'}}></div>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
