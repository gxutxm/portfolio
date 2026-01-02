// === MODAL SYSTEM ===

class ModalManager {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.content = document.getElementById('modal-body');
        this.closeBtn = document.getElementById('modal-close');
        
        this.chatbotOverlay = document.getElementById('chatbot-overlay');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotClose = document.getElementById('chatbot-close');
        
        this.jukeboxUI = document.getElementById('jukebox-ui');
        this.jukeboxCloseBtn = document.getElementById('jukebox-close-btn');
        
        this.isOpen = false;
        this.setupListeners();
    }
    
    setupListeners() {
        // Modal close
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.closeModal();
        });
        
        // Chatbot
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());
        this.chatbotSend.addEventListener('click', () => this.sendChatMessage());
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
        this.chatbotOverlay.addEventListener('click', (e) => {
            if (e.target === this.chatbotOverlay) this.closeChatbot();
        });
        
        // Jukebox
        this.jukeboxCloseBtn.addEventListener('click', () => this.closeJukebox());
        this.jukeboxUI.addEventListener('click', (e) => {
            if (e.target === this.jukeboxUI) this.closeJukebox();
        });
        
        // ESC key closes everything
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeChatbot();
                this.closeJukebox();
            }
        });
    }
    
    openModal(type) {
        this.isOpen = true;
        this.content.innerHTML = this.getContent(type);
        this.overlay.classList.remove('hidden');
        setTimeout(() => this.overlay.classList.add('visible'), 10);
        
        // Disable Phaser keyboard when modal is open
        if (window.game && window.game.input && window.game.input.keyboard) {
            window.game.input.keyboard.enabled = false;
        }
    }
    
    closeModal() {
        this.isOpen = false;
        this.overlay.classList.remove('visible');
        setTimeout(() => this.overlay.classList.add('hidden'), 300);
        
        // Re-enable Phaser keyboard when modal closes
        if (window.game && window.game.input && window.game.input.keyboard) {
            window.game.input.keyboard.enabled = true;
        }
    }
    
    getContent(type) {
        switch(type) {
            case 'resume': return this.resumeContent();
            case 'aboutMe': return this.aboutMeContent();
            case 'social': return this.socialContent();
            case 'projects': return this.projectsContent();
            case 'skills': return this.skillsContent();
            case 'timeline': return this.timelineContent();
            case 'trophies': return this.trophiesContent();
            case 'contact': return this.contactContent();
            default: return '<p>Content not found.</p>';
        }
    }
    
    resumeContent() {
        return `
            <h2>📄 RESUME</h2>
            <p>${PORTFOLIO_DATA.resume.summary}</p>
            <a href="${PORTFOLIO_DATA.resume.downloadUrl}" class="resume-btn" download>
                ⬇ DOWNLOAD RESUME
            </a>
        `;
    }
    
    aboutMeContent() {
        const interests = PORTFOLIO_DATA.aboutMe.interests.map(i => 
            `<span class="interest-tag">${i}</span>`
        ).join('');
        
        const funFacts = PORTFOLIO_DATA.aboutMe.funFacts.map(f => 
            `<li>${f}</li>`
        ).join('');
        
        return `
            <h2>👤 ABOUT ME</h2>
            <p class="about-bio">${PORTFOLIO_DATA.aboutMe.bio}</p>
            <h3>🎯 Interests</h3>
            <div class="interests-grid">${interests}</div>
            <h3>✨ Fun Facts</h3>
            <ul class="fun-facts">${funFacts}</ul>
        `;
    }
    
    socialContent() {
        const links = PORTFOLIO_DATA.social.map(s => `
            <a href="${s.url}" target="_blank" rel="noopener" class="social-item">
                <span class="social-icon">${s.icon}</span>
                <span>${s.name}</span>
            </a>
        `).join('');
        
        return `
            <h2>🔗 CONNECT WITH ME</h2>
            <div class="social-grid">${links}</div>
        `;
    }
    
    projectsContent() {
        const cards = PORTFOLIO_DATA.projects.map(p => `
            <div class="project-card">
                <h4>${p.title}</h4>
                <p>${p.description}</p>
                <div class="project-tags">
                    ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
                </div>
                <a href="${p.url}" target="_blank" rel="noopener" class="project-link">View Project →</a>
            </div>
        `).join('');
        
        return `
            <h2>💻 MY PROJECTS</h2>
            <div class="projects-grid">${cards}</div>
        `;
    }
    
    skillsContent() {
        const skills = PORTFOLIO_DATA.skills.map(s => `
            <div class="skill-item">
                <div class="skill-name">${s.name}</div>
                <div class="skill-bar">
                    <div class="skill-fill" style="width: ${s.level}%"></div>
                </div>
            </div>
        `).join('');
        
        return `
            <h2>🎮 SKILLS ARCADE</h2>
            <div class="skills-container">${skills}</div>
        `;
    }
    
    timelineContent() {
        const items = PORTFOLIO_DATA.timeline.map(t => `
            <div class="timeline-item">
                <div class="timeline-date">${t.date}</div>
                <div class="timeline-title">${t.title}</div>
                <div class="timeline-desc">${t.description}</div>
            </div>
        `).join('');
        
        return `
            <h2>📅 MY JOURNEY</h2>
            <div class="timeline">${items}</div>
        `;
    }
    
    trophiesContent() {
        const trophies = PORTFOLIO_DATA.trophies.map(t => `
            <div class="trophy-item">
                <div class="trophy-icon">${t.icon}</div>
                <div class="trophy-name">${t.name}</div>
            </div>
        `).join('');
        
        return `
            <h2>🏆 ACHIEVEMENTS</h2>
            <div class="trophy-grid">${trophies}</div>
        `;
    }
    
    contactContent() {
        return `
            <h2>📬 SEND A MESSAGE</h2>
            <form class="contact-form" onsubmit="window.modalManager.handleContactSubmit(event)">
                <input type="text" name="name" placeholder="Your Name" required>
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="message" placeholder="Your Message..." required></textarea>
                <button type="submit">SEND MESSAGE</button>
            </form>
        `;
    }
    
    handleContactSubmit(e) {
        e.preventDefault();
        // In a real implementation, you'd send this to a backend
        const formData = new FormData(e.target);
        console.log('Contact form submitted:', Object.fromEntries(formData));
        
        this.content.innerHTML = `
            <h2>📬 MESSAGE SENT!</h2>
            <p>Thanks for reaching out! I'll get back to you soon.</p>
        `;
    }
    
    // === CHATBOT ===
    
    openChatbot() {
        this.isOpen = true;
        this.chatbotOverlay.classList.remove('hidden');
        this.chatbotMessages.innerHTML = '';
        this.addBotMessage(PORTFOLIO_DATA.chatbotResponses.greeting);
        
        // Focus input and prevent game from capturing keys
        setTimeout(() => {
            this.chatbotInput.focus();
            // Disable Phaser keyboard when chatbot is open
            if (window.game && window.game.input && window.game.input.keyboard) {
                window.game.input.keyboard.enabled = false;
            }
        }, 100);
    }
    
    closeChatbot() {
        this.isOpen = false;
        this.chatbotOverlay.classList.add('hidden');
        
        // Re-enable Phaser keyboard when chatbot closes
        if (window.game && window.game.input && window.game.input.keyboard) {
            window.game.input.keyboard.enabled = true;
        }
    }
    
    sendChatMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        this.chatbotInput.value = '';
        
        // Simple response logic
        setTimeout(() => {
            const response = this.getChatbotResponse(message.toLowerCase());
            this.addBotMessage(response);
        }, 500);
    }
    
    addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-message user';
        div.textContent = text;
        this.chatbotMessages.appendChild(div);
        this.scrollChatToBottom();
    }
    
    addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-message bot';
        div.textContent = text;
        this.chatbotMessages.appendChild(div);
        this.scrollChatToBottom();
    }
    
    scrollChatToBottom() {
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }
    
    getChatbotResponse(input) {
        const responses = PORTFOLIO_DATA.chatbotResponses;
        
        if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
            return responses.greeting;
        }
        if (input.includes('skill') || input.includes('tech') || input.includes('know')) {
            return responses.skills;
        }
        if (input.includes('project') || input.includes('work') || input.includes('portfolio')) {
            return responses.projects;
        }
        if (input.includes('education') || input.includes('study') || input.includes('school') || input.includes('learn')) {
            return responses.education;
        }
        if (input.includes('contact') || input.includes('reach') || input.includes('email') || input.includes('hire')) {
            return responses.contact;
        }
        if (input.includes('hobby') || input.includes('fun') || input.includes('free time')) {
            return responses.hobbies;
        }
        
        return responses.default;
    }
    
    // === JUKEBOX ===
    
    openJukebox() {
        this.isOpen = true;
        this.jukeboxUI.classList.remove('hidden');
    }
    
    closeJukebox() {
        this.isOpen = false;
        this.jukeboxUI.classList.add('hidden');
    }
}

// Initialize modal manager globally
window.modalManager = new ModalManager();
