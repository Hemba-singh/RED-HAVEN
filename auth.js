class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Modal elements
        const authModal = document.getElementById('authModal');
        const authButton = document.getElementById('authButton');
        const closeModal = document.querySelector('.close-modal');
        const authTabs = document.querySelectorAll('.auth-tab');
        const loginForm = document.querySelector('.login-form');
        const signupForm = document.querySelector('.signup-form');

        // Event listeners
        authButton.addEventListener('click', () => this.showModal());
        closeModal.addEventListener('click', () => this.hideModal());
        
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        signupForm.addEventListener('submit', (e) => this.handleSignup(e));

        // Click outside to close
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                this.hideModal();
            }
        });

        // Check if user is already logged in
        this.checkAuthState();
    }

    showModal() {
        document.getElementById('authModal').style.display = 'block';
    }

    hideModal() {
        document.getElementById('authModal').style.display = 'none';
    }

    switchTab(tab) {
        const tabs = document.querySelectorAll('.auth-tab');
        const contents = document.querySelectorAll('.auth-content');

        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        contents.forEach(c => c.classList.add('hidden'));
        document.getElementById(`${tab}Form`).classList.remove('hidden');
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            // Here you would typically make an API call to your backend
            // For demo purposes, we'll use a simple check
            if (email && password) {
                this.isAuthenticated = true;
                this.currentUser = { email };
                this.updateAuthState();
                this.hideModal();
                
                Swal.fire({
                    title: 'Success!',
                    text: 'You have been logged in successfully',
                    icon: 'success',
                    confirmButtonColor: '#971108'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid credentials',
                icon: 'error',
                confirmButtonColor: '#971108'
            });
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match',
                icon: 'error',
                confirmButtonColor: '#971108'
            });
            return;
        }

        try {
            // Here you would typically make an API call to your backend
            // For demo purposes, we'll simulate success
            this.isAuthenticated = true;
            this.currentUser = { name, email };
            this.updateAuthState();
            this.hideModal();

            Swal.fire({
                title: 'Success!',
                text: 'Account created successfully',
                icon: 'success',
                confirmButtonColor: '#971108'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Could not create account',
                icon: 'error',
                confirmButtonColor: '#971108'
            });
        }
    }

    updateAuthState() {
        const authButton = document.getElementById('authButton');
        if (this.isAuthenticated) {
            authButton.textContent = 'Logout';
            authButton.onclick = () => this.handleLogout();
        } else {
            authButton.textContent = 'Login';
            authButton.onclick = () => this.showModal();
        }
    }

    handleLogout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.updateAuthState();
        
        Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully',
            icon: 'success',
            confirmButtonColor: '#971108'
        });
    }

    checkAuthState() {
        // Check localStorage or cookies for existing session
        // For demo purposes, we'll start as logged out
        this.updateAuthState();
    }
}

// Initialize authentication
const auth = new Auth(); 