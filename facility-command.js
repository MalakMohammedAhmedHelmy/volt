document.addEventListener('DOMContentLoaded', () => {

    const API_BASE =
        'http://127.0.0.1:8000/api';


    const token =
        localStorage.getItem('token');


    const savedUser =
        localStorage.getItem('user');


    let currentUser = null;


    try {

        currentUser =
            savedUser
                ? JSON.parse(savedUser)
                : null;

    } catch (error) {

        currentUser = null;

    }


    /* =========================================================
       GATE
    ========================================================= */

    if (
        !token ||
        !currentUser ||
        currentUser.role !== 'admin'
    ) {

        window.location.href =
            './index.html';

        return;

    }


    document.getElementById(
        'fcAdminName'
    ).textContent =
        currentUser.name || 'Admin';


    document.getElementById(
        'fcAdminEmail'
    ).textContent =
        currentUser.email || '';


    document.getElementById(
        'fcAdminInitial'
    ).textContent =
        (
            currentUser.name || 'A'
        )
            .trim()
            .charAt(0)
            .toUpperCase();


    /* =========================================================
       FETCH HELPER
    ========================================================= */

    async function apiFetch(
        path,
        options = {}
    ) {

        const response =
            await fetch(
                `${API_BASE}${path}`,
                {
                    ...options,

                    headers: {

                        'Content-Type':
                            'application/json',

                        'Accept':
                            'application/json',

                        'Authorization':
                            `Bearer ${token}`,

                        ...(options.headers || {}),

                    },

                }
            );


        if (response.status === 401) {

            localStorage.removeItem(
                'token'
            );

            localStorage.removeItem(
                'user'
            );

            window.location.href =
                './login.html';

            return null;

        }


        if (response.status === 403) {

            alert(
                'Forbidden — admin access only.'
            );

            window.location.href =
                './index.html';

            return null;

        }


        const data =
            await response
                .json()
                .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                data.message ||
                'Request failed.'
            );

        }


        return data;

    }


    /* =========================================================
       LOGOUT
    ========================================================= */

    document
        .getElementById(
            'fcLogoutBtn'
        )
        .addEventListener(
            'click',
            () => {

                localStorage.removeItem(
                    'token'
                );

                localStorage.removeItem(
                    'user'
                );

                window.location.href =
                    './login.html';

            }
        );


    /* =========================================================
       SECTION SWITCHING
    ========================================================= */

    const sectionTitles = {

        overview: [
            'Overview',
            'Live facility telemetry at a glance'
        ],

        athletes: [
            'Athletes',
            'Every registered member of VOLT'
        ],

        'contact-messages': [
            'Contact Messages',
            'Messages sent through the VOLT contact form'
        ],

        memberships: [
            'Memberships',
            'Manage active subscriptions'
        ],

        programs: [
            'Programs',
            'The training modules on offer'
        ],

        coaches: [
            'Coaches',
            'Your master coaching staff'
        ],

    };


    const navItems =
        document.querySelectorAll(
            '.fc-nav-item'
        );


    navItems.forEach((item) => {

        item.addEventListener(
            'click',
            () => {

                navItems.forEach(
                    (el) =>
                        el.classList.remove(
                            'active'
                        )
                );


                item.classList.add(
                    'active'
                );


                document
                    .querySelectorAll(
                        '.fc-section'
                    )
                    .forEach(
                        (section) => {

                            section.classList.remove(
                                'active'
                            );

                        }
                    );


                const key =
                    item.dataset.section;


                /*
                 * تم الرجوع للـ ID الطبيعي بعد ما
                 * اتأكدنا إن الرسائل بتظهر صح
                 */

                const currentSection =
                    document.getElementById(
                        `section-${key}`
                    );


                if (currentSection) {

                    currentSection.classList.add(
                        'active'
                    );

                }


                if (sectionTitles[key]) {

                    document.getElementById(
                        'fcSectionTitle'
                    ).textContent =
                        sectionTitles[key][0];


                    document.getElementById(
                        'fcSectionSubtitle'
                    ).textContent =
                        sectionTitles[key][1];

                }


                loadSection(key);


                /* لو دخلت على الرسائل نفسها، صفري الـ Badge */

                if (key === 'contact-messages') {

                    const badge =
                        document.getElementById(
                            'contactMessagesBadge'
                        );

                    if (badge) {

                        badge.style.display =
                            'none';

                    }

                }

            }
        );

    });


    /* =========================================================
       LOAD SECTION DATA
    ========================================================= */

    const loadedSections =
        new Set();


    function loadSection(key) {

        if (
            loadedSections.has(key)
        ) {

            return;

        }


        loadedSections.add(key);


        if (
            key === 'athletes'
        ) {

            loadAthletes();

        }


        if (
            key === 'contact-messages'
        ) {

            loadContactMessages();

        }


        if (
            key === 'memberships'
        ) {

            loadMemberships();

        }


        if (
            key === 'programs'
        ) {

            loadPrograms();

        }


        if (
            key === 'coaches'
        ) {

            loadCoaches();

        }

    }


    /* =========================================================
       OVERVIEW STATS
    ========================================================= */

    async function loadStats() {

        try {

            const stats =
                await apiFetch(
                    '/admin/stats'
                );


            if (!stats) return;


            document.getElementById(
                'statAthletes'
            ).textContent =
                stats.total_athletes ?? '—';


            document.getElementById(
                'statMemberships'
            ).textContent =
                stats.active_memberships ?? '—';


            document.getElementById(
                'statRevenue'
            ).textContent =
                `$${Number(
                    stats.monthly_revenue || 0
                ).toLocaleString()}`;


            document.getElementById(
                'statPrograms'
            ).textContent =
                `${stats.total_programs ?? 0} / ${stats.total_coaches ?? 0}`;

        } catch (error) {

            document.getElementById(
                'fcSectionSubtitle'
            ).textContent =
                'Could not load live stats — check your API connection.';

        }

    }


    loadStats();


    /* =========================================================
       ATHLETES
    ========================================================= */

    async function loadAthletes() {

        const body =
            document.getElementById(
                'athletesTableBody'
            );


        try {

            const users =
                await apiFetch(
                    '/admin/users'
                );


            if (!users) return;


            if (!users.length) {

                body.innerHTML = `
                    <tr>
                        <td colspan="5" class="fc-loading">
                            No athletes yet.
                        </td>
                    </tr>
                `;

                return;

            }


            body.innerHTML =
                users.map(
                    (user) => `

                    <tr data-id="${user.id}">

                        <td>
                            ${escapeHtml(
                                user.name
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                user.email
                            )}
                        </td>

                        <td>
                            <span class="fc-badge ${user.role}">
                                ${user.role}
                            </span>
                        </td>

                        <td>
                            ${formatDate(
                                user.created_at
                            )}
                        </td>

                        <td>

                            <div class="fc-row-actions">

                                <button
                                    class="fc-icon-btn toggle-role"
                                    title="Toggle admin role"
                                >
                                    <i class="fa-solid fa-user-shield"></i>
                                </button>

                                <button
                                    class="fc-icon-btn danger delete-user"
                                    title="Remove athlete"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </td>

                    </tr>

                `
                ).join('');


            body
                .querySelectorAll(
                    '.toggle-role'
                )
                .forEach(
                    (btn) => {

                        btn.addEventListener(
                            'click',
                            async (e) => {

                                const row =
                                    e.target.closest(
                                        'tr'
                                    );


                                const id =
                                    row.dataset.id;


                                const user =
                                    users.find(
                                        (u) =>
                                            String(
                                                u.id
                                            ) === id
                                    );


                                const newRole =
                                    user.role === 'admin'
                                        ? 'user'
                                        : 'admin';


                                if (
                                    !confirm(
                                        `Make this athlete "${newRole}"?`
                                    )
                                ) {

                                    return;

                                }


                                await apiFetch(
                                    `/admin/users/${id}`,
                                    {

                                        method:
                                            'PUT',

                                        body:
                                            JSON.stringify({
                                                role:
                                                    newRole
                                            }),

                                    }
                                );


                                loadedSections.delete(
                                    'athletes'
                                );


                                loadAthletes();

                            }
                        );

                    }
                );


            body
                .querySelectorAll(
                    '.delete-user'
                )
                .forEach(
                    (btn) => {

                        btn.addEventListener(
                            'click',
                            async (e) => {

                                const row =
                                    e.target.closest(
                                        'tr'
                                    );


                                const id =
                                    row.dataset.id;


                                if (
                                    !confirm(
                                        'Remove this athlete permanently?'
                                    )
                                ) {

                                    return;

                                }


                                await apiFetch(
                                    `/admin/users/${id}`,
                                    {
                                        method:
                                            'DELETE'
                                    }
                                );


                                loadedSections.delete(
                                    'athletes'
                                );


                                loadAthletes();

                            }
                        );

                    }
                );


        } catch (error) {

            console.error(
                'Athletes Error:',
                error
            );


            body.innerHTML = `
                <tr>
                    <td colspan="5" class="fc-loading">
                        Failed to load athletes.
                    </td>
                </tr>
            `;

        }

    }


    /* =========================================================
       CONTACT MESSAGES
    ========================================================= */

    async function loadContactMessages() {

        const body =
            document.getElementById(
                'contactMessagesTableBody'
            );


        if (!body) {

            console.error(
                'contactMessagesTableBody not found'
            );

            return;

        }


        try {

            body.innerHTML = `
                <tr>
                    <td colspan="5" class="fc-loading">
                        Loading messages…
                    </td>
                </tr>
            `;


            const messages =
                await apiFetch(
                    '/admin/contact-messages'
                );


            if (!messages) return;


            if (!messages.length) {

                body.innerHTML = `
                    <tr>
                        <td colspan="5" class="fc-loading">
                            No contact messages yet.
                        </td>
                    </tr>
                `;

                return;

            }


            body.innerHTML =
                messages.map(
                    (message) => `

                    <tr data-id="${message.id}">

                        <td>
                            ${escapeHtml(
                                message.name
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                message.email
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                message.message
                            )}
                        </td>

                        <td>

                            <span
                                class="fc-badge ${
                                    message.is_read
                                        ? 'active'
                                        : 'pending'
                                }"
                            >
                                ${
                                    message.is_read
                                        ? 'Read'
                                        : 'New'
                                }
                            </span>

                        </td>

                        <td>
                            ${formatDate(
                                message.created_at
                            )}
                        </td>

                    </tr>

                `
                ).join('');


        } catch (error) {

            console.error(
                'Contact Messages Error:',
                error
            );


            body.innerHTML = `
                <tr>
                    <td colspan="5" class="fc-loading">
                        Failed to load contact messages.
                    </td>
                </tr>
            `;

        }

    }


    /* =========================================================
       CONTACT MESSAGES BADGE (unread count)
    ========================================================= */

    async function updateContactMessagesBadge() {

        try {

            const messages =
                await apiFetch(
                    '/admin/contact-messages'
                );


            if (!messages) return;


            const unreadCount =
                messages.filter(
                    (m) => !m.is_read
                ).length;


            const badge =
                document.getElementById(
                    'contactMessagesBadge'
                );


            if (!badge) return;


            if (unreadCount > 0) {

                badge.textContent =
                    unreadCount > 99
                        ? '99+'
                        : unreadCount;

                badge.style.display =
                    'flex';

            } else {

                badge.style.display =
                    'none';

            }

        } catch (error) {

            console.error(
                'Badge Error:',
                error
            );

        }

    }


    /* =========================================================
       MEMBERSHIPS
    ========================================================= */

    async function loadMemberships() {

        const body =
            document.getElementById(
                'membershipsTableBody'
            );


        try {

            const memberships =
                await apiFetch(
                    '/admin/memberships'
                );


            if (!memberships) return;


            if (!memberships.length) {

                body.innerHTML = `
                    <tr>
                        <td colspan="7" class="fc-loading">
                            No memberships yet.
                        </td>
                    </tr>
                `;

                return;

            }


            body.innerHTML =
                memberships.map(
                    (m) => `

                    <tr data-id="${m.id}">

                        <td>
                            ${escapeHtml(
                                m.user?.name || '—'
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                m.plan_name
                            )}
                        </td>

                        <td>
                            $${Number(
                                m.price
                            ).toFixed(2)}
                        </td>

                        <td>
                            ${escapeHtml(
                                m.billing_cycle
                            )}
                        </td>

                        <td>

                            <span
                                class="fc-badge ${m.status}"
                            >
                                ${m.status}
                            </span>

                        </td>

                        <td>
                            ${formatDate(
                                m.ends_at
                            )}
                        </td>

                        <td>

                            <div class="fc-row-actions">

                                <button
                                    class="fc-icon-btn danger delete-membership"
                                    title="Remove"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </td>

                    </tr>

                `
                ).join('');


            body
                .querySelectorAll(
                    '.delete-membership'
                )
                .forEach(
                    (btn) => {

                        btn.addEventListener(
                            'click',
                            async (e) => {

                                const id =
                                    e.target
                                        .closest(
                                            'tr'
                                        )
                                        .dataset.id;


                                if (
                                    !confirm(
                                        'Remove this membership?'
                                    )
                                ) {

                                    return;

                                }


                                await apiFetch(
                                    `/admin/memberships/${id}`,
                                    {
                                        method:
                                            'DELETE'
                                    }
                                );


                                loadedSections.delete(
                                    'memberships'
                                );


                                loadMemberships();

                            }
                        );

                    }
                );


        } catch (error) {

            console.error(
                'Memberships Error:',
                error
            );


            body.innerHTML = `
                <tr>
                    <td colspan="7" class="fc-loading">
                        Failed to load memberships.
                    </td>
                </tr>
            `;

        }

    }


    /* =========================================================
       ADD MEMBERSHIP
    ========================================================= */

    document
        .getElementById(
            'addMembershipBtn'
        )
        .addEventListener(
            'click',
            () => {

                openModal(
                    'New Membership',

                    `
                    <div class="fc-field">

                        <label>
                            Athlete user ID
                        </label>

                        <input
                            type="number"
                            name="user_id"
                            required
                        >

                    </div>


                    <div class="fc-field">

                        <label>
                            Plan name
                        </label>

                        <input
                            type="text"
                            name="plan_name"
                            placeholder="6 Months Pro"
                            required
                        >

                    </div>


                    <div class="fc-field-row">

                        <div class="fc-field">

                            <label>
                                Price ($)
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="price"
                                required
                            >

                        </div>


                        <div class="fc-field">

                            <label>
                                Billing cycle
                            </label>

                            <select name="billing_cycle">

                                <option value="monthly">
                                    Monthly
                                </option>

                                <option value="term">
                                    Term
                                </option>

                            </select>

                        </div>

                    </div>


                    <div class="fc-field-row">

                        <div class="fc-field">

                            <label>
                                Starts
                            </label>

                            <input
                                type="date"
                                name="starts_at"
                                required
                            >

                        </div>


                        <div class="fc-field">

                            <label>
                                Ends
                            </label>

                            <input
                                type="date"
                                name="ends_at"
                                required
                            >

                        </div>

                    </div>


                    <div class="fc-field">

                        <label>
                            Status
                        </label>

                        <select name="status">

                            <option value="active">
                                Active
                            </option>

                            <option value="expired">
                                Expired
                            </option>

                            <option value="cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>
                    `,

                    async (formData) => {

                        await apiFetch(
                            '/admin/memberships',
                            {
                                method:
                                    'POST',

                                body:
                                    JSON.stringify(
                                        Object.fromEntries(
                                            formData
                                        )
                                    ),
                            }
                        );


                        loadedSections.delete(
                            'memberships'
                        );


                        loadMemberships();

                    }
                );

            }
        );


    /* =========================================================
       PROGRAMS
    ========================================================= */

    async function loadPrograms() {

        const body =
            document.getElementById(
                'programsTableBody'
            );


        try {

            const programs =
                await apiFetch(
                    '/admin/programs'
                );


            if (!programs) return;


            if (!programs.length) {

                body.innerHTML = `
                    <tr>
                        <td colspan="6" class="fc-loading">
                            No programs yet.
                        </td>
                    </tr>
                `;

                return;

            }


            body.innerHTML =
                programs.map(
                    (p) => `

                    <tr data-id="${p.id}">

                        <td>
                            ${escapeHtml(
                                p.title
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                p.category
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                p.level
                            )}
                        </td>

                        <td>
                            ${p.weeks} wks
                        </td>

                        <td>
                            ${escapeHtml(
                                p.coach?.name || '—'
                            )}
                        </td>

                        <td>

                            <div class="fc-row-actions">

                                <button
                                    class="fc-icon-btn danger delete-program"
                                    title="Remove"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </td>

                    </tr>

                `
                ).join('');


            body
                .querySelectorAll(
                    '.delete-program'
                )
                .forEach(
                    (btn) => {

                        btn.addEventListener(
                            'click',
                            async (e) => {

                                const id =
                                    e.target
                                        .closest(
                                            'tr'
                                        )
                                        .dataset.id;


                                if (
                                    !confirm(
                                        'Remove this program?'
                                    )
                                ) {

                                    return;

                                }


                                await apiFetch(
                                    `/admin/programs/${id}`,
                                    {
                                        method:
                                            'DELETE'
                                    }
                                );


                                loadedSections.delete(
                                    'programs'
                                );


                                loadPrograms();

                            }
                        );

                    }
                );


        } catch (error) {

            console.error(
                'Programs Error:',
                error
            );


            body.innerHTML = `
                <tr>
                    <td colspan="6" class="fc-loading">
                        Failed to load programs.
                    </td>
                </tr>
            `;

        }

    }


    /* =========================================================
       ADD PROGRAM
    ========================================================= */

    document
        .getElementById(
            'addProgramBtn'
        )
        .addEventListener(
            'click',
            () => {

                openModal(
                    'New Program',

                    `
                    <div class="fc-field">

                        <label>
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            required
                        >

                    </div>


                    <div class="fc-field-row">

                        <div class="fc-field">

                            <label>
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                placeholder="Hypertrophy"
                                required
                            >

                        </div>


                        <div class="fc-field">

                            <label>
                                Level
                            </label>

                            <input
                                type="text"
                                name="level"
                                placeholder="Advanced"
                                required
                            >

                        </div>

                    </div>


                    <div class="fc-field-row">

                        <div class="fc-field">

                            <label>
                                Weeks
                            </label>

                            <input
                                type="number"
                                name="weeks"
                                value="8"
                                required
                            >

                        </div>


                        <div class="fc-field">

                            <label>
                                Sessions / week
                            </label>

                            <input
                                type="number"
                                name="sessions_per_week"
                                value="4"
                                required
                            >

                        </div>

                    </div>


                    <div class="fc-field">

                        <label>
                            Intensity (0–10)
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            name="intensity"
                            value="9.0"
                            required
                        >

                    </div>


                    <div class="fc-field">

                        <label>
                            Coach ID (optional)
                        </label>

                        <input
                            type="number"
                            name="coach_id"
                        >

                    </div>


                    <div class="fc-field">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="3"
                        ></textarea>

                    </div>
                    `,

                    async (formData) => {

                        const payload =
                            Object.fromEntries(
                                formData
                            );


                        if (
                            !payload.coach_id
                        ) {

                            delete payload.coach_id;

                        }


                        await apiFetch(
                            '/admin/programs',
                            {
                                method:
                                    'POST',

                                body:
                                    JSON.stringify(
                                        payload
                                    ),
                            }
                        );


                        loadedSections.delete(
                            'programs'
                        );


                        loadPrograms();

                    }
                );

            }
        );


    /* =========================================================
       COACHES
    ========================================================= */

    async function loadCoaches() {

        const body =
            document.getElementById(
                'coachesTableBody'
            );


        try {

            const coaches =
                await apiFetch(
                    '/admin/coaches'
                );


            if (!coaches) return;


            if (!coaches.length) {

                body.innerHTML = `
                    <tr>
                        <td colspan="4" class="fc-loading">
                            No coaches yet.
                        </td>
                    </tr>
                `;

                return;

            }


            body.innerHTML =
                coaches.map(
                    (c) => `

                    <tr data-id="${c.id}">

                        <td>
                            ${escapeHtml(
                                c.name
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                c.specialty
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                c.whatsapp || '—'
                            )}
                        </td>

                        <td>

                            <div class="fc-row-actions">

                                <button
                                    class="fc-icon-btn danger delete-coach"
                                    title="Remove"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </td>

                    </tr>

                `
                ).join('');


            body
                .querySelectorAll(
                    '.delete-coach'
                )
                .forEach(
                    (btn) => {

                        btn.addEventListener(
                            'click',
                            async (e) => {

                                const id =
                                    e.target
                                        .closest(
                                            'tr'
                                        )
                                        .dataset.id;


                                if (
                                    !confirm(
                                        'Remove this coach?'
                                    )
                                ) {

                                    return;

                                }


                                await apiFetch(
                                    `/admin/coaches/${id}`,
                                    {
                                        method:
                                            'DELETE'
                                    }
                                );


                                loadedSections.delete(
                                    'coaches'
                                );


                                loadCoaches();

                            }
                        );

                    }
                );


        } catch (error) {

            console.error(
                'Coaches Error:',
                error
            );


            body.innerHTML = `
                <tr>
                    <td colspan="4" class="fc-loading">
                        Failed to load coaches.
                    </td>
                </tr>
            `;

        }

    }


    /* =========================================================
       ADD COACH
    ========================================================= */

    document
        .getElementById(
            'addCoachBtn'
        )
        .addEventListener(
            'click',
            () => {

                openModal(
                    'New Coach',

                    `
                    <div class="fc-field">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            required
                        >

                    </div>


                    <div class="fc-field">

                        <label>
                            Specialty
                        </label>

                        <input
                            type="text"
                            name="specialty"
                            placeholder="Hypertrophy & Biomechanics"
                            required
                        >

                    </div>


                    <div class="fc-field">

                        <label>
                            WhatsApp number
                        </label>

                        <input
                            type="text"
                            name="whatsapp"
                            placeholder="201095527920"
                        >

                    </div>


                    <div class="fc-field">

                        <label>
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            rows="3"
                        ></textarea>

                    </div>
                    `,

                    async (formData) => {

                        await apiFetch(
                            '/admin/coaches',
                            {
                                method:
                                    'POST',

                                body:
                                    JSON.stringify(
                                        Object.fromEntries(
                                            formData
                                        )
                                    ),
                            }
                        );


                        loadedSections.delete(
                            'coaches'
                        );


                        loadCoaches();

                    }
                );

            }
        );


    /* =========================================================
       MODAL HELPERS
    ========================================================= */

    const modalOverlay =
        document.getElementById(
            'fcModalOverlay'
        );


    const modalTitle =
        document.getElementById(
            'fcModalTitle'
        );


    const modalForm =
        document.getElementById(
            'fcModalForm'
        );


    function openModal(
        title,
        fieldsHtml,
        onSubmit
    ) {

        modalTitle.textContent =
            title;


        modalForm.innerHTML =
            fieldsHtml +
            `
                <button
                    type="submit"
                    class="fc-modal-submit"
                >
                    Save
                </button>
            `;


        modalForm.onsubmit =
            async (e) => {

                e.preventDefault();


                try {

                    await onSubmit(
                        new FormData(
                            modalForm
                        )
                    );


                    closeModal();

                } catch (error) {

                    alert(
                        error.message ||
                        'Something went wrong.'
                    );

                }

            };


        modalOverlay.classList.add(
            'show'
        );

    }


    function closeModal() {

        modalOverlay.classList.remove(
            'show'
        );

    }


    document
        .getElementById(
            'fcModalClose'
        )
        .addEventListener(
            'click',
            closeModal
        );


    modalOverlay.addEventListener(
        'click',
        (e) => {

            if (
                e.target ===
                modalOverlay
            ) {

                closeModal();

            }

        }
    );


    /* =========================================================
       UTILS
    ========================================================= */

    function escapeHtml(str) {

        if (
            str === null ||
            str === undefined
        ) {

            return '';

        }


        return String(str)

            .replace(
                /&/g,
                '&amp;'
            )

            .replace(
                /</g,
                '&lt;'
            )

            .replace(
                />/g,
                '&gt;'
            )

            .replace(
                /"/g,
                '&quot;'
            )

            .replace(
                /'/g,
                '&#039;'
            );

    }


    function formatDate(dateStr) {

        if (!dateStr) {

            return '—';

        }


        const date =
            new Date(dateStr);


        return date.toLocaleDateString(
            'en-GB',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }
        );

    }


    /* =========================================================
       ATHLETE PROFILE
    ========================================================= */

    async function loadProfile() {

        const profile =
            await apiFetch(
                '/athlete/profile'
            );


        if (!profile) {

            return;

        }


        document.getElementById(
            'profileName'
        ).textContent =
            profile.name || '—';


        document.getElementById(
            'profileEmail'
        ).textContent =
            profile.email || '—';


        document.getElementById(
            'profilePhone'
        ).textContent =
            profile.phone || '—';


        document.getElementById(
            'profileJoined'
        ).textContent =
            formatDate(
                profile.created_at
            );


        if (profile.avatar) {

            profilePhoto.src =
                profile.avatar;


            profilePhoto.style.display =
                'block';


            profilePhotoIcon.style.display =
                'none';

        }

    }


    /* =========================================================
       AVATAR UPLOAD + PHONE EDIT
    ========================================================= */

    const avatarInput =
        document.getElementById(
            'avatarInput'
        );


    const changePhotoBtn =
        document.getElementById(
            'changePhotoBtn'
        );


    const profilePhoto =
        document.getElementById(
            'profilePhoto'
        );


    const profilePhotoIcon =
        document.getElementById(
            'profilePhotoIcon'
        );


    const editPhoneBtn =
        document.getElementById(
            'editPhoneBtn'
        );


    if (changePhotoBtn) {

        changePhotoBtn.addEventListener(
            'click',
            () => {

                if (avatarInput) {

                    avatarInput.click();

                }

            }
        );

    }


    if (avatarInput) {

        avatarInput.addEventListener(
            'change',
            async () => {

                const file =
                    avatarInput.files[0];


                if (!file) {

                    return;

                }


                const formData =
                    new FormData();


                formData.append(
                    'avatar',
                    file
                );


                const response =
                    await fetch(
                        `${API_BASE}/athlete/profile`,
                        {

                            method:
                                'POST',

                            headers: {

                                'Authorization':
                                    `Bearer ${token}`

                            },

                            body:
                                formData,

                        }
                    );


                const data =
                    await response
                        .json()
                        .catch(
                            () => null
                        );


                if (
                    response.ok &&
                    data &&
                    data.avatar
                ) {

                    profilePhoto.src =
                        data.avatar;


                    profilePhoto.style.display =
                        'block';


                    profilePhotoIcon.style.display =
                        'none';

                } else {

                    alert(
                        data?.message ||
                        'Could not upload photo.'
                    );

                }

            }
        );

    }


    if (editPhoneBtn) {

        editPhoneBtn.addEventListener(
            'click',
            async () => {

                const newPhone =
                    prompt(
                        'اكتبي رقم التليفون:'
                    );


                if (
                    newPhone === null
                ) {

                    return;

                }


                const response =
                    await fetch(
                        `${API_BASE}/athlete/profile`,
                        {

                            method:
                                'POST',

                            headers: {

                                'Authorization':
                                    `Bearer ${token}`,

                                'Content-Type':
                                    'application/json',

                                'Accept':
                                    'application/json',

                            },

                            body:
                                JSON.stringify({
                                    phone:
                                        newPhone
                                }),

                        }
                    );


                const data =
                    await response
                        .json()
                        .catch(
                            () => null
                        );


                if (
                    response.ok &&
                    data
                ) {

                    document.getElementById(
                        'profilePhone'
                    ).textContent =
                        data.phone || '—';

                } else {

                    alert(
                        data?.message ||
                        'Could not update phone.'
                    );

                }

            }
        );

    }


    /* =========================================================
       INITIAL LOAD
    ========================================================= */

    loadSection('overview');

    updateContactMessagesBadge();

});