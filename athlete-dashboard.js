document.addEventListener('DOMContentLoaded', () => {

    const API_BASE = 'http://127.0.0.1:8000/api';

    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    let currentUser = null;

    try {
        currentUser = savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
        currentUser = null;
    }

    /* =========================================================
       GATE — لازم تكون مسجلة دخول (أي role)
    ========================================================= */

    if (!token || !currentUser) {
        window.location.href = './login.html';
        return;
    }

    // لو أدمن دخل هنا بالغلط، وديه لداش بورده هو
    if (currentUser.role === 'admin') {
        window.location.href = './facility-command.html';
        return;
    }

    document.getElementById('adName').textContent = currentUser.name || 'Athlete';
    document.getElementById('adEmail').textContent = currentUser.email || '';
    document.getElementById('adAvatar').textContent =
        (currentUser.name || 'A').trim().charAt(0).toUpperCase();
    document.getElementById('adFirstName').textContent =
        (currentUser.name || 'Athlete').split(' ')[0];


    /* =========================================================
       FETCH HELPER
    ========================================================= */

    async function apiFetch(path) {

        const response = await fetch(`${API_BASE}${path}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = './login.html';
            return null;
        }

        return response.json().catch(() => null);
    }


    /* =========================================================
       LOGOUT
    ========================================================= */

    document.getElementById('adLogoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = './login.html';
    });


    /* =========================================================
       PROFILE
    ========================================================= */

    async function loadProfile() {

        const profile = await apiFetch('/athlete/profile');
        if (!profile) return;

        document.getElementById('profileName').textContent = profile.name || '—';
        document.getElementById('profileEmail').textContent = profile.email || '—';
        document.getElementById('profileJoined').textContent = formatDate(profile.created_at);
    }

    loadProfile();


    /* =========================================================
       MEMBERSHIP
    ========================================================= */

    async function loadMembership() {

        const container = document.getElementById('membershipContent');

        const response = await fetch(`${API_BASE}/athlete/membership`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 404) {
            container.innerHTML = `
                <p class="ad-no-membership">
                    You don't have an active membership yet.
                    <a href="./index.html#MEMBERSHIPS">Browse plans →</a>
                </p>
            `;
            return;
        }

        const membership = await response.json().catch(() => null);
        if (!membership) return;

        container.innerHTML = `
            <div class="ad-plan-name">${escapeHtml(membership.plan_name)}</div>
            <div class="ad-plan-price">$${Number(membership.price).toFixed(2)} / ${escapeHtml(membership.billing_cycle)}</div>
            <div class="ad-plan-meta">
                <div>
                    <span>Status</span>
                    <span>${escapeHtml(membership.status)}</span>
                </div>
                <div>
                    <span>Renews / Ends</span>
                    <span>${formatDate(membership.ends_at)}</span>
                </div>
            </div>
        `;
    }

    loadMembership();


    /* =========================================================
       BOOKINGS
    ========================================================= */

    async function loadBookings() {

        const body = document.getElementById('bookingsTableBody');

        const bookings = await apiFetch('/athlete/bookings');

        if (!bookings || !bookings.length) {
            body.innerHTML = `<tr><td colspan="4" class="ad-loading-row">No sessions booked yet.</td></tr>`;
            return;
        }

        body.innerHTML = bookings.map((b) => `
            <tr>
                <td>${escapeHtml(b.program?.title || 'General session')}</td>
                <td>${formatDate(b.session_date)}</td>
                <td><span class="ad-status-badge ${b.status}">${b.status}</span></td>
                <td>${escapeHtml(b.notes || '—')}</td>
            </tr>
        `).join('');
    }

    loadBookings();


    /* =========================================================
       UTILS
    ========================================================= */

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function formatDate(dateStr) {
        if (!dateStr) return '—';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

});
