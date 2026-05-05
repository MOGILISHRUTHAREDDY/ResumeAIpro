const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.suggestWording = async (req, res) => {
  try {
    const { text, section, role } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required for suggestion' });
    }

    const prompt = `You are an expert resume writer. Improve the following ${section} description for a ${role || 'job applicant'}. Make it sound professional, action-oriented, and impactful. Provide 3 different concise options separated by "|||".
    
    Original text: ${text}
    
    Options:`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const suggestions = response.choices[0].message.content.split('|||').map(s => s.trim()).filter(s => s);
    
    res.json({ suggestions });
  } catch (err) {
    console.error('OpenAI Error:', err);
    res.status(500).json({ error: 'Failed to generate suggestions. Check API Key.' });
  }
};

exports.scoreResume = async (req, res) => {
  try {
    const { resumeData, role } = req.body;

    const prompt = `You are an expert ATS (Applicant Tracking System) and resume reviewer. Review the following resume data for the role of ${role || 'a general professional'}.
    
    Resume Data:
    ${JSON.stringify(resumeData)}
    
    Provide a JSON response with the following structure exactly (no markdown formatting, just raw JSON):
    {
      "score": <number out of 10>,
      "feedback": [
        "<suggestion 1>",
        "<suggestion 2>",
        "<suggestion 3>"
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.5,
    });

    let result;
    try {
       result = JSON.parse(response.choices[0].message.content);
    } catch(e) {
       result = { score: 0, feedback: ["Failed to parse AI response. Ensure your data is clear."] };
    }

    res.json(result);
  } catch (err) {
    console.error('OpenAI Error:', err);
    res.status(500).json({ error: 'Failed to score resume. Check API Key.' });
  }
};
