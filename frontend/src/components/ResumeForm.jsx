import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ResumeForm = () => {
  const {
    resumeData,
    updatePersonalDetails,
    addEducation, updateEducation, removeEducation,
    addExperience, updateExperience, removeExperience,
    addSkill, removeSkill,
    addProject, updateProject, removeProject
  } = useResume();

  const [newSkill, setNewSkill] = useState('');

  const handleSkillAdd = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
      
      {/* Personal Details Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Full Name" value={resumeData.personalDetails.fullName} onChange={e => updatePersonalDetails({ fullName: e.target.value })} className="input-field" />
          <input type="text" placeholder="Professional Title" value={resumeData.personalDetails.title} onChange={e => updatePersonalDetails({ title: e.target.value })} className="input-field" />
          <input type="email" placeholder="Email" value={resumeData.personalDetails.email} onChange={e => updatePersonalDetails({ email: e.target.value })} className="input-field" />
          <input type="tel" placeholder="Phone" value={resumeData.personalDetails.phone} onChange={e => updatePersonalDetails({ phone: e.target.value })} className="input-field" />
          <textarea placeholder="Professional Summary" value={resumeData.personalDetails.summary} onChange={e => updatePersonalDetails({ summary: e.target.value })} className="input-field md:col-span-2 h-24 resize-none"></textarea>
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Experience</h2>
          <button onClick={addExperience} className="text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 p-2 rounded-full transition-colors flex items-center">
            <Plus size={20} /> <span className="ml-1 text-sm font-medium">Add</span>
          </button>
        </div>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="p-4 border rounded-lg dark:border-gray-700 space-y-3 bg-gray-50 dark:bg-gray-750 relative group">
            <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
              <input type="text" placeholder="Company" value={exp.company} onChange={e => updateExperience(index, { company: e.target.value })} className="input-field" />
              <input type="text" placeholder="Position" value={exp.position} onChange={e => updateExperience(index, { position: e.target.value })} className="input-field" />
              <input type="text" placeholder="Start Date" value={exp.startDate} onChange={e => updateExperience(index, { startDate: e.target.value })} className="input-field" />
              <input type="text" placeholder="End Date" value={exp.endDate} onChange={e => updateExperience(index, { endDate: e.target.value })} className="input-field" />
              <textarea placeholder="Description (Bullet points recommended)" value={exp.description} onChange={e => updateExperience(index, { description: e.target.value })} className="input-field md:col-span-2 h-24 resize-none"></textarea>
            </div>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Education</h2>
          <button onClick={addEducation} className="text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 p-2 rounded-full transition-colors flex items-center">
            <Plus size={20} /> <span className="ml-1 text-sm font-medium">Add</span>
          </button>
        </div>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg dark:border-gray-700 space-y-3 bg-gray-50 dark:bg-gray-750 relative group">
            <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
              <input type="text" placeholder="Institution" value={edu.institution} onChange={e => updateEducation(index, { institution: e.target.value })} className="input-field" />
              <input type="text" placeholder="Degree" value={edu.degree} onChange={e => updateEducation(index, { degree: e.target.value })} className="input-field" />
              <input type="text" placeholder="Start Date" value={edu.startDate} onChange={e => updateEducation(index, { startDate: e.target.value })} className="input-field" />
              <input type="text" placeholder="End Date" value={edu.endDate} onChange={e => updateEducation(index, { endDate: e.target.value })} className="input-field" />
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2">Skills</h2>
        <form onSubmit={handleSkillAdd} className="flex gap-2">
          <input type="text" placeholder="Add a skill (e.g., React, Node.js)" value={newSkill} onChange={e => setNewSkill(e.target.value)} className="input-field flex-1" />
          <button type="submit" className="bg-primary-600 text-white px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">Add</button>
        </form>
        <div className="flex flex-wrap gap-2 mt-3">
          {resumeData.skills.map((skill, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
              {skill}
              <button onClick={() => removeSkill(index)} className="text-gray-500 hover:text-red-500 focus:outline-none"><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Projects</h2>
          <button onClick={addProject} className="text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-700 p-2 rounded-full transition-colors flex items-center">
            <Plus size={20} /> <span className="ml-1 text-sm font-medium">Add</span>
          </button>
        </div>
        {resumeData.projects.map((proj, index) => (
          <div key={index} className="p-4 border rounded-lg dark:border-gray-700 space-y-3 bg-gray-50 dark:bg-gray-750 relative group">
            <button onClick={() => removeProject(index)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
              <input type="text" placeholder="Project Title" value={proj.title} onChange={e => updateProject(index, { title: e.target.value })} className="input-field" />
              <input type="text" placeholder="Link (Optional)" value={proj.link} onChange={e => updateProject(index, { link: e.target.value })} className="input-field" />
              <textarea placeholder="Description" value={proj.description} onChange={e => updateProject(index, { description: e.target.value })} className="input-field md:col-span-2 h-20 resize-none"></textarea>
            </div>
          </div>
        ))}
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          color: #111827;
          transition: all 0.2s;
        }
        .dark .input-field {
          border-color: #4b5563;
          background-color: #374151;
          color: #f3f4f6;
        }
        .input-field:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
          background-color: #ffffff;
        }
        .dark .input-field:focus {
          border-color: #818cf8;
          box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
          background-color: #1f2937;
        }
      `}} />
    </div>
  );
};

export default ResumeForm;
