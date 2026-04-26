async function testContactAPI() {
  const payload = {
    name: 'Sanjay',
    mobileNumber: '1234567890',
    email: 'sanjaykumardk.24cse@kongu.edu',
    city: 'Erode',
    message: 'Test message'
  };

  console.log('Sending payload:', payload);

  try {
    // We are testing the Railway backend directly
    const response = await fetch('https://fsd-production-b3b3.up.railway.app/api/contact/submit', {
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

testContactAPI();
