import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Flame, Snowflake, Loader2, Clock, Utensils } from 'lucide-react';
import { RecipeRequest, GeneratedRecipe } from '../types';
import { generateRecipe } from '../services/gemini';
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const CUISINES = ['Indian', 'Italian', 'Mexican', 'Chinese', 'American', 'Mediterranean', 'Thai'];

const RecipeGenerator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedRecipe | null>(null);

  const [formData, setFormData] = useState<RecipeRequest>({
    ingredients: '',
    cuisine: 'Indian',
    preferences: '',
    time: 30,
    cookingMethod: 'fire'
  });

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const recipe = await generateRecipe(formData);
      setResult(recipe);

      if (auth.currentUser) {
        // CORRECTED FIRESTORE LOGIC
        await addDoc(collection(db, "users", auth.currentUser.uid, "history"), {
            ...recipe,
            createdAt: new Date(),
            originalRequest: formData
        });
      }
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-orange-600 flex items-center gap-2">
          <Utensils className="w-5 h-5" />
          Pantry Chef
        </h1>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Recipe Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients Available</label>
                <textarea
                  required
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  placeholder="e.g. 2 eggs, stale bread, milk, sugar..."
                  value={formData.ingredients}
                  onChange={e => setFormData({...formData, ingredients: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
                  <select
                    className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-orange-500 outline-none"
                    value={formData.cuisine}
                    onChange={e => setFormData({...formData, cuisine: e.target.value})}
                  >
                    {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time (mins)</label>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, cookingMethod: 'fire'})}
                    className={`p-3 rounded-xl flex items-center justify-center gap-2 border transition-all ${
                      formData.cookingMethod === 'fire'
                      ? 'bg-orange-50 border-orange-500 text-orange-700'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Flame className="w-5 h-5" /> Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, cookingMethod: 'fireless'})}
                    className={`p-3 rounded-xl flex items-center justify-center gap-2 border transition-all ${
                      formData.cookingMethod === 'fireless'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Snowflake className="w-5 h-5" /> Fireless
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Preferences</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="e.g. High protein, Low spicy, Kids friendly..."
                  value={formData.preferences}
                  onChange={e => setFormData({...formData, preferences: e.target.value})}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Generate Recipe'}
              </button>
            </form>
          </div>
        </div>
        <div className="space-y-6">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl min-h-[400px]">
              <Utensils className="w-16 h-16 mb-4 opacity-20" />
              <p>Your culinary creation will appear here</p>
            </div>
          )}
          {loading && (
            <div className="h-full flex flex-col items-center justify-center border border-gray-100 bg-white rounded-2xl min-h-[400px]">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
              <p className="text-gray-600 font-medium animate-pulse">Consulting the AI Chef...</p>
            </div>
          )}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden animate-fade-in-up">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
                <div className="flex gap-4 text-white/90 text-sm font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {result.cookingTime}</span>
                  <span>{result.calories}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 italic mb-6 border-l-4 border-orange-200 pl-4 py-1">
                  {result.description}
                </p>
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.ingredients.map((ing, i) => (
                      <span key={i} className="bg-orange-50 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Instructions</h3>
                  <ol className="space-y-4">
                    {result.instructions.map((step, i) => (
                      <li key={i} className="flex gap-4 text-gray-700">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeGenerator;
