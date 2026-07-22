const axios = require('axios');

async function testSignup() {
  try {
    const response = await axios.post('http://localhost:5001/api/auth/signup', {
      username: '',
      email: 'emptyusername2@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
      role: 'Client',
      firstName: 'Test',
      lastName: 'User',
      companyName: '',
      country: 'US',
      mobileNumber: '+911234567890',
      countryCode: '+91',
      entityType: 'Self-employed',
      service: '',
    });
    console.log('Success:', response.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

testSignup();
