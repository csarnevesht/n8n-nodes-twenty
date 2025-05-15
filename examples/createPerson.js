require('dotenv').config();
const axios = require('axios');

// Configuration
const API_ENDPOINT = process.env.TWENTY_API_ENDPOINT;
const API_KEY = process.env.TWENTY_API_KEY;

// Example person data
const personData = {
  name: {
    firstName: 'John',
    lastName: 'Doe'
  },
  email: 'john@example.com',
  phone: '+1234567890',
  jobTitle: 'Software Developer',
  city: 'New York',
  avatarUrl: 'https://example.com/avatar.jpg'
};

async function createPerson() {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API_ENDPOINT}/people`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: personData
    });

    console.log('Person created successfully:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error creating person:');
    console.error(error.response?.data || error.message);
  }
}

// Run the example
createPerson();
