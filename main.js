document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       NAV GROUP
    ========================================================= */

    function setupNavGroup(groupSelector) {

        const group = document.querySelector(groupSelector);

        if (!group) return;

        const links = group.querySelectorAll('a');

        links.forEach(link => {

            link.addEventListener('click', (e) => {

                group.querySelectorAll('li').forEach(li => {
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

        filterLinks.forEach(link => {

            link.addEventListener('click', (e) => {

                e.preventDefault();

                navProgramsList
                    .querySelectorAll('li')
                    .forEach(li => {
                        li.classList.remove('active');
                    });

                link.parentElement.classList.add('active');

                const href = link.getAttribute('href');

                if (!href) return;

                const category = href.slice(1);

                programCards.forEach(card => {

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

        toggleLinks.forEach(link => {

            link.addEventListener('click', (e) => {

                e.preventDefault();

                navMemberList
                    .querySelectorAll('li')
                    .forEach(li => {
                        li.classList.remove('active');
                    });

                link.parentElement.classList.add('active');

                const href = link.getAttribute('href');

                const showTerm =
                    href === '#Term Commitment';

                priceBoxes.forEach(box => {

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
            .map(link => {

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

        mainSections.forEach(section => {

            if (section.offsetTop <= scrollPos) {
                current = section;
            }

        });

        mainNavLinks.forEach(link => {

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


    mainNavLinks.forEach(link => {

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
       MOBILE MENU
    ========================================================= */

    const menuBtn =
        document.querySelector(
            '.icon-box.menu'
        );

    const navLinksList =
        document.querySelector(
            '.nav-links'
        );


    if (menuBtn && navLinksList) {

        menuBtn.addEventListener('click', () => {

            navLinksList.classList.toggle(
                'show-mobile'
            );

        });


        document.addEventListener(
            'click',
            (e) => {

                const clickedInsideNav =
                    navLinksList.contains(e.target) ||
                    menuBtn.contains(e.target);

                if (!clickedInsideNav) {

                    navLinksList.classList.remove(
                        'show-mobile'
                    );

                }

            }
        );

    }


    /* =========================================================
       SIGNUP API
    ========================================================= */

    const signupForm =
        document.getElementById(
            'signupForm'
        );


    if (signupForm) {

        signupForm.addEventListener(
            'submit',
            async (e) => {

                e.preventDefault();

                const name =
                    document.getElementById(
                        'name'
                    ).value.trim();

                const email =
                    document.getElementById(
                        'email'
                    ).value.trim();

                const password =
                    document.getElementById(
                        'password'
                    ).value;

                const confirmPassword =
                    document.getElementById(
                        'confirm_password'
                    ).value;


                if (
                    password !==
                    confirmPassword
                ) {

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
                            Array.isArray(
                                firstError
                            )
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
        document.getElementById(
            'loginForm'
        );


    if (loginForm) {

        loginForm.addEventListener(
            'submit',
            async (e) => {

                e.preventDefault();

                const email =
                    document.getElementById(
                        'email'
                    ).value.trim();

                const password =
                    document.getElementById(
                        'password'
                    ).value;


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
                            JSON.stringify(
                                data.user
                            )
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
        document.getElementById(
            'userProfile'
        );

    const userIcon =
        document.getElementById(
            'userIcon'
        );

    const profileDropdown =
        document.getElementById(
            'profileDropdown'
        );

    const userInitial =
        document.getElementById(
            'userInitial'
        );

    const profileAvatar =
        document.getElementById(
            'profileAvatar'
        );

    const profileName =
        document.getElementById(
            'profileName'
        );

    const profileEmail =
        document.getElementById(
            'profileEmail'
        );

    const logoutBtn =
        document.getElementById(
            'logoutBtn'
        );


    if (
        userProfile &&
        userIcon &&
        profileDropdown
    ) {

        const savedUser =
            localStorage.getItem(
                'user'
            );

        const token =
            localStorage.getItem(
                'token'
            );


        if (
            savedUser &&
            token
        ) {

            try {

                const user =
                    JSON.parse(
                        savedUser
                    );


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


                    if (profileAvatar) {
                        profileAvatar.textContent =
                            firstLetter;
                    }

                }


                if (
                    user.name &&
                    profileName
                ) {

                    profileName.textContent =
                        user.name;

                }


                if (
                    user.email &&
                    profileEmail
                ) {

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
                    !userProfile.contains(
                        e.target
                    )
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

        }

    }


    /* =========================================================
       DEMO PAYMENT FLOW
    ========================================================= */

    let selectedMembership = null;


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

    document.head.appendChild(
        paymentStyle
    );


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


    document.body.appendChild(
        demoPayment
    );


    /* =========================================================
       PAYMENT ELEMENTS
    ========================================================= */

    const demoOverlay =
        document.getElementById(
            'demoPaymentOverlay'
        );

    const demoClose =
        document.getElementById(
            'demoPaymentClose'
        );

    const demoPaymentContent =
        document.getElementById(
            'demoPaymentContent'
        );


    /* =========================================================
       SUBSCRIBE BUTTONS
    ========================================================= */

    const subscribeButtons =
        document.querySelectorAll(
            '.card-member .card-footer-member button'
        );


    subscribeButtons.forEach(button => {

        button.addEventListener(
            'click',
            function () {

                const card =
                    this.closest(
                        '.card-member'
                    );

                if (!card) return;


                const plan =
                    card.querySelector(
                        '.member-plan'
                    );


                const price =
                    card.querySelector(
                        '.price-monthly'
                    );


                const priceText =
                    card.querySelector(
                        '.price-text'
                    );


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


                showPaymentStart();

            }
        );

    });


    /* =========================================================
       SHOW PAYMENT START
    ========================================================= */

    function showPaymentStart() {

        demoPaymentContent.innerHTML = `

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


        demoOverlay.classList.add(
            'show'
        );

        document.body.style.overflow =
            'hidden';


        document
            .getElementById(
                'demoWalletMethod'
            )
            .addEventListener(
                'click',
                showWalletPayment
            );


        document
            .getElementById(
                'demoCardMethod'
            )
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
            .getElementById(
                'demoBackBtn'
            )
            .addEventListener(
                'click',
                showPaymentStart
            );


        document
            .getElementById(
                'demoPayBtn'
            )
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
            document.getElementById(
                'walletNumber'
            );


        const number =
            walletInput
                ? walletInput.value.trim()
                : '';


        if (
            !/^01[0125][0-9]{8}$/.test(
                number
            )
        ) {

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
            .getElementById(
                'verifyOtp'
            )
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
            document.getElementById(
                'demoOtp'
            );


        const otp =
            otpInput
                ? otpInput.value.trim()
                : '';


        if (
            !/^[0-9]{6}$/.test(
                otp
            )
        ) {

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

        demoPaymentContent.innerHTML = `

            <div class="payment-success">

                <div class="success-icon">
                    <i class="fa-solid fa-check"></i>
                </div>

                <h2>
                    Payment Successful!
                </h2>

                <p>
                    Your membership has been
                    activated successfully.
                </p>

                <div class="success-plan">
                    ${selectedMembership?.name || 'Membership'}
                </div>

                <small class="demo-note">
                    DEMO PAYMENT — No real money was charged.
                </small>

                <button
                    type="button"
                    class="demo-pay-btn"
                    id="finishPayment"
                >
                    DONE
                </button>

            </div>

        `;


        document
            .getElementById(
                'finishPayment'
            )
            .addEventListener(
                'click',
                closeDemoPayment
            );

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
            .getElementById(
                'demoBackBtn'
            )
            .addEventListener(
                'click',
                showPaymentStart
            );


        document
            .getElementById(
                'demoCardPayBtn'
            )
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
            document.getElementById(
                'demoCardNumber'
            );

        const cardNameInput =
            document.getElementById(
                'demoCardName'
            );

        const expiryInput =
            document.getElementById(
                'demoExpiry'
            );

        const cvvInput =
            document.getElementById(
                'demoCVV'
            );


        const cardNumber =
            cardNumberInput
                ? cardNumberInput.value
                    .replace(/\s/g, '')
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


        if (
            cardNumber.length < 16
        ) {

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


        if (
            !/^\d{2}\/\d{2}$/.test(
                expiry
            )
        ) {

            alert(
                'Please enter expiry date as MM/YY.'
            );

            return;

        }


        if (
            !/^\d{3}$/.test(
                cvv
            )
        ) {

            alert(
                'Please enter a valid CVV.'
            );

            return;

        }


        showPaymentSuccess();

    }


    /* =========================================================
       CLOSE PAYMENT
    ========================================================= */

    function closeDemoPayment() {

        demoOverlay.classList.remove(
            'show'
        );

        document.body.style.overflow =
            '';

        selectedMembership = null;

    }


    /* =========================================================
       CLOSE BUTTON
    ========================================================= */

    if (demoClose) {

        demoClose.addEventListener(
            'click',
            closeDemoPayment
        );

    }


    /* =========================================================
       CLICK OUTSIDE
    ========================================================= */

    if (demoOverlay) {

        demoOverlay.addEventListener(
            'click',
            function (e) {

                if (
                    e.target === demoOverlay
                ) {

                    closeDemoPayment();

                }

            }
        );

    }


    /* =========================================================
       SITE SEARCH
    ========================================================= */

    const searchIcon =
        document.getElementById(
            'searchIcon'
        );

    const searchBox =
        document.getElementById(
            'searchBox'
        );

    const siteSearch =
        document.getElementById(
            'siteSearch'
        );

    const closeSearch =
        document.getElementById(
            'closeSearch'
        );

    const searchResults =
        document.getElementById(
            'searchResults'
        );


    if (
        searchIcon &&
        searchBox &&
        siteSearch &&
        closeSearch &&
        searchResults
    ) {

        const searchData = [

            /* ================= PROGRAMS ================= */

            {
                title: 'HYPERTROPHY VELOCITY',
                type: 'Program',
                keywords: 'hypertrophy marcus vance muscle growth',
                selector: '.card-prog:nth-child(1)'
            },

            {
                title: 'IRON BARBELL MATRIX',
                type: 'Program',
                keywords: 'max strength elena rostova strength',
                selector: '.card-prog:nth-child(2)'
            },

            {
                title: 'LACTATE VO2 PEAKING',
                type: 'Program',
                keywords: 'endurance devante cole cardio',
                selector: '.card-prog:nth-child(3)'
            },

            {
                title: 'KINETIC MOBILITY & CORE',
                type: 'Program',
                keywords: 'foundations mobility core marcus vance',
                selector: '.card-prog:nth-child(4)'
            },

            {
                title: 'UPPER MASS DIVISION',
                type: 'Program',
                keywords: 'hypertrophy elena rostova upper mass',
                selector: '.card-prog:nth-child(5)'
            },

            {
                title: 'WEIGHTLIFTING MASTERY',
                type: 'Program',
                keywords: 'max strength weightlifting marcus vance',
                selector: '.card-prog:nth-child(6)'
            },


            /* ================= COACHES ================= */

            {
                title: 'Marcus Vance',
                type: 'Coach',
                keywords: 'hypertrophy biomechanics powerlifting',
                selector: '.card-coach:nth-child(1)'
            },

            {
                title: 'Elena Rostova',
                type: 'Coach',
                keywords: 'weightlifting peak power olympic',
                selector: '.card-coach:nth-child(2)'
            },

            {
                title: 'Devante Cole',
                type: 'Coach',
                keywords: 'cardio metabolic conditioning track',
                selector: '.card-coach:nth-child(3)'
            },

            {
                title: 'Sarah Jenkins',
                type: 'Coach',
                keywords: 'hiit mobility rehab biomechanics',
                selector: '.card-coach:nth-child(4)'
            },


            /* ================= STORE ================= */

            {
                title: 'VOLT ISO-WHEY HYDROLYZED',
                type: 'Store',
                keywords: 'protein whey supplement 27g',
                selector: '.card-store:nth-child(1)'
            },

            {
                title: 'KINETIC PRE-WORKOUT',
                type: 'Store',
                keywords: 'pre workout caffeine supplement',
                selector: '.card-store:nth-child(2)'
            },

            {
                title: 'CARBON GRIP STRAPS',
                type: 'Store',
                keywords: 'accessories gear grip straps',
                selector: '.card-store:nth-child(3)'
            },

            {
                title: 'VOLT STEEL HYDRO FLASK',
                type: 'Store',
                keywords: 'flask bottle water gear',
                selector: '.card-store:nth-child(4)'
            },


            /* ================= MEMBERSHIPS ================= */

            {
                title: '1 Month Pass',
                type: 'Membership',
                keywords: 'monthly membership starter rolling 79',
                selector: '.card-member:nth-child(1)'
            },

            {
                title: '3 Months Block',
                type: 'Membership',
                keywords: 'quarterly membership 219 7 off',
                selector: '.card-member:nth-child(2)'
            },

            {
                title: '6 Months Pro',
                type: 'Membership',
                keywords: 'pro athlete membership 399 popular',
                selector: '.card-member:nth-child(3)'
            },

            {
                title: 'Yearly Apex',
                type: 'Membership',
                keywords: 'annual elite yearly membership 699',
                selector: '.card-member:nth-child(4)'
            }

        ];


        /* ================= OPEN SEARCH ================= */

        searchIcon.addEventListener(
            'click',
            function () {

                searchBox.classList.add(
                    'show'
                );

                setTimeout(() => {

                    siteSearch.focus();

                }, 200);

            }
        );


        /* ================= CLOSE SEARCH ================= */

        closeSearch.addEventListener(
            'click',
            function () {

                searchBox.classList.remove(
                    'show'
                );

                siteSearch.value =
                    '';

                searchResults.innerHTML =
                    '';

            }
        );


        /* ================= SEARCH ================= */

        siteSearch.addEventListener(
            'input',
            function () {

                const query =
                    this.value
                        .trim()
                        .toLowerCase();


                if (!query) {

                    searchResults.innerHTML =
                        '';

                    return;

                }


                const results =
                    searchData.filter(
                        item =>

                            item.title
                                .toLowerCase()
                                .includes(query) ||

                            item.keywords
                                .toLowerCase()
                                .includes(query) ||

                            item.type
                                .toLowerCase()
                                .includes(query)

                    );


                if (
                    results.length === 0
                ) {

                    searchResults.innerHTML = `

                        <div class="no-results">
                            No results found
                        </div>

                    `;

                    return;

                }


                searchResults.innerHTML =
                    results
                        .map(
                            item => `

                                <div
                                    class="search-result"
                                    data-selector="${item.selector}"
                                >

                                    <strong>
                                        ${item.title}
                                    </strong>

                                    <span>
                                        ${item.type}
                                    </span>

                                </div>

                            `
                        )
                        .join('');


                /* ================= CLICK RESULT ================= */

                document
                    .querySelectorAll(
                        '.search-result'
                    )
                    .forEach(
                        result => {

                            result.addEventListener(
                                'click',
                                function () {

                                    const selector =
                                        this.dataset.selector;


                                    const target =
                                        document.querySelector(
                                            selector
                                        );


                                    if (target) {

                                        searchBox.classList.remove(
                                            'show'
                                        );


                                        siteSearch.value =
                                            '';

                                        searchResults.innerHTML =
                                            '';


                                        setTimeout(() => {

                                            target.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'center'
                                            });


                                            target.classList.add(
                                                'search-highlight'
                                            );


                                            setTimeout(() => {

                                                target.classList.remove(
                                                    'search-highlight'
                                                );

                                            }, 2000);

                                        }, 200);

                                    }

                                }
                            );

                        }
                    );

            }
        );


        /* ================= CLOSE WHEN CLICK OUTSIDE ================= */

        document.addEventListener(
            'click',
            function (event) {

                if (
                    !searchBox.contains(
                        event.target
                    ) &&
                    !searchIcon.contains(
                        event.target
                    )
                ) {

                    searchBox.classList.remove(
                        'show'
                    );

                }

            }
        );

    }

    // ================= PROGRAM DETAILS =================

const programDetailsStyle = document.createElement('style');

programDetailsStyle.textContent = `
    .program-details-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.85);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
        z-index: 99999;
        backdrop-filter: blur(8px);
    }

    .program-details-overlay.show {
        display: flex;
    }

    .program-details-modal {
        position: relative;
        width: min(600px, 100%);
        max-height: 90vh;
        overflow-y: auto;
        background: #111;
        border: 1px solid rgba(182, 240, 0, 0.35);
        border-radius: 18px;
        padding: 32px;
        box-shadow: 0 0 50px rgba(182, 240, 0, 0.12);
    }

    .program-details-close {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 38px;
        height: 38px;
        border: 1px solid #333;
        border-radius: 50%;
        background: #1b1b1b;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        transition: 0.3s;
    }

    .program-details-close:hover {
        background: #b6f000;
        color: #000;
        transform: rotate(90deg);
    }

    .program-details-label {
        display: inline-block;
        color: #b6f000;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 2px;
        margin-bottom: 10px;
    }

    .program-details-modal h2 {
        color: #fff;
        font-size: 28px;
        margin: 0 0 18px;
        line-height: 1.2;
    }

    .program-details-coach {
        color: #b6f000;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .program-details-description {
        color: #aaa;
        line-height: 1.8;
        font-size: 15px;
        margin-bottom: 25px;
    }

    .program-details-info {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 25px;
    }

    .program-info-box {
        background: #181818;
        border: 1px solid #292929;
        border-radius: 10px;
        padding: 15px;
    }

    .program-info-box span {
        display: block;
        color: #777;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 6px;
    }

    .program-info-box strong {
        color: #fff;
        font-size: 14px;
    }

    .program-details-action {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 8px;
        background: #b6f000;
        color: #000;
        font-weight: 800;
        cursor: pointer;
        transition: 0.3s;
    }

    .program-details-action:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(182, 240, 0, 0.2);
    }

    @media (max-width: 500px) {
        .program-details-modal {
            padding: 25px 20px;
        }

        .program-details-modal h2 {
            font-size: 22px;
        }

        .program-details-info {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(programDetailsStyle);


// إنشاء نافذة التفاصيل

const programDetailsModal = document.createElement('div');

programDetailsModal.className = 'program-details-overlay';

programDetailsModal.innerHTML = `
    <div class="program-details-modal">

        <button
            type="button"
            class="program-details-close"
            id="programDetailsClose"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>

        <span class="program-details-label">
            PROGRAM DETAILS
        </span>

        <h2 id="detailsProgramName"></h2>

        <div class="program-details-coach" id="detailsProgramCoach"></div>

        <p
            class="program-details-description"
            id="detailsProgramDescription"
        ></p>

        <div class="program-details-info">

            <div class="program-info-box">
                <span>Level</span>
                <strong id="detailsProgramLevel"></strong>
            </div>

            <div class="program-info-box">
                <span>Duration</span>
                <strong id="detailsProgramWeeks"></strong>
            </div>

            <div class="program-info-box">
                <span>Training</span>
                <strong id="detailsProgramSessions"></strong>
            </div>

            <div class="program-info-box">
                <span>Intensity</span>
                <strong id="detailsProgramIntensity"></strong>
            </div>

        </div>

        <button
            type="button"
            class="program-details-action"
            id="programDetailsAction"
        >
            CLOSE DETAILS
        </button>

    </div>
`;

document.body.appendChild(programDetailsModal);


// عناصر النافذة

const detailsProgramName =
    document.getElementById('detailsProgramName');

const detailsProgramCoach =
    document.getElementById('detailsProgramCoach');

const detailsProgramDescription =
    document.getElementById('detailsProgramDescription');

const detailsProgramLevel =
    document.getElementById('detailsProgramLevel');

const detailsProgramWeeks =
    document.getElementById('detailsProgramWeeks');

const detailsProgramSessions =
    document.getElementById('detailsProgramSessions');

const detailsProgramIntensity =
    document.getElementById('detailsProgramIntensity');

const programDetailsClose =
    document.getElementById('programDetailsClose');

const programDetailsAction =
    document.getElementById('programDetailsAction');


// كل أزرار DETAILS

document.querySelectorAll('.card-prog .card-footer button').forEach(button => {

    button.addEventListener('click', function () {

        const card = this.closest('.card-prog');

        if (!card) return;


        // البيانات الموجودة داخل نفس الكارت

        const name =
            card.querySelector('.card-content h3')?.textContent.trim()
            || 'Program';

        const coach =
            card.querySelector('.coach')?.textContent.trim()
            || 'Coach';

        const description =
            card.querySelector('.card-content p')?.textContent.trim()
            || 'No description available.';

        const level =
            card.querySelector('.level')?.textContent.trim()
            || 'N/A';

        const weeks =
            card.querySelector('.weeks')?.textContent.trim()
            || 'N/A';

        const sessions =
            card.querySelector('.card-footer span')?.textContent.trim()
            || 'N/A';

        const intensity =
            card.querySelector('.intensity')?.textContent.trim()
            || 'N/A';


        // عرض البيانات

        detailsProgramName.textContent = name;

        detailsProgramCoach.innerHTML =
            `<i class="fa-solid fa-user"></i> ${coach}`;

        detailsProgramDescription.textContent =
            description;

        detailsProgramLevel.textContent =
            level;

        detailsProgramWeeks.textContent =
            weeks;

        detailsProgramSessions.textContent =
            sessions;

        detailsProgramIntensity.textContent =
            intensity;


        // فتح النافذة

        programDetailsModal.classList.add('show');

    });

});


// إغلاق النافذة

function closeProgramDetails() {
    programDetailsModal.classList.remove('show');
}

programDetailsClose.addEventListener(
    'click',
    closeProgramDetails
);

programDetailsAction.addEventListener(
    'click',
    closeProgramDetails
);


// الضغط خارج النافذة

programDetailsModal.addEventListener('click', function (e) {

    if (e.target === programDetailsModal) {
        closeProgramDetails();
    }

});


// زر ESC

document.addEventListener('keydown', function (e) {

    if (e.key === 'Escape') {
        closeProgramDetails();
    }

});

// ================= MENU PANEL =================

const menuIcon =
    document.querySelector('.nav-icons .menu');

const menuPanel =
    document.getElementById('menuPanel');

const menuOverlay =
    document.getElementById('menuOverlay');

const menuClose =
    document.getElementById('menuClose');


// ================= OPEN MENU =================

if (menuIcon && menuPanel && menuOverlay) {

    menuIcon.addEventListener('click', () => {

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


// Close X

if (menuClose) {

    menuClose.addEventListener(
        'click',
        closeMenu
    );

}


// Close when clicking outside

if (menuOverlay) {

    menuOverlay.addEventListener(
        'click',
        closeMenu
    );

}


// ================= ESC KEY =================

document.addEventListener(
    'keydown',
    (e) => {

        if (e.key === 'Escape') {
            closeMenu();
        }

    }
);


// ================= CONTACT =================

const contactMenuBtn =
    document.getElementById('contactMenuBtn');

if (contactMenuBtn) {

    contactMenuBtn.addEventListener(
        'click',
        () => {

            closeMenu();

            document
                .getElementById('CONTACT')
                ?.scrollIntoView({
                    behavior: 'smooth'
                });

        }
    );

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

}


// Change Theme

if (themeSwitch) {

    themeSwitch.addEventListener(
        'click',
        () => {

            document.body.classList.toggle(
                'light-mode'
            );

            const isLight =
                document.body.classList.contains(
                    'light-mode'
                );

            if (isLight) {

                localStorage.setItem(
                    'voltTheme',
                    'light'
                );

                if (themeText) {
                    themeText.textContent =
                        'Light Mode';
                }

            } else {

                localStorage.setItem(
                    'voltTheme',
                    'dark'
                );

                if (themeText) {
                    themeText.textContent =
                        'Dark Mode';
                }

            }

        }
    );

}


// ================= REVIEWS =================

const reviewsMenuBtn =
    document.getElementById('reviewsMenuBtn');

const reviewsOverlay =
    document.getElementById('reviewsOverlay');

const reviewsClose =
    document.getElementById('reviewsClose');


if (reviewsMenuBtn && reviewsOverlay) {

    reviewsMenuBtn.addEventListener(
        'click',
        () => {

            closeMenu();

            reviewsOverlay.classList.add(
                'show'
            );

        }
    );

}


if (reviewsClose && reviewsOverlay) {

    reviewsClose.addEventListener(
        'click',
        () => {

            reviewsOverlay.classList.remove(
                'show'
            );

        }
    );

}


if (reviewsOverlay) {

    reviewsOverlay.addEventListener(
        'click',
        (e) => {

            if (e.target === reviewsOverlay) {

                reviewsOverlay.classList.remove(
                    'show'
                );

            }

        }
    );

}


// ================= SETTINGS =================

const settingsMenuBtn =
    document.getElementById('settingsMenuBtn');

if (settingsMenuBtn) {

    settingsMenuBtn.addEventListener(
        'click',
        () => {

            alert(
                'Settings panel will be available soon.'
            );

        }
    );

}
});