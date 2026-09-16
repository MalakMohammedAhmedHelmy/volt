document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       NAV GROUP
    ========================================================= */

    function setupNavGroup(groupSelector) {

        const group = document.querySelector(groupSelector);

        if (!group) return;

        const links = group.querySelectorAll('a');

        links.forEach((link) => {

            link.addEventListener('click', (e) => {

                group.querySelectorAll('li').forEach((li) => {
                    li.classList.remove('active');
                });

                link.parentElement.classList.add('active');

                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {

                    const target =
                        document.getElementById(
                            href.slice(1)
                        );

                    if (target) {

                        e.preventDefault();

                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        history.pushState(
                            null,
                            '',
                            href
                        );

                    }

                }

            });

        });

    }

    setupNavGroup('.nav-store');


    /* =========================================================
       PROGRAMS FILTER
    ========================================================= */

    function setupProgramsFilter() {

        const navProgramsList =
            document.querySelector('.nav-programs');

        if (!navProgramsList) return;

        const filterLinks =
            navProgramsList.querySelectorAll('a');

        const programCards =
            document.querySelectorAll('.card-prog');

        const programsSection =
            document.getElementById('PROGRAMS');

        filterLinks.forEach((link) => {

            link.addEventListener('click', (e) => {

                e.preventDefault();

                navProgramsList
                    .querySelectorAll('li')
                    .forEach((li) => {
                        li.classList.remove('active');
                    });

                link.parentElement.classList.add('active');

                const href = link.getAttribute('href');

                if (!href) return;

                const category = href.slice(1);

                programCards.forEach((card) => {

                    const matches =
                        category === 'PROGRAMS' ||
                        card.dataset.category === category;

                    card.style.display =
                        matches ? '' : 'none';

                });

                if (programsSection) {

                    programsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                }

                history.pushState(
                    null,
                    '',
                    href
                );

            });

        });

    }

    setupProgramsFilter();


    /* =========================================================
       MEMBERSHIPS TOGGLE
    ========================================================= */

    function setupMembershipsToggle() {

        const navMemberList =
            document.querySelector('.nav-member');

        if (!navMemberList) return;

        const toggleLinks =
            navMemberList.querySelectorAll('a');

        const priceBoxes =
            document.querySelectorAll('.member-price');

        toggleLinks.forEach((link) => {

            link.addEventListener('click', (e) => {

                e.preventDefault();

                navMemberList
                    .querySelectorAll('li')
                    .forEach((li) => {
                        li.classList.remove('active');
                    });

                link.parentElement.classList.add('active');

                const href =
                    link.getAttribute('href');

                const showTerm =
                    href === '#Term Commitment';

                priceBoxes.forEach((box) => {

                    const priceEl =
                        box.querySelector('.price-monthly');

                    const textEl =
                        box.querySelector('.price-text');

                    if (showTerm) {

                        if (
                            box.dataset.termPrice &&
                            priceEl
                        ) {

                            priceEl.textContent =
                                box.dataset.termPrice;

                        }

                        if (
                            box.dataset.termText &&
                            textEl
                        ) {

                            textEl.textContent =
                                box.dataset.termText;

                        }

                    } else {

                        if (
                            box.dataset.monthlyPrice &&
                            priceEl
                        ) {

                            priceEl.textContent =
                                box.dataset.monthlyPrice;

                        }

                        if (
                            box.dataset.monthlyText &&
                            textEl
                        ) {

                            textEl.textContent =
                                box.dataset.monthlyText;

                        }

                    }

                });

                if (href) {

                    history.pushState(
                        null,
                        '',
                        href
                    );

                }

            });

        });

    }

    setupMembershipsToggle();


    /* =========================================================
       MAIN NAVIGATION
    ========================================================= */

    const mainNavLinks =
        document.querySelectorAll('.nav-links a');

    const mainSections =
        Array.from(mainNavLinks)
            .map((link) => {

                const href =
                    link.getAttribute('href');

                if (!href || !href.startsWith('#')) {
                    return null;
                }

                return document.querySelector(href);

            })
            .filter(Boolean);


    function highlightMainNav() {

        const scrollPos =
            window.scrollY + 140;

        let current =
            mainSections[0];

        mainSections.forEach((section) => {

            if (section.offsetTop <= scrollPos) {
                current = section;
            }

        });

        mainNavLinks.forEach((link) => {

            link.classList.remove(
                'active-link'
            );

            if (
                current &&
                link.getAttribute('href') ===
                `#${current.id}`
            ) {

                link.classList.add(
                    'active-link'
                );

            }

        });

    }


    mainNavLinks.forEach((link) => {

        link.addEventListener('click', (e) => {

            const targetId =
                link.getAttribute('href');

            if (
                !targetId ||
                !targetId.startsWith('#')
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                history.pushState(
                    null,
                    '',
                    targetId
                );

                const navLinksList =
                    document.querySelector(
                        '.nav-links'
                    );

                if (navLinksList) {

                    navLinksList.classList.remove(
                        'show-mobile'
                    );

                }

            }

        });

    });


    window.addEventListener(
        'scroll',
        highlightMainNav
    );

    highlightMainNav();


    /* =========================================================
       SIGNUP API
    ========================================================= */

    const signupForm =
        document.getElementById('signupForm');

    if (signupForm) {

        signupForm.addEventListener(
            'submit',
            async (e) => {

                e.preventDefault();

                const name =
                    document.getElementById('name')
                        .value.trim();

                const email =
                    document.getElementById('email')
                        .value.trim();

                const password =
                    document.getElementById('password')
                        .value;

                const confirmPassword =
                    document.getElementById('confirm_password')
                        .value;


                if (password !== confirmPassword) {

                    alert(
                        'Passwords do not match'
                    );

                    return;

                }


                try {

                    const response =
                        await fetch(
                            'http://127.0.0.1:8000/api/register',
                            {
                                method: 'POST',

                                headers: {
                                    'Content-Type':
                                        'application/json',

                                    'Accept':
                                        'application/json'
                                },

                                body: JSON.stringify({
                                    name: name,
                                    email: email,
                                    password: password
                                })
                            }
                        );


                    const data =
                        await response.json();


                    if (response.ok) {

                        alert(
                            data.message ||
                            'Account created successfully'
                        );

                        window.location.href =
                            './login.html';

                        return;

                    }


                    let errorMessage =
                        data.message ||
                        'Registration failed';


                    if (data.errors) {

                        const firstError =
                            Object.values(
                                data.errors
                            )[0];

                        if (
                            Array.isArray(firstError)
                        ) {

                            errorMessage =
                                firstError[0];

                        }

                    }


                    alert(errorMessage);

                }

                catch (error) {

                    console.error(error);

                    alert(
                        'Cannot connect to Laravel server'
                    );

                }

            }
        );

    }


    /* =========================================================
       LOGIN API
    ========================================================= */

    const loginForm =
        document.getElementById('loginForm');

    if (loginForm) {

        loginForm.addEventListener(
            'submit',
            async (e) => {

                e.preventDefault();

                const email =
                    document.getElementById('email')
                        .value.trim();

                const password =
                    document.getElementById('password')
                        .value;


                try {

                    const response =
                        await fetch(
                            'http://127.0.0.1:8000/api/login',
                            {
                                method: 'POST',

                                headers: {
                                    'Content-Type':
                                        'application/json',

                                    'Accept':
                                        'application/json'
                                },

                                body: JSON.stringify({
                                    email: email,
                                    password: password
                                })
                            }
                        );


                    const data =
                        await response.json();


                    if (response.ok) {

                        localStorage.setItem(
                            'token',
                            data.token
                        );

                        localStorage.setItem(
                            'user',
                            JSON.stringify(data.user)
                        );

                        alert(
                            data.message ||
                            'تم تسجيل الدخول بنجاح'
                        );

                        window.location.href =
                            './index.html';

                        return;

                    }


                    alert(
                        data.message ||
                        'البريد الإلكتروني أو كلمة المرور غير صحيحة'
                    );

                }

                catch (error) {

                    console.error(error);

                    alert(
                        'Cannot connect to Laravel server'
                    );

                }

            }
        );

    }


    /* =========================================================
       USER PROFILE DROPDOWN
    ========================================================= */

    const userProfile =
        document.getElementById('userProfile');

    const userIcon =
        document.getElementById('userIcon');

    const profileDropdown =
        document.getElementById('profileDropdown');

    const userInitial =
        document.getElementById('userInitial');

            const userIconImg =
        document.getElementById('userIconImg');

    const profileAvatarImg =
        document.getElementById('profileAvatarImg');

    const navAvatarInput =
        document.getElementById('navAvatarInput');

    const profileAvatar =
        document.getElementById('profileAvatar');

    const profileName =
        document.getElementById('profileName');

    const profileEmail =
        document.getElementById('profileEmail');

    const logoutBtn =
        document.getElementById('logoutBtn');


    if (
        userProfile &&
        userIcon &&
        profileDropdown
    ) {

        const savedUser =
            localStorage.getItem('user');

        const token =
            localStorage.getItem('token');


        if (savedUser && token) {

            try {

                const user =
                    JSON.parse(savedUser);


                if (user.name) {

                    const firstLetter =
                        user.name
                            .trim()
                            .charAt(0)
                            .toUpperCase();


                    if (userInitial) {
                        userInitial.textContent =
                            firstLetter;
                    }

                      if (user.avatar) {

                    if (userIconImg) {
                        userIconImg.src = user.avatar;
                        userIconImg.style.display = 'block';
                        if (userInitial) userInitial.style.display = 'none';
                    }

                    if (profileAvatarImg) {
                        profileAvatarImg.src = user.avatar;
                        profileAvatarImg.style.display = 'block';
                        const icon = document.getElementById('profileAvatarIcon');
                        if (icon) icon.style.display = 'none';
                    }

                }

                    if (profileAvatar) {
                        profileAvatar.textContent =
                            firstLetter;
                    }

                }


                if (user.name && profileName) {
                    profileName.textContent =
                        user.name;
                }


                if (user.email && profileEmail) {
                    profileEmail.textContent =
                        user.email;
                }

            }

            catch (error) {

                console.error(
                    'Error loading user:',
                    error
                );

            }

        }

                else {

            if (userInitial) {

                userInitial.innerHTML =
                    '<i class="fa-solid fa-user"></i>';

            }

            if (profileAvatar) {

                profileAvatar.innerHTML =
                    '<i class="fa-solid fa-user"></i>';

            }

            if (profileName) {
                profileName.textContent = 'Guest';
            }

            if (profileEmail) {
                profileEmail.textContent = '';
            }

        }


        const myProfileBtn =
            document.getElementById('myProfileBtn');

        if (myProfileBtn) {

            myProfileBtn.addEventListener(
                'click',
                () => {

                    if (savedUser && token) {

                        window.location.href =
                            './athlete-dashboard.html';

                    } else {

                        window.location.href =
                            './login.html';

                    }

                }
            );

        }

                if (profileAvatar && navAvatarInput && token) {

            profileAvatar.addEventListener('click', (e) => {

                e.stopPropagation();
                navAvatarInput.click();

            });

            navAvatarInput.addEventListener('change', async () => {

                const file = navAvatarInput.files[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('avatar', file);

                try {

                    const response = await fetch(
                        'http://127.0.0.1:8000/api/athlete/profile',
                        {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}` },
                            body: formData,
                        }
                    );

                    const data = await response.json().catch(() => null);

                    if (response.ok && data && data.avatar) {

                        if (userIconImg) {
                            userIconImg.src = data.avatar;
                            userIconImg.style.display = 'block';
                            if (userInitial) userInitial.style.display = 'none';
                        }

                        if (profileAvatarImg) {
                            profileAvatarImg.src = data.avatar;
                            profileAvatarImg.style.display = 'block';
                            const icon = document.getElementById('profileAvatarIcon');
                            if (icon) icon.style.display = 'none';
                        }

                        const updatedUser = JSON.parse(
                            localStorage.getItem('user') || '{}'
                        );

                        updatedUser.avatar = data.avatar;

                        localStorage.setItem(
                            'user',
                            JSON.stringify(updatedUser)
                        );

                    } else {

                        alert(data?.message || 'Could not upload photo.');

                    }

                } catch (error) {

                    console.error(error);
                    alert('Cannot connect to server.');

                }

            });

        }

        userIcon.addEventListener(
            'click',
            (e) => {

                e.stopPropagation();

                profileDropdown.classList.toggle(
                    'show'
                );

            }
        );


        document.addEventListener(
            'click',
            (e) => {

                if (
                    !userProfile.contains(e.target)
                ) {

                    profileDropdown.classList.remove(
                        'show'
                    );

                }

            }
        );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                'click',
                () => {

                    localStorage.removeItem('token');

                    localStorage.removeItem('user');

                    window.location.href =
                        './login.html';

                }
            );

        }

    }


    /* =========================================================
       DEMO PAYMENT FLOW
    ========================================================= */

    let selectedMembership = null;
let deliveryInfo = null;
let checkoutType = null; // 'membership' or 'cart'

    /* =========================================================
       PAYMENT CSS
    ========================================================= */

    const paymentStyle =
        document.createElement('style');

    paymentStyle.textContent = `

        .demo-payment-overlay {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.78);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            padding: 20px;
            box-sizing: border-box;
        }

        .demo-payment-overlay.show {
            display: flex;
        }

        .demo-payment-box {
            width: 100%;
            max-width: 480px;
            max-height: 90vh;
            overflow-y: auto;
            background: #111;
            color: #fff;
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 20px;
            padding: 30px;
            box-sizing: border-box;
            position: relative;
            box-shadow: 0 20px 70px rgba(0,0,0,.6);
        }

        .demo-payment-close {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 38px;
            height: 38px;
            border: none;
            border-radius: 50%;
            background: #222;
            color: #fff;
            cursor: pointer;
            font-size: 18px;
        }

        .demo-payment-logo {
            text-align: center;
            font-weight: 800;
            letter-spacing: 1px;
            margin-bottom: 25px;
            font-size: 18px;
        }

        .demo-payment-logo i {
            margin-right: 6px;
        }

        .demo-payment-box h2 {
            text-align: center;
            margin: 0 0 8px;
        }

        .demo-payment-subtitle {
            text-align: center;
            opacity: .7;
            margin-bottom: 22px;
        }

        .demo-selected-plan {
            background: #1c1c1c;
            border-radius: 14px;
            padding: 18px;
            margin-bottom: 20px;
            border: 1px solid rgba(255,255,255,.08);
        }

        .demo-selected-plan span {
            display: block;
            font-size: 11px;
            opacity: .55;
            margin-bottom: 7px;
            letter-spacing: 1px;
        }

        .demo-selected-plan strong {
            display: block;
            font-size: 18px;
            margin-bottom: 7px;
        }

        .demo-selected-plan b {
            font-size: 20px;
        }

        .demo-payment-methods {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .demo-method {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 17px;
            background: #1a1a1a;
            color: #fff;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 13px;
            cursor: pointer;
            text-align: left;
        }

        .demo-method:hover {
            background: #242424;
        }

        .demo-method > i:first-child {
            font-size: 22px;
            width: 28px;
        }

        .demo-method div {
            flex: 1;
        }

        .demo-method strong,
        .demo-method small {
            display: block;
        }

        .demo-method small {
            opacity: .55;
            margin-top: 4px;
        }

        .demo-note {
            display: block;
            text-align: center;
            opacity: .55;
            margin-top: 18px;
            line-height: 1.5;
        }

        .demo-payment-box label {
            display: block;
            margin: 14px 0 7px;
            font-size: 13px;
        }

        .demo-payment-box input {
            width: 100%;
            box-sizing: border-box;
            padding: 14px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,.15);
            background: #1b1b1b;
            color: #fff;
            outline: none;
            font-size: 15px;
        }

        .demo-payment-box input:focus {
            border-color: #888;
        }

        .demo-pay-btn {
            width: 100%;
            margin-top: 20px;
            padding: 15px;
            border: none;
            border-radius: 10px;
            background: #fff;
            color: #000;
            font-weight: 800;
            cursor: pointer;
            font-size: 14px;
        }

        .demo-pay-btn:hover {
            opacity: .88;
        }

        .demo-back-btn {
            border: none;
            background: transparent;
            color: #fff;
            cursor: pointer;
            padding: 0;
            margin-bottom: 20px;
            opacity: .7;
        }

        .demo-card-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .payment-success {
            text-align: center;
            padding: 15px 0;
        }

        .success-icon {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: #fff;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 30px;
        }

        .success-plan {
            background: #1c1c1c;
            padding: 14px;
            border-radius: 10px;
            margin-top: 20px;
            font-weight: 700;
        }

        .otp-icon {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background: #222;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 18px;
            font-size: 25px;
        }

        .demo-otp {
            text-align: center;
        }

        @media (max-width: 500px) {

            .demo-payment-box {
                padding: 22px;
            }

            .demo-card-row {
                grid-template-columns: 1fr;
            }

        }

    `;

    document.head.appendChild(paymentStyle);


    /* =========================================================
       CREATE PAYMENT MODAL
    ========================================================= */

    const demoPayment =
        document.createElement('div');

    demoPayment.innerHTML = `

        <div
            class="demo-payment-overlay"
            id="demoPaymentOverlay"
        >

            <div class="demo-payment-box">

                <button
                    type="button"
                    class="demo-payment-close"
                    id="demoPaymentClose"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div id="demoPaymentContent"></div>

            </div>

        </div>

    `;


    document.body.appendChild(demoPayment);


    /* =========================================================
       PAYMENT ELEMENTS
    ========================================================= */

    const demoOverlay =
        document.getElementById('demoPaymentOverlay');

    const demoClose =
        document.getElementById('demoPaymentClose');

    const demoPaymentContent =
        document.getElementById('demoPaymentContent');


    /* =========================================================
       SUBSCRIBE BUTTONS
    ========================================================= */

    const subscribeButtons =
        document.querySelectorAll(
            '.card-member .card-footer-member button'
        );


    subscribeButtons.forEach((button) => {

        button.addEventListener(
            'click',
            function () {

                const card =
                    this.closest('.card-member');

                if (!card) return;


                const plan =
                    card.querySelector('.member-plan');

                const price =
                    card.querySelector('.price-monthly');

                const priceText =
                    card.querySelector('.price-text');


                selectedMembership = {

                    name:
                        plan
                            ? plan.textContent.trim()
                            : 'Membership',

                    price:
                        price
                            ? price.textContent.trim()
                            : '',

                    priceText:
                        priceText
                            ? priceText.textContent.trim()
                            : ''

                };

                checkoutType = 'membership';
                showPaymentStart();

            }
        );

    });


    /* =========================================================
       SHOW PAYMENT START
    ========================================================= */

    function showPaymentStart() {

        demoPaymentContent.innerHTML = `

        function closeDemoPayment() {
    demoOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

if (demoClose) {
    demoClose.addEventListener('click', closeDemoPayment);
}
            <div class="demo-payment-logo">
                <i class="fa-solid fa-bolt"></i>
                VOLT FITNESS
            </div>

            <h2>
                Complete Your Membership
            </h2>

            <p class="demo-payment-subtitle">
                Choose your payment method
            </p>

            <div class="demo-selected-plan">

                <span>
                    SELECTED MEMBERSHIP
                </span>

                <strong>
                    ${selectedMembership?.name || 'Membership'}
                </strong>

                <b>
                    ${selectedMembership?.price || ''}
                    ${selectedMembership?.priceText || ''}
                </b>

            </div>

            <div class="demo-payment-methods">

                <button
                    type="button"
                    class="demo-method"
                    id="demoWalletMethod"
                >

                    <i class="fa-solid fa-mobile-screen-button"></i>

                    <div>

                        <strong>
                            Mobile Wallet
                        </strong>

                        <small>
                            Vodafone Cash
                        </small>

                    </div>

                    <i class="fa-solid fa-chevron-right"></i>

                </button>


                <button
                    type="button"
                    class="demo-method"
                    id="demoCardMethod"
                >

                    <i class="fa-solid fa-credit-card"></i>

                    <div>

                        <strong>
                            Credit / Debit Card
                        </strong>

                        <small>
                            Demo payment
                        </small>

                    </div>

                    <i class="fa-solid fa-chevron-right"></i>

                </button>

            </div>

            <small class="demo-note">
                DEMO MODE — No real payment will be charged.
            </small>

        `;


        demoOverlay.classList.add('show');

        document.body.style.overflow = 'hidden';


        document
            .getElementById('demoWalletMethod')
            .addEventListener(
                'click',
                showWalletPayment
            );


        document
            .getElementById('demoCardMethod')
            .addEventListener(
                'click',
                showCardPayment
            );

    }


    /* =========================================================
       WALLET PAYMENT
    ========================================================= */

    function showWalletPayment() {

        demoPaymentContent.innerHTML = `

            <button
                type="button"
                class="demo-back-btn"
                id="demoBackBtn"
            >
                <i class="fa-solid fa-arrow-left"></i>
                Back
            </button>

            <h2>
                Mobile Wallet Payment
            </h2>

            <p class="demo-payment-subtitle">
                Enter your mobile wallet number
            </p>

            <div class="demo-selected-plan">

                <span>
                    SELECTED MEMBERSHIP
                </span>

                <strong>
                    ${selectedMembership?.name || 'Membership'}
                </strong>

                <b>
                    ${selectedMembership?.price || ''}
                    ${selectedMembership?.priceText || ''}
                </b>

            </div>

            <label for="walletNumber">
                Mobile Wallet Number
            </label>

            <input
                type="tel"
                id="walletNumber"
                maxlength="11"
                inputmode="numeric"
                placeholder="01XXXXXXXXX"
            >

            <button
                type="button"
                class="demo-pay-btn"
                id="demoPayBtn"
            >

                PAY NOW

                <i class="fa-solid fa-arrow-right"></i>

            </button>

            <small class="demo-note">
                Vodafone Cash — Demo payment
            </small>

        `;


        document
            .getElementById('demoBackBtn')
            .addEventListener(
                'click',
                showPaymentStart
            );


        document
            .getElementById('demoPayBtn')
            .addEventListener(
                'click',
                processWalletPayment
            );

    }


    /* =========================================================
       WALLET PAY
    ========================================================= */

    function processWalletPayment() {

        const walletInput =
            document.getElementById('walletNumber');


        const number =
            walletInput
                ? walletInput.value.trim()
                : '';


        if (!/^01[0125][0-9]{8}$/.test(number)) {

            alert(
                'Please enter a valid Egyptian mobile number.'
            );

            return;

        }


        showOTP(number);

    }


    /* =========================================================
       OTP SCREEN
    ========================================================= */

    function showOTP(number) {

        demoPaymentContent.innerHTML = `

            <div class="demo-otp">

                <div class="otp-icon">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>

                <h2>
                    Verify Payment
                </h2>

                <p>
                    A verification code has been sent to
                    <strong>${number}</strong>
                </p>

                <label for="demoOtp">
                    Enter OTP
                </label>

                <input
                    type="text"
                    id="demoOtp"
                    maxlength="6"
                    inputmode="numeric"
                    placeholder="••••••"
                >

                <button
                    type="button"
                    class="demo-pay-btn"
                    id="verifyOtp"
                >

                    VERIFY & PAY

                    <i class="fa-solid fa-lock"></i>

                </button>

                <small class="demo-note">
                    DEMO MODE — Use any 6-digit code.
                </small>

            </div>

        `;


        document
            .getElementById('verifyOtp')
            .addEventListener(
                'click',
                verifyDemoOTP
            );

    }


    /* =========================================================
       VERIFY OTP
    ========================================================= */

    function verifyDemoOTP() {

        const otpInput =
            document.getElementById('demoOtp');


        const otp =
            otpInput
                ? otpInput.value.trim()
                : '';


        if (!/^[0-9]{6}$/.test(otp)) {

            alert(
                'Enter a 6-digit verification code.'
            );

            return;

        }


        showPaymentSuccess();

    }


    /* =========================================================
       SUCCESS
    ========================================================= */

    function showPaymentSuccess() {

    if (checkoutType === 'cart') {

        closeDemoPayment();
        showReceipt();
        return;

    }

    demoPaymentContent.innerHTML = `

        <div class="payment-success">

            <div class="success-icon">
                <i class="fa-solid fa-check"></i>
            </div>

            <h2>Payment Successful!</h2>

            <p>Your membership has been activated successfully.</p>

            <div class="success-plan">
                ${selectedMembership?.name || 'Membership'}
            </div>

            <small class="demo-note">
                DEMO PAYMENT — No real money was charged.
            </small>

            <button type="button" class="demo-pay-btn" id="finishPayment">
                DONE
            </button>

        </div>

    `;

    document
        .getElementById('finishPayment')
        .addEventListener('click', closeDemoPayment);

}
    /* =========================================================
       CARD PAYMENT
    ========================================================= */

    function showCardPayment() {

        demoPaymentContent.innerHTML = `

            <button
                type="button"
                class="demo-back-btn"
                id="demoBackBtn"
            >

                <i class="fa-solid fa-arrow-left"></i>

                Back

            </button>

            <h2>
                Card Payment
            </h2>

            <p class="demo-payment-subtitle">
                Demo credit / debit card payment
            </p>

            <div class="demo-selected-plan">

                <span>
                    SELECTED MEMBERSHIP
                </span>

                <strong>
                    ${selectedMembership?.name || 'Membership'}
                </strong>

                <b>
                    ${selectedMembership?.price || ''}
                    ${selectedMembership?.priceText || ''}
                </b>

            </div>

            <label>
                Card Number
            </label>

            <input
                type="text"
                maxlength="19"
                inputmode="numeric"
                placeholder="0000 0000 0000 0000"
                id="demoCardNumber"
            >

            <label>
                Card Holder Name
            </label>

            <input
                type="text"
                placeholder="CARD HOLDER NAME"
                id="demoCardName"
            >

            <div class="demo-card-row">

                <div>

                    <label>
                        Expiry
                    </label>

                    <input
                        type="text"
                        maxlength="5"
                        placeholder="MM/YY"
                        id="demoExpiry"
                    >

                </div>

                <div>

                    <label>
                        CVV
                    </label>

                    <input
                        type="password"
                        maxlength="3"
                        inputmode="numeric"
                        placeholder="•••"
                        id="demoCVV"
                    >

                </div>

            </div>

            <button
                type="button"
                class="demo-pay-btn"
                id="demoCardPayBtn"
            >

                PAY NOW

                <i class="fa-solid fa-lock"></i>

            </button>

            <small class="demo-note">
                DEMO MODE — No real payment will be charged.
            </small>

        `;


        document
            .getElementById('demoBackBtn')
            .addEventListener(
                'click',
                showPaymentStart
            );


        document
            .getElementById('demoCardPayBtn')
            .addEventListener(
                'click',
                processCardPayment
            );

    }


    /* =========================================================
       CARD PAY
    ========================================================= */

    function processCardPayment() {

        const cardNumberInput =
            document.getElementById('demoCardNumber');

        const cardNameInput =
            document.getElementById('demoCardName');

        const expiryInput =
            document.getElementById('demoExpiry');

        const cvvInput =
            document.getElementById('demoCVV');


        const cardNumber =
            cardNumberInput
                ? cardNumberInput.value.replace(/\s/g, '')
                : '';


        const cardName =
            cardNameInput
                ? cardNameInput.value.trim()
                : '';


        const expiry =
            expiryInput
                ? expiryInput.value.trim()
                : '';


        const cvv =
            cvvInput
                ? cvvInput.value.trim()
                : '';


        if (cardNumber.length < 16) {

            alert(
                'Please enter a valid card number.'
            );

            return;

        }


        if (!cardName) {

            alert(
                'Please enter the card holder name.'
            );

            return;

        }


        if (!/^\d{2}\/\d{2}$/.test(expiry)) {

            alert(
                'Please enter expiry date as MM/YY.'
            );

            return;

        }


        if (!/^\d{3}$/.test(cvv)) {

            alert(
                'Please enter a valid CVV.'
            );

            return;

        }


        showPaymentSuccess();

    }
// ================= MENU PANEL =================

const menuIcon = document.querySelector('.icon-box.menu');
const menuPanel = document.getElementById('menuPanel');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');


// ================= OPEN MENU =================

if (menuIcon && menuPanel && menuOverlay) {

    menuIcon.addEventListener('click', (e) => {

        e.preventDefault();
        e.stopPropagation();

        menuPanel.classList.add('show');
        menuOverlay.classList.add('show');

        document.body.style.overflow = 'hidden';

    });

}


// ================= CLOSE MENU =================

function closeMenu() {

    if (menuPanel) {
        menuPanel.classList.remove('show');
    }

    if (menuOverlay) {
        menuOverlay.classList.remove('show');
    }

    document.body.style.overflow = '';

}


// ================= CLOSE BUTTON =================

if (menuClose) {

    menuClose.addEventListener('click', (e) => {

        e.preventDefault();
        e.stopPropagation();

        closeMenu();

    });

}


// ================= CLICK OVERLAY =================

if (menuOverlay) {

    menuOverlay.addEventListener('click', (e) => {

        e.stopPropagation();

        closeMenu();

    });

}


// ================= ESC =================

document.addEventListener('keydown', (e) => {

    if (e.key === 'Escape') {

        closeMenu();

    }

});


// ================= CONTACT FROM MENU =================

const contactMenuBtn =
    document.getElementById('contactMenuBtn');

if (contactMenuBtn) {

    contactMenuBtn.addEventListener('click', () => {

        closeMenu();

        const contactSection =
            document.getElementById('CONTACT');

        if (contactSection) {

            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

}


// ================= THEME =================

const themeSwitch =
    document.getElementById('themeSwitch');

const themeText =
    document.getElementById('themeText');

const savedTheme =
    localStorage.getItem('voltTheme');

if (savedTheme === 'light') {

    document.body.classList.add('light-mode');

    if (themeText) {
        themeText.textContent = 'Light Mode';
    }

} else {

    if (themeText) {
        themeText.textContent = 'Dark Mode';
    }

}


if (themeSwitch) {

    themeSwitch.addEventListener('click', (e) => {

        e.preventDefault();
        e.stopPropagation();

        document.body.classList.toggle('light-mode');

        const isLight =
            document.body.classList.contains('light-mode');

        if (isLight) {

            localStorage.setItem(
                'voltTheme',
                'light'
            );

            if (themeText) {
                themeText.textContent = 'Light Mode';
            }

        } else {

            localStorage.setItem(
                'voltTheme',
                'dark'
            );

            if (themeText) {
                themeText.textContent = 'Dark Mode';
            }

        }

    });

}


// ================= REVIEWS =================

const reviewsMenuBtn =
    document.getElementById('reviewsMenuBtn');

const reviewsOverlay =
    document.getElementById('reviewsOverlay');

const reviewsClose =
    document.getElementById('reviewsClose');


if (reviewsMenuBtn && reviewsOverlay) {

    reviewsMenuBtn.addEventListener('click', () => {

        closeMenu();

        reviewsOverlay.classList.add('show');

        document.body.style.overflow = 'hidden';

        loadReviews();

    });

}


if (reviewsClose && reviewsOverlay) {

    reviewsClose.addEventListener('click', () => {

        reviewsOverlay.classList.remove('show');

        document.body.style.overflow = '';

    });

}


if (reviewsOverlay) {

    reviewsOverlay.addEventListener('click', (e) => {

        if (e.target === reviewsOverlay) {

            reviewsOverlay.classList.remove('show');

            document.body.style.overflow = '';

        }

    });

}


// ================= SETTINGS =================

const settingsMenuBtn = document.getElementById('settingsMenuBtn');
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsClose = document.getElementById('settingsClose');

const langSwitch = document.getElementById('langSwitch');
const notifSwitch = document.getElementById('notifSwitch');
const soundSwitch = document.getElementById('soundSwitch');
const emailSwitch = document.getElementById('emailSwitch');

const defaultSettings = {
    lang: 'en',
    notifications: false,
    sound: true,
    email: false
};

let voltSettings =
    JSON.parse(localStorage.getItem('voltSettings')) || defaultSettings;

function applySettingsUI() {

    langSwitch.classList.toggle('active', voltSettings.lang === 'ar');
    notifSwitch.classList.toggle('active', voltSettings.notifications);
    soundSwitch.classList.toggle('active', voltSettings.sound);
    emailSwitch.classList.toggle('active', voltSettings.email);

    document.documentElement.setAttribute(
        'dir',
        voltSettings.lang === 'ar' ? 'rtl' : 'ltr'
    );

}

function saveSettings() {
    localStorage.setItem('voltSettings', JSON.stringify(voltSettings));
}

if (settingsMenuBtn && settingsOverlay) {

    settingsMenuBtn.addEventListener('click', () => {

        closeMenu();
        applySettingsUI();

        settingsOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';

    });

}

if (settingsClose && settingsOverlay) {

    settingsClose.addEventListener('click', () => {

        settingsOverlay.classList.remove('show');
        document.body.style.overflow = '';

    });

}

if (settingsOverlay) {

    settingsOverlay.addEventListener('click', (e) => {

        if (e.target === settingsOverlay) {

            settingsOverlay.classList.remove('show');
            document.body.style.overflow = '';

        }

    });

}

if (langSwitch) {

    langSwitch.addEventListener('click', () => {

        voltSettings.lang = voltSettings.lang === 'ar' ? 'en' : 'ar';

        applySettingsUI();
        saveSettings();

    });

}

if (notifSwitch) {

    notifSwitch.addEventListener('click', async () => {

        if (!voltSettings.notifications && 'Notification' in window) {

            const permission = await Notification.requestPermission();

            if (permission !== 'granted') return;

        }

        voltSettings.notifications = !voltSettings.notifications;

        applySettingsUI();
        saveSettings();

    });

}

if (soundSwitch) {

    soundSwitch.addEventListener('click', () => {

        voltSettings.sound = !voltSettings.sound;

        applySettingsUI();
        saveSettings();

    });

}

if (emailSwitch) {

    emailSwitch.addEventListener('click', () => {

        voltSettings.email = !voltSettings.email;

        applySettingsUI();
        saveSettings();

    });

}

applySettingsUI();



// ================= CHOOSE COACH - WHATSAPP =================

document
    .querySelectorAll('.choose-coach')
    .forEach(
        (button) => {

            button.addEventListener(
                'click',
                () => {

                    const whatsapp =
                        button.dataset.whatsapp;

                    const coachName =
                        button.dataset.coach;


                    if (!whatsapp) {

                        return;

                    }


                    const message =
                        encodeURIComponent(
                            `Hello ${coachName}, I would like to choose you as my coach at VOLT FITNESS.`
                        );


                    window.open(
                        `https://wa.me/${whatsapp}?text=${message}`,
                        '_blank'
                    );

                }
            );

        }
    );

    // ================= CONTACT API =================

const contactForm = document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const nameInput =
            document.getElementById('contactName');

        const emailInput =
            document.getElementById('contactEmail');

        const messageInput =
            document.getElementById('contactMessage');

        const submitButton =
            contactForm.querySelector('.contact-submit');


        const name =
            nameInput ? nameInput.value.trim() : '';

        const email =
            emailInput ? emailInput.value.trim() : '';

        const message =
            messageInput ? messageInput.value.trim() : '';


        if (!name || !email || !message) {

            alert('Please fill in all fields.');

            return;

        }


        if (submitButton) {

            submitButton.disabled = true;
            submitButton.innerHTML =
                'SENDING... <i class="fa-solid fa-spinner fa-spin"></i>';

        }


        try {

            const response =
                await fetch(
                    'http://127.0.0.1:8000/api/contact',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            message: message
                        })
                    }
                );


            const data =
                await response.json();


            if (response.ok) {

                alert(
                    data.message ||
                    'Your message has been sent successfully.'
                );

                contactForm.reset();

                return;

            }


            let errorMessage =
                data.message ||
                'Failed to send your message.';


            if (data.errors) {

                const firstError =
                    Object.values(data.errors)[0];

                if (Array.isArray(firstError)) {

                    errorMessage = firstError[0];

                }

            }


            alert(errorMessage);

        }

        catch (error) {

            console.error(
                'Contact Error:',
                error
            );

            alert(
                'Cannot connect to Laravel server.'
            );

        }

        finally {

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    'SEND MESSAGE <i class="fa-solid fa-arrow-right"></i>';

            }

        }

    });

}

// ================= LOGOUT =================

const logoutButtons =
    document.querySelectorAll(
        '.logout-btn'
    );


logoutButtons.forEach(
    (button) => {

        button.addEventListener(
            'click',
            () => {

                localStorage.removeItem(
                    'user'
                );

                localStorage.removeItem(
                    'token'
                );

                window.location.href =
                    './index.html';

            }
        );

    }
);

// ===== PASSWORD SHOW/HIDE TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
    const eyeIcons = document.querySelectorAll('.password-eye');

    eyeIcons.forEach((eye) => {
        const box = eye.closest('.password-box');
        const input = box ? box.querySelector('input') : null;

        if (!input) return;

        eye.addEventListener('click', () => {
            const isHidden = input.type === 'password';

            input.type = isHidden ? 'text' : 'password';

            eye.classList.toggle('fa-eye', !isHidden);
            eye.classList.toggle('fa-eye-slash', isHidden);
        });
    });
});

// ===== GOOGLE SIGN IN =====
async function handleGoogleResponse(response) {

    try {

        const res = await fetch(
            'http://127.0.0.1:8000/api/auth/google',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    credential: response.credential
                })
            }
        );

        const data = await res.json();

        if (res.ok) {

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            window.location.href = './index.html';

            return;

        }

        alert(data.message || 'فشل تسجيل الدخول بجوجل');

    } catch (error) {

        console.error(error);
        alert('Cannot connect to Laravel server');

    }

}

// هنا كان الجزء الناقص اللي بيربط زرار "Continue with Google"
// بمكتبة جوجل ويشغّل handleGoogleResponse فعليًا
window.addEventListener('load', () => {
    if (typeof google === 'undefined') return;

    google.accounts.id.initialize({
        client_id: '846004573058-05lf0u8c39lp72tbngc8ld3k7dp9uvtb.apps.googleusercontent.com',
        callback: handleGoogleResponse
    });

    const googleBtn = document.querySelector('.google-login, .google-signup');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            google.accounts.id.prompt(); // بيفتح نافذة اختيار الحساب
        });
    }
});

// ================= REVIEWS API =================

const reviewsList = document.getElementById('reviewsList');
const submitReviewBtn = document.getElementById('submitReviewBtn');
const reviewInput = document.getElementById('reviewInput');
const reviewMessage = document.getElementById('reviewMessage');

const API_URL = 'http://127.0.0.1:8000/api';


// ================= LOAD REVIEWS =================

async function loadReviews() {

    if (!reviewsList) return;

    reviewsList.innerHTML =
        '<p class="reviews-loading">Loading reviews...</p>';

    try {

        const response = await fetch(`${API_URL}/reviews`);

        if (!response.ok) {
            throw new Error('Failed to load reviews');
        }

        const data = await response.json();

        if (!data.reviews || data.reviews.length === 0) {

            reviewsList.innerHTML =
                '<p class="reviews-loading">No reviews yet. Be the first!</p>';

            return;
        }

        reviewsList.innerHTML = '';

        data.reviews.forEach(review => {

            const userName = review.user?.name || 'VOLT Member';

            const initial =
                userName.charAt(0).toUpperCase();

            const date = review.created_at
                ? new Date(review.created_at).toLocaleDateString()
                : '';

            const reviewElement = document.createElement('div');

            reviewElement.className = 'review-item';

            reviewElement.innerHTML = `
                <div class="review-user">

                    <div class="review-avatar">
                        ${initial}
                    </div>

                    <div>
                        <div class="review-user-name">
                            ${userName}
                        </div>

                        <div class="review-date">
                            ${date}
                        </div>
                    </div>

                </div>

                <div class="review-text">
                    ${review.review}
                </div>
            `;

            reviewsList.appendChild(reviewElement);

        });

    } catch (error) {

        console.error('Reviews Error:', error);

        reviewsList.innerHTML =
            '<p class="reviews-loading">Unable to load reviews.</p>';
    }
}


// ================= SUBMIT REVIEW =================

if (submitReviewBtn) {

    submitReviewBtn.addEventListener('click', async () => {

        const reviewText = reviewInput.value.trim();

        if (!reviewText) {

            reviewMessage.textContent =
                'Please write your review first.';

            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {

            reviewMessage.textContent =
                'Please login first to submit a review.';

            return;
        }

        submitReviewBtn.disabled = true;

        reviewMessage.textContent =
            'Submitting...';

        try {

            const response = await fetch(`${API_URL}/reviews`, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({
                    review: reviewText
                })

            });

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message || 'Failed to submit review'
                );
            }

            reviewInput.value = '';

            reviewMessage.textContent =
                'Review added successfully!';

            await loadReviews();

        } catch (error) {

            console.error('Submit Review Error:', error);

            reviewMessage.textContent =
                error.message || 'Something went wrong.';

        } finally {

            submitReviewBtn.disabled = false;
        }

    });

}


// ================= LOAD WHEN PAGE STARTS =================

loadReviews();

// ================= WISHLIST =================

const WISHLIST_KEY = 'voltWishlist';

function getWishlist() {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function renderWishlist() {

    const list = getWishlist();
    const wishlistList = document.getElementById('wishlistList');
    const wishlistBadge = document.getElementById('wishlistBadge');

    if (!wishlistList || !wishlistBadge) return;

    if (list.length === 0) {

        wishlistList.innerHTML =
            '<p class="wishlist-empty">No favorites yet.</p>';

        wishlistBadge.style.display = 'none';

    } else {

        wishlistBadge.textContent = list.length;
        wishlistBadge.style.display = 'flex';

        wishlistList.innerHTML = list.map((item, index) => `

            <div class="wishlist-item">

                <img src="${item.img}" alt="${item.name}">

                <div>
                    <strong>${item.name}</strong>
                    <span>${item.price}</span>
                </div>

                <button type="button" class="wishlist-remove" data-index="${index}">
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>

        `).join('');

    }

    // Sync heart icons on the store cards
    document.querySelectorAll('.card-store').forEach((card) => {

        const name = card.querySelector('h3')?.textContent.trim();
        const heartIcon = card.querySelector('.icon-box-store i');

        if (!heartIcon || !name) return;

        const isSaved = list.some((item) => item.name === name);

        heartIcon.classList.toggle('fa-regular', !isSaved);
        heartIcon.classList.toggle('fa-solid', isSaved);

    });

}

document.querySelectorAll('.card-store .icon-box-store').forEach((btn) => {

    btn.addEventListener('click', (e) => {

        e.stopPropagation();

        const card = btn.closest('.card-store');
        if (!card) return;

        const name = card.querySelector('h3')?.textContent.trim();
        const price = card.querySelector('.card-footer-store span')?.textContent.trim();
        const img = card.querySelector('img')?.getAttribute('src');

        if (!name) return;

        const list = getWishlist();
        const existingIndex = list.findIndex((item) => item.name === name);

        if (existingIndex > -1) {

            list.splice(existingIndex, 1);

        } else {

            list.push({ name, price, img });

        }

        saveWishlist(list);
        renderWishlist();

    });

});

const wishlistWrapper = document.getElementById('wishlistWrapper');
const navHeartIcon = document.getElementById('navHeartIcon');
const wishlistDropdown = document.getElementById('wishlistDropdown');

if (navHeartIcon && wishlistDropdown && wishlistWrapper) {

    navHeartIcon.addEventListener('click', (e) => {

        e.stopPropagation();

        wishlistDropdown.classList.toggle('show');

    });

    document.addEventListener('click', (e) => {

        if (!wishlistWrapper.contains(e.target)) {

            wishlistDropdown.classList.remove('show');

        }

    });

}

if (wishlistDropdown) {

    wishlistDropdown.addEventListener('click', (e) => {

        const removeBtn = e.target.closest('.wishlist-remove');

        if (!removeBtn) return;

        const index = Number(removeBtn.dataset.index);

        const list = getWishlist();

        list.splice(index, 1);

        saveWishlist(list);
        renderWishlist();

    });

}

renderWishlist();
// ================= CART SYSTEM =================

const CART_KEY = 'voltCart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartTotal(cart) {
    return cart.reduce((sum, item) => sum + (item.priceValue * item.qty), 0);
}

function renderCart() {

    const cart = getCart();

    const cartList = document.getElementById('cartList');
    const cartSummary = document.getElementById('cartSummary');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const menuCartBadge = document.getElementById('menuCartBadge');

    if (!cartList) return;

    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

    if (menuCartBadge) {

        if (itemCount > 0) {
            menuCartBadge.textContent = itemCount;
            menuCartBadge.style.display = 'flex';
        } else {
            menuCartBadge.style.display = 'none';
        }

    }

    if (cart.length === 0) {

        cartList.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        if (cartSummary) cartSummary.style.display = 'none';
        return;

    }

    cartList.innerHTML = cart.map((item, index) => `

        <div class="cart-item">

            <img src="${item.img}" alt="${item.name}">

            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span>$${item.priceValue.toFixed(2)}</span>
            </div>

            <div class="cart-qty">
                <button type="button" class="cart-decrease" data-index="${index}">-</button>
                <span>${item.qty}</span>
                <button type="button" class="cart-increase" data-index="${index}">+</button>
            </div>

            <button type="button" class="cart-remove" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>

    `).join('');

    if (cartSummary) {
        cartSummary.style.display = 'block';
        cartTotalPrice.textContent = `$${getCartTotal(cart).toFixed(2)}`;
    }

}


// ---- Add to cart from Store "+ ADD" buttons ----

document.querySelectorAll('.card-store').forEach((card) => {

    const addBtn = card.querySelector('.card-footer-store button');

    if (!addBtn) return;

    addBtn.addEventListener('click', () => {

        const name = card.querySelector('h3')?.textContent.trim();
        const priceText = card.querySelector('.card-footer-store span')?.textContent.trim() || '$0';
        const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
        const img = card.querySelector('img')?.getAttribute('src');

        if (!name) return;

        const cart = getCart();
        const existing = cart.find((item) => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, priceValue, img, qty: 1 });
        }

        saveCart(cart);
        renderCart();

        addBtn.textContent = 'ADDED ✓';
        setTimeout(() => { addBtn.textContent = '+ ADD'; }, 1000);

    });

});


// ---- Cart quantity / remove handlers ----

const cartListEl = document.getElementById('cartList');

if (cartListEl) {

    cartListEl.addEventListener('click', (e) => {

        const increaseBtn = e.target.closest('.cart-increase');
        const decreaseBtn = e.target.closest('.cart-decrease');
        const removeBtn = e.target.closest('.cart-remove');

        const cart = getCart();

        if (increaseBtn) {
            const index = Number(increaseBtn.dataset.index);
            cart[index].qty += 1;
            saveCart(cart);
            renderCart();
        }

        if (decreaseBtn) {
            const index = Number(decreaseBtn.dataset.index);
            if (cart[index].qty > 1) {
                cart[index].qty -= 1;
            } else {
                cart.splice(index, 1);
            }
            saveCart(cart);
            renderCart();
        }

        if (removeBtn) {
            const index = Number(removeBtn.dataset.index);
            cart.splice(index, 1);
            saveCart(cart);
            renderCart();
        }

    });

}


// ---- Open / close cart overlay ----

const cartMenuBtn = document.getElementById('cartMenuBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');

if (cartMenuBtn && cartOverlay) {

    cartMenuBtn.addEventListener('click', () => {

        closeMenu();
        renderCart();

        cartOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';

    });

}

if (cartClose && cartOverlay) {

    cartClose.addEventListener('click', () => {
        cartOverlay.classList.remove('show');
        document.body.style.overflow = '';
    });

}

if (cartOverlay) {

    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

}


// ---- Proceed to checkout -> Delivery form ----

const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
const deliveryOverlay = document.getElementById('deliveryOverlay');
const deliveryClose = document.getElementById('deliveryClose');
const deliveryForm = document.getElementById('deliveryForm');

if (cartCheckoutBtn && deliveryOverlay) {

    cartCheckoutBtn.addEventListener('click', () => {

        const cart = getCart();
        if (cart.length === 0) return;

        cartOverlay.classList.remove('show');

        deliveryOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';

    });

}

if (deliveryClose && deliveryOverlay) {

    deliveryClose.addEventListener('click', () => {
        deliveryOverlay.classList.remove('show');
        document.body.style.overflow = '';
    });

}

if (deliveryForm) {

    deliveryForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const name = document.getElementById('deliveryName').value.trim();
        const phone = document.getElementById('deliveryPhone').value.trim();
        const address = document.getElementById('deliveryAddress').value.trim();
        const note = document.getElementById('deliveryNote').value.trim();

        if (!/^01[0125][0-9]{8}$/.test(phone)) {
            alert('Please enter a valid Egyptian mobile number.');
            return;
        }

        deliveryInfo = { name, phone, address, note };

        const cart = getCart();

        selectedMembership = {
            name: `VOLT Store Order (${cart.reduce((s, i) => s + i.qty, 0)} items)`,
            price: `$${getCartTotal(cart).toFixed(2)}`,
            priceText: ''
        };

        checkoutType = 'cart';

        deliveryOverlay.classList.remove('show');

        showPaymentStart();

    });

}


// ---- Receipt after successful cart payment ----

function showReceipt() {

    const cart = getCart();
    const total = getCartTotal(cart);

    const receiptBox = document.getElementById('receiptBox');
    const receiptOverlayEl = document.getElementById('receiptOverlay');

    if (!receiptBox || !receiptOverlayEl || !deliveryInfo) return;

    const itemsHtml = cart.map((item) => `
        <div class="receipt-row">
            <span>${item.name} × ${item.qty}</span>
            <span>$${(item.priceValue * item.qty).toFixed(2)}</span>
        </div>
    `).join('');

    receiptBox.innerHTML = `

        <div class="receipt-row"><span>Name</span><span>${deliveryInfo.name}</span></div>
        <div class="receipt-row"><span>Phone</span><span>${deliveryInfo.phone}</span></div>
        <div class="receipt-row"><span>Address</span><span>${deliveryInfo.address}</span></div>
        ${deliveryInfo.note ? `<div class="receipt-row"><span>Note</span><span>${deliveryInfo.note}</span></div>` : ''}

        <div class="receipt-items-title">Order Items</div>

        ${itemsHtml}

        <div class="receipt-row"><span>Total</span><span>$${total.toFixed(2)}</span></div>

    `;

    receiptOverlayEl.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Clear cart after successful order
    saveCart([]);
    renderCart();

}

const receiptClose = document.getElementById('receiptClose');
const receiptDoneBtn = document.getElementById('receiptDoneBtn');
const receiptOverlay = document.getElementById('receiptOverlay');

function closeReceipt() {
    if (receiptOverlay) receiptOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

if (receiptClose) receiptClose.addEventListener('click', closeReceipt);
if (receiptDoneBtn) receiptDoneBtn.addEventListener('click', closeReceipt);

if (receiptOverlay) {

    receiptOverlay.addEventListener('click', (e) => {
        if (e.target === receiptOverlay) closeReceipt();
    });

}


renderCart();
});