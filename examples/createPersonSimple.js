const axios = require('axios');
require('dotenv').config();

async function createPerson() {
  const apiKey = process.env.TWENTY_API_KEY;
  const apiUrl = process.env.TWENTY_API_ENDPOINT;

  if (!apiKey || !apiUrl) {
    throw new Error('Missing required environment variables TWENTY_API_KEY and/or TWENTY_API_ENDPOINT');
  }

  const mutation = `
    mutation CreatePerson($data: PersonCreateInput!) {
      createPerson(data: $data) {
        id
        name {
          firstName
          lastName
        }
        emails {
          primaryEmail
        }
        phones {
          primaryPhoneNumber
        }
        city
      }
    }
  `;

  const variables = {
    data: {
      name: {
        firstName: "John",
        lastName: "Doe"
      },
      emails: {
        primaryEmail: "john@example.com"
      },
      phones: {
        primaryPhoneNumber: "+1234567890"
      },
      city: "New York"
    }
  };

  try {
    const response = await axios({
      url: apiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      data: {
        query: mutation,
        variables
      }
    });

    console.log('Person created successfully:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error creating person:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

createPerson();
