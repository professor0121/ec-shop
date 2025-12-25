async function registerAuthTests() {
    const res=await fetch('http://localhost:3001/api/auth/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'abhishekkushwahaak0121@gmail.com',
            password: 'password123'
        })
    });
    const data=await res.json();
    console.log('Register Test:', data);
}

registerAuthTests();