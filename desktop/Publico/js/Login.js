async function loginUser() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const statusDiv = document.getElementById('status');
    
    // Clear previous status
    statusDiv.textContent = '';
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Handle successful login, e.g., redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            // Display error message
            statusDiv.textContent = result.message || 'Falha de login';
        }
    } catch (error) {
        statusDiv.textContent = 'An error occurred. Please try again.';
    }
}