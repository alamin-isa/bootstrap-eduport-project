/**
 * Auth Dropdown Controller
 * Handles user authentication state and UI updates
 */
class AuthDropdown {
    constructor() {
      // DOM Elements
      this.dropdownButton = document.getElementById('userDropdown');
      this.authButton = document.getElementById('authButton');
      this.authText = document.getElementById('authText');
      this.profileLink = document.querySelector('.dropdown-item[href="#profile"]');
      this.userNameElement = document.querySelector('.dropdown-header');
      
      // State
      this.isLoggedIn = false;
      this.userData = null;
  
      // Initialize
      this.init();
    }
  
    /**
     * Initialize the auth dropdown
     */
    init() {
      // Check initial auth state (e.g., from localStorage or token)
      this.checkAuthState();
      
      // Set up event listeners
      this.authButton.addEventListener('click', (e) => this.handleAuthAction(e));
      
      // Simulate auth state changes for demo (remove in production)
      document.addEventListener('keydown', (e) => {
        if (e.key === 'l') this.mockLogin(); // Press 'l' to mock login
        if (e.key === 'k') this.mockLogout(); // Press 'k' to mock logout
      });
    }
  
    /**
     * Check authentication state from storage/token
     */
    checkAuthState() {
      // In a real app, you would:
      // 1. Check localStorage/sessionStorage
      // 2. Validate JWT token if exists
      // 3. Make API request to verify session
      
      const token = localStorage.getItem('authToken');
      this.isLoggedIn = !!token;
      
      if (this.isLoggedIn) {
        this.userData = JSON.parse(localStorage.getItem('userData')) || { 
          name: 'Demo User', 
          email: 'user@example.com' 
        };
      }
      
      this.updateUI();
    }
  
    /**
     * Handle sign in/out actions
     */
    handleAuthAction(e) {
      e.preventDefault();
      
      if (this.isLoggedIn) {
        this.logout();
      } else {
        this.login();
      }
    }
  
    /**
     * Login handler
     */
    async login() {
      try {
        // In a real app, you would:
        // 1. Show login modal/form
        // 2. Send credentials to API
        // 3. Handle response
        
        // Mock API call
        const response = await this.mockAuthRequest('login');
        
        if (response.success) {
          // Store auth data
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user));
          
          this.isLoggedIn = true;
          this.userData = response.user;
          this.updateUI();
          
          // Show success feedback
          this.showToast('Login successful!', 'success');
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.showToast('Login failed. Please try again.', 'danger');
      }
    }
  
    /**
     * Logout handler
     */
    logout() {
      try {
        // In a real app, you would:
        // 1. Send logout request to API
        // 2. Clear client-side storage
        
        // Mock API call
        this.mockAuthRequest('logout');
        
        // Clear storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        
        this.isLoggedIn = false;
        this.userData = null;
        this.updateUI();
        
        // Show feedback
        this.showToast('Logged out successfully', 'info');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  
    /**
     * Update UI based on auth state
     */
    updateUI() {
      if (this.isLoggedIn) {
        // Update dropdown for logged-in state
        this.authText.textContent = 'Sign Out';
        this.authButton.classList.add('text-danger');
        this.authButton.href = '#logout';
        
        // Show profile info
        this.userNameElement.textContent = `Welcome, ${this.userData.name.split(' ')[0]}!`;
        this.profileLink.style.display = 'block';
        
        // Update avatar (in a real app, use user's image)
        document.querySelector('.avatar-img').src = './images/01.jpg';
      } else {
        // Update for logged-out state
        this.authText.textContent = 'Sign In';
        this.authButton.classList.remove('text-danger');
        this.authButton.href = '#login';
        
        // Hide profile info
        this.userNameElement.textContent = 'Guest User';
        this.profileLink.style.display = 'none';
        
        // Reset avatar
        document.querySelector('.avatar-img').src = './images/01.jpg';
      }
    }
  
    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
      // In a real app, use Bootstrap Toasts or similar
      console.log(`${type.toUpperCase()}: ${message}`);
      alert(`${type.toUpperCase()}: ${message}`); // Demo only
    }
  
    /**
     * Mock API request (demo only)
     */
    mockAuthRequest(action) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (action === 'login') {
            resolve({
              success: true,
              token: 'mock-jwt-token-123456',
              user: {
                name: 'John Doe',
                email: 'john@example.com',
                avatar: './images/01-logged-in.jpg'
              }
            });
          } else {
            resolve({ success: true });
          }
        }, 800);
      });
    }
  
    /**
     * Demo functions (remove in production)
     */
    mockLogin() {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify({
        name: 'Demo User',
        email: 'demo@example.com'
      }));
      this.checkAuthState();
    }
  
    mockLogout() {
      localStorage.clear();
      this.checkAuthState();
    }
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new AuthDropdown();
  });