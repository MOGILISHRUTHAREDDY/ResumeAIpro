import React, { useState } from 'react';
import axios from 'axios';
import { useResume } from '../context/ResumeContext';
import { Sparkles, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const AIAssistant = () => {
  const { resumeData } = useResume();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [scoreData, setScoreData] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:5001/api/ai';

  const handleScoreResume = async () => {
    setLoading(true);
    setError(null);
    setScoreData(null);
    try {
      const response = await axios.post(`${API_BASE}/score`, {
        resumeData,
        role
      });
      setScoreData(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to get AI feedback. Please check if backend is running and API key is valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl shadow-sm border border-indigo-100 dark:border-gray-700 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400">
        <Sparkles size={24} />
        <h2 className="text-xl font-bold">AI Assistant</h2>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Role</label>
          <input 
            type="text" 
            placeholder="e.g. Frontend Developer" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-shadow"
          />
        </div>

        <button 
          onClick={handleScoreResume}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {scoreData && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-750 rounded-xl shadow-sm">
              <span className="font-semibold text-gray-700 dark:text-gray-200">Resume Score</span>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xl border-2 border-indigo-200 dark:border-indigo-800">
                {scoreData.score}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-750 p-4 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" /> Improvement Suggestions
              </h3>
              <ul className="space-y-3">
                {scoreData.feedback?.map((tip, idx) => (
                  <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
