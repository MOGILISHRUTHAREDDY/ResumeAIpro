import React, { forwardRef } from 'react';
import { useResume } from '../context/ResumeContext';

const ResumePreview = forwardRef((props, ref) => {
  const { resumeData } = useResume();
  const { personalDetails, education, experience, skills, projects } = resumeData;

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-900 p-4 overflow-y-auto flex justify-center custom-scrollbar">
      <div 
        ref={ref} 
        className="w-[210mm] min-h-[297mm] bg-white text-gray-900 p-10 shadow-lg"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header */}
        <header className="text-center border-b-2 border-gray-300 pb-6 mb-6">
          <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-800">{personalDetails.fullName || 'Your Name'}</h1>
          <p className="text-xl text-primary-600 mt-1 font-medium">{personalDetails.title || 'Professional Title'}</p>
          <div className="flex justify-center gap-4 mt-3 text-sm text-gray-600 flex-wrap">
            {personalDetails.email && <span>{personalDetails.email}</span>}
            {personalDetails.email && personalDetails.phone && <span>•</span>}
            {personalDetails.phone && <span>{personalDetails.phone}</span>}
          </div>
        </header>

        {/* Summary */}
        {personalDetails.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{personalDetails.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-sm text-gray-500 font-medium">{exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}</span>
                  </div>
                  <div className="text-primary-600 font-medium text-sm mb-1">{exp.company}</div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">Education</h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <span className="text-sm text-gray-500 font-medium">{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</span>
                  </div>
                  <div className="text-gray-600 text-sm">{edu.institution}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">Projects</h2>
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-800">{proj.title}</h3>
                    {proj.link && <a href={proj.link} className="text-sm text-primary-600 hover:underline">{proj.link}</a>}
                  </div>
                  {proj.description && (
                    <p className="text-gray-700 text-sm whitespace-pre-line">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-widest border-b border-gray-200 mb-3 pb-1">Skills</h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {skills.map((skill, idx) => (
                <span key={idx} className="text-gray-700 text-sm font-medium">• {skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});

export default ResumePreview;
