function loadPage(page) {
    fetch(`pages/${page}`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('main-content');
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            // Only extract and insert <body> content if needed
            const bodyContent = tempDiv.querySelector('body')?.innerHTML || tempDiv.innerHTML;
            container.innerHTML = bodyContent;

            // Extract and evaluate scripts manually
            const scripts = tempDiv.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    // Adjust the path if needed
                    const src = script.src.split('/').pop(); // Get just the filename
                    newScript.src = `js/${src}`; // Assuming all scripts are in js/
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
            });
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML =
                '<p class="text-danger">Failed to load content.</p>';
            console.error(err);
        });
}

function decodeJWT(token) {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null; const payload = parts[1];
    // Base64URL decode
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    try {
        return JSON.parse(decodedPayload);
    } catch (e) {
        console.error("Invalid JWT payload:", e); return null;
    }
}

function getUserId() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "Login.html";
    const decoded = decodeJWT(token);
    console.log(decoded);
    return decoded.userid;
}
function getUserPhone() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "Login.html"; // Redirect to login if token is missing
    }
    const decoded = decodeJWT(token); // Assuming you have a decodeJWT function
    return decoded.phone; // Return the Phone from the decoded token
}

function getUserName() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "Login.html";
    const decoded = decodeJWT(token);
    return decoded.username;
}

function getUserEmail() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "Login.html";;
    const decoded = decodeJWT(token);
    return decoded.email;
}

function getUserType() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "Login.html";
    const decoded = decodeJWT(token);
    return decoded.usertype;
}

function getAuthorization() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "Login.html";
    const decoded = decodeJWT(token);
    return `Bearer ${token}`;
    //return `Bearer ${decoded}`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "Login.html";
}