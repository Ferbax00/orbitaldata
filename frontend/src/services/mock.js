// Mock service for contact form submissions
// This will be replaced with actual API calls once backend is integrated

const contactSubmissions = [];

export const submitContactForm = async (formData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate form validation
      if (!formData.name || !formData.email || !formData.message) {
        reject(new Error('Todos los campos son requeridos'));
        return;
      }

      // Simulate successful submission
      const submission = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      
      contactSubmissions.push(submission);
      console.log('Mock submission saved:', submission);
      console.log('All submissions:', contactSubmissions);
      
      resolve(submission);
    }, 1000);
  });
};

export const getContactSubmissions = () => {
  return contactSubmissions;
};