import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

const initialResumeData = {
  personalDetails: { fullName: '', email: '', phone: '', title: '', summary: '' },
  education: [],
  experience: [],
  skills: [],
  projects: []
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [darkMode, setDarkMode] = useState(false);

  const updatePersonalDetails = (data) => {
    setResumeData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, ...data } }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const updateEducation = (index, data) => {
    const newEd = [...resumeData.education];
    newEd[index] = { ...newEd[index], ...data };
    setResumeData(prev => ({ ...prev, education: newEd }));
  };
  
  const removeEducation = (index) => {
    const newEd = [...resumeData.education];
    newEd.splice(index, 1);
    setResumeData(prev => ({ ...prev, education: newEd }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const updateExperience = (index, data) => {
    const newExp = [...resumeData.experience];
    newExp[index] = { ...newExp[index], ...data };
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const removeExperience = (index) => {
    const newExp = [...resumeData.experience];
    newExp.splice(index, 1);
    setResumeData(prev => ({ ...prev, experience: newExp }));
  };

  const addSkill = (skill) => {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
  };
  
  const removeSkill = (index) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', link: '', description: '' }]
    }));
  };

  const updateProject = (index, data) => {
    const newProj = [...resumeData.projects];
    newProj[index] = { ...newProj[index], ...data };
    setResumeData(prev => ({ ...prev, projects: newProj }));
  };
  
  const removeProject = (index) => {
    const newProj = [...resumeData.projects];
    newProj.splice(index, 1);
    setResumeData(prev => ({ ...prev, projects: newProj }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      updatePersonalDetails,
      addEducation, updateEducation, removeEducation,
      addExperience, updateExperience, removeExperience,
      addSkill, removeSkill,
      addProject, updateProject, removeProject,
      darkMode, toggleDarkMode
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
