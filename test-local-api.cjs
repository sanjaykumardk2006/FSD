async function testLocalAPI() {
  const payload = {
    name: 'Sanjay',
    mobileNumber: '1234567890',
    email: 'sanjaykumardk.24cse@kongu.edu',
    city: '',
    message: 'Test message'
  };

  try {
    const response = await fetch('http://localhost:5000/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const text = await response.text();
    console.log('Status Code:', response.status);
    console.log('Response Body:', text);
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testLocalAPI();
