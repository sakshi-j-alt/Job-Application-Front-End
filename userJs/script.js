document.getElementById('sidebarToggle').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
    
    const icon = document.getElementById('toggleIcon');
    if (sidebar.classList.contains('show')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x');
    } else {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  });


function loadPage(page) {
    fetch(`${page}`)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById('main-content');
            container.innerHTML = data;

            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
                script.remove();
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
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    try {
        return JSON.parse(decodedPayload);
    } catch (e) {
        console.error("Invalid JWT payload:", e); return null;
    }
}

function getUserId() {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return decoded.userid;
}

function getUserName() {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return decoded.sub;
}

function getUserEmail() {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return decoded.email;
}

function getUserType() {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return decoded.usertype;
}

function getAuthorization() {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";
    const decoded = decodeJWT(token);
    return `Bearer ${token}`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "login.html";
}

// ✅ Toggle sidebar logic
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const toggleIcon = document.getElementById('toggleIcon');

    let isSidebarVisible = true;

    toggleBtn.addEventListener('click', () => {
        if (isSidebarVisible) {
            sidebar.classList.add('sidebar-hidden');
            toggleIcon.classList.remove('bi-list');
            toggleIcon.classList.add('bi-x');
        } else {
            sidebar.classList.remove('sidebar-hidden');
            toggleIcon.classList.remove('bi-x');
            toggleIcon.classList.add('bi-list');
        }
        isSidebarVisible = !isSidebarVisible;
    });
});
