/* ============================================================
   Privacy & Terms Agreement Modal
   ============================================================
   - Accessible modal dialog for signup/login
   - Stores acceptance in localStorage per user
   - WCAG 2.1 AA compliant
   ============================================================ */

const PrivacyModal = {
  STORAGE_KEY: 'tgo_privacy_accepted',
  
  hasAccepted() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) === true;
    } catch (e) {
      return false;
    }
  },
  
  markAccepted() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(true));
  },
  
  init() {
    const modal = document.getElementById('privacy-modal');
    if (!modal) return;
    
    const checkbox = document.getElementById('privacy-accept-checkbox');
    const submitBtn = document.getElementById('signup-form')?.querySelector('button[type="submit"]') 
                   || document.getElementById('login-form')?.querySelector('button[type="submit"]');
    const closeBtn = document.getElementById('privacy-modal-close');
    const overlay = document.getElementById('privacy-modal-overlay');
    
    // Disable submit button until modal is dismissed and accepted
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-disabled', 'true');
    }
    
    // Focus trap: keep focus within modal
    this.setupFocusTrap(modal);
    
    // Checkbox change handler
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (submitBtn) {
          const isChecked = checkbox.checked;
          submitBtn.disabled = !isChecked;
          submitBtn.setAttribute('aria-disabled', !isChecked);
          
          // Announce state to screen readers
          const status = document.getElementById('privacy-checkbox-status');
          if (status) {
            status.textContent = isChecked 
              ? 'You have accepted the terms. You may now submit the form.' 
              : 'You must accept the terms to continue.';
          }
        }
      });
    }
    
    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }
    
    // Overlay click (prevent closing)
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          // Don't close; users must check the box
          const status = document.getElementById('privacy-modal');
          if (status) {
            status.focus();
            status.setAttribute('aria-label', 'Privacy and Terms Agreement. You must review and accept to continue.');
          }
        }
      });
    }
    
    // ESC key handling (allow close but check acceptance)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        if (checkbox?.checked) {
          this.closeModal();
        }
      }
    });
    
    // Show modal on load if not already accepted
    if (!this.hasAccepted()) {
      this.openModal();
    }
  },
  
  setupFocusTrap(modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  },
  
  openModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      
      // Focus the modal heading for screen readers
      const heading = modal.querySelector('h2');
      if (heading) {
        heading.focus();
        heading.setAttribute('tabindex', '-1');
      }
    }
  },
  
  closeModal() {
    const modal = document.getElementById('privacy-modal');
    const checkbox = document.getElementById('privacy-accept-checkbox');
    
    if (!checkbox?.checked) {
      // Don't allow closing without accepting
      alert('You must accept the Privacy Policy and Terms of Agreement to continue.');
      return;
    }
    
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      this.markAccepted();
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  PrivacyModal.init();
});
