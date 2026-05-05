import React, { useRef } from 'react';
import { ResumeProvider } from './context/ResumeContext';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AIAssistant from './components/AIAssistant';
import ThemeToggle from './components/ThemeToggle';
import { FileDown, Sparkles } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const AppContent = () => {
  const resumeRef = useRef();

  const downloadPDF = () => {
    const element = resumeRef.current;
    if (!element) return;
    
    const opt = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 border-b dark:border-gray-700">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary-600 p-2 rounded-lg text-white">
              <Sparkles size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">
              ResumeAI Pro
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
            >
              <FileDown size={18} />
              <span>Download PDF</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-64px)]">
        
        {/* Left Column - Form */}
        <div className="lg:w-[40%] flex flex-col gap-6 overflow-hidden">
          <ResumeForm />
        </div>

        {/* Middle Column - AI Assistant */}
        <div className="lg:w-[25%] flex flex-col gap-6 overflow-hidden">
          <AIAssistant />
        </div>

        {/* Right Column - Preview */}
        <div className="lg:w-[35%] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-inner">
          <ResumePreview ref={resumeRef} />
        </div>

      </main>
    </div>
  );
};

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;
