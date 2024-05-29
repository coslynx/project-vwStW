// File: multiLanguageSupport.js (JavaScript)

// Importing necessary libraries and modules
const axios = require('axios');

// Function to fetch translations from Google Cloud Translation API
const fetchTranslations = async (text, targetLanguage) => {
  try {
    const response = await axios.post('https://translation.googleapis.com/v1/text:translate', {
      q: text,
      target: targetLanguage,
    });
    
    return response.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error fetching translations:', error.message);
    return null;
  }
};

// Exporting the fetchTranslations function for external use
module.exports = fetchTranslations;