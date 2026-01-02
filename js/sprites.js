// === PROCEDURAL PIXEL ART SPRITE GENERATOR ===

class SpriteGenerator {
    constructor(scene) {
        this.scene = scene;
        this.size = GAME_CONFIG.tileSize;
    }
    
    generateAll() {
        this.generateFloorTile();
        this.generateFloorPath();
        this.generateWallTile();
        this.generatePlayer();
        this.generateHelpdesk();
        this.generateResumeStall();
        this.generateAboutMeStall();
        this.generateSocialStall();
        this.generateProjectsStall();
        this.generateSkillsStall();
        this.generateTimelineStall();
        this.generateTrophiesStall();
        this.generateContactStall();
        this.generateInteractionGlow();
        this.generateTorch();
        this.generateTree();
        this.generatePottedPlant();
        this.generateRug();
        this.generateBookshelf();
        this.generateFireParticle();
    }
    
    generateFloorTile() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const s = this.size;
        
        g.fillStyle(GAME_CONFIG.colors.floor);
        g.fillRect(0, 0, s, s);
        
        g.fillStyle(GAME_CONFIG.colors.floorAlt);
        g.fillRect(0, 0, s, 2);
        g.fillRect(0, 0, 2, s);
        
        g.fillStyle(GAME_CONFIG.colors.floorAlt, 0.3);
        g.fillRect(4, 4, s - 8, s - 8);
        
        g.fillStyle(GAME_CONFIG.colors.floorAccent);
        g.fillRect(0, 0, 4, 4);
        g.fillRect(s - 4, 0, 4, 4);
        g.fillRect(0, s - 4, 4, 4);
        g.fillRect(s - 4, s - 4, 4, 4);
        
        g.generateTexture('floor', s, s);
        g.destroy();
    }
    
    generateFloorPath() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const s = this.size;
        
        g.fillStyle(GAME_CONFIG.colors.pathStone);
        g.fillRect(0, 0, s, s);
        
        g.fillStyle(GAME_CONFIG.colors.pathStoneDark);
        g.fillRect(0, 0, s/2 - 1, s/2 - 1);
        g.fillRect(s/2 + 1, s/2 + 1, s/2 - 1, s/2 - 1);
        
        g.fillStyle(GAME_CONFIG.colors.floorAccent);
        g.fillRect(s/2 - 1, 0, 2, s);
        g.fillRect(0, s/2 - 1, s, 2);
        
        g.fillStyle(0xffffff, 0.1);
        g.fillRect(2, 2, s/2 - 5, 2);
        
        g.generateTexture('pathTile', s, s);
        g.destroy();
    }
    
    generateWallTile() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const s = this.size;
        
        g.fillStyle(GAME_CONFIG.colors.wall);
        g.fillRect(0, 0, s, s);
        
        g.fillStyle(GAME_CONFIG.colors.wallDark);
        g.fillRect(0, s/3, s, 2);
        g.fillRect(0, s*2/3, s, 2);
        g.fillRect(s/2, 0, 2, s/3);
        g.fillRect(s/4, s/3, 2, s/3);
        g.fillRect(s*3/4, s/3, 2, s/3);
        g.fillRect(s/2, s*2/3, 2, s/3);
        
        g.fillStyle(GAME_CONFIG.colors.wallTop);
        g.fillRect(0, 0, s, 4);
        
        g.fillStyle(GAME_CONFIG.colors.wallDark);
        g.fillRect(0, s - 3, s, 3);
        
        g.generateTexture('wall', s, s);
        g.destroy();
    }
    
    // BLUE player character
    generatePlayer() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const s = this.size + 8;
        const c = s / 2;
        
        // Shadow
        g.fillStyle(0x000000, 0.3);
        g.fillEllipse(c, c + 6, s - 12, 12);
        
        // Body - BLUE
        g.fillStyle(GAME_CONFIG.colors.playerBodyDark);
        g.fillEllipse(c, c + 4, s - 12, s - 14);
        g.fillStyle(GAME_CONFIG.colors.playerBody);
        g.fillEllipse(c, c + 2, s - 14, s - 16);
        
        // Head - BLUE
        g.fillStyle(GAME_CONFIG.colors.playerBodyDark);
        g.fillCircle(c, c - 6, 12);
        g.fillStyle(GAME_CONFIG.colors.playerBody);
        g.fillCircle(c, c - 7, 11);
        
        // Face highlight
        g.fillStyle(GAME_CONFIG.colors.playerBodyLight);
        g.fillCircle(c, c - 9, 7);
        
        // Eyes
        g.fillStyle(GAME_CONFIG.colors.playerEyes);
        g.fillCircle(c - 4, c - 8, 3);
        g.fillCircle(c + 4, c - 8, 3);
        
        // Pupils
        g.fillStyle(0x000000);
        g.fillCircle(c - 4, c - 8, 1.5);
        g.fillCircle(c + 4, c - 8, 1.5);
        
        // Smile
        g.lineStyle(2, 0x2471a3);
        g.beginPath();
        g.arc(c, c - 3, 4, 0.3, Math.PI - 0.3);
        g.strokePath();
        
        g.generateTexture('player', s, s);
        g.destroy();
    }
    
    // HELPDESK with friendly red human receptionist
    generateHelpdesk() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 4;
        const h = this.size * 3.5;
        
        // Shadow
        g.fillStyle(0x000000, 0.4);
        g.fillRoundedRect(10, 20, w - 10, h - 16, 10);
        
        // Desk base - rich wood
        g.fillStyle(0x5d4037);
        g.fillRoundedRect(0, h - 44, w - 8, 40, 8);
        
        // Desk front panel
        g.fillStyle(0x4e342e);
        g.fillRoundedRect(6, h - 40, w - 20, 34, 6);
        
        // Desk detail lines
        g.fillStyle(0x3e2723);
        g.fillRect(10, h - 30, w - 28, 2);
        g.fillRect(10, h - 20, w - 28, 2);
        
        // Desk top surface
        g.fillStyle(0x8d6e63);
        g.fillRect(0, h - 48, w - 8, 6);
        
        // === RED HUMAN RECEPTIONIST ===
        const rx = w / 2 - 4;
        const ry = h - 70;
        
        // Body - red shirt
        g.fillStyle(0xc0392b);
        g.fillEllipse(rx, ry + 22, 32, 28);
        g.fillStyle(0xe74c3c);
        g.fillEllipse(rx, ry + 20, 30, 26);
        
        // Neck
        g.fillStyle(0xe74c3c);
        g.fillRect(rx - 6, ry + 2, 12, 10);
        
        // Head - red
        g.fillStyle(0xc0392b);
        g.fillCircle(rx, ry - 4, 18);
        g.fillStyle(0xe74c3c);
        g.fillCircle(rx, ry - 5, 17);
        
        // Face highlight
        g.fillStyle(0xec7063);
        g.fillCircle(rx, ry - 7, 12);
        
        // Eyes - simple white with black pupils
        g.fillStyle(0xffffff);
        g.fillCircle(rx - 6, ry - 8, 4);
        g.fillCircle(rx + 6, ry - 8, 4);
        
        // Pupils
        g.fillStyle(0x000000);
        g.fillCircle(rx - 5, ry - 8, 2);
        g.fillCircle(rx + 5, ry - 8, 2);
        
        // Simple smile
        g.lineStyle(2, 0x922b21);
        g.beginPath();
        g.arc(rx, ry + 2, 6, 0.3, Math.PI - 0.3);
        g.strokePath();
        
        // Arms resting on desk
        g.fillStyle(0xe74c3c);
        g.fillEllipse(rx - 22, ry + 32, 14, 8);
        g.fillEllipse(rx + 22, ry + 32, 14, 8);
        
        // Hands
        g.fillStyle(0xec7063);
        g.fillCircle(rx - 28, ry + 32, 5);
        g.fillCircle(rx + 28, ry + 32, 5);
        
        // === DESK ITEMS ===
        
        // Name plate - "HELPDESK"
        g.fillStyle(0xf39c12);
        g.fillRoundedRect(rx - 28, h - 38, 56, 14, 3);
        g.fillStyle(0xf1c40f);
        g.fillRoundedRect(rx - 26, h - 36, 52, 10, 2);
        g.fillStyle(0x2c3e50);
        g.fillRect(rx - 22, h - 34, 44, 6);
        
        // Small plant on desk
        g.fillStyle(0xd35400);
        g.fillRect(w - 36, h - 56, 12, 10);
        g.fillStyle(0x27ae60);
        g.fillCircle(w - 30, h - 60, 8);
        
        // Coffee mug
        g.fillStyle(0xecf0f1);
        g.fillRect(12, h - 54, 10, 12);
        g.fillStyle(0x3498db);
        g.fillRect(12, h - 54, 10, 4);
        
        // === SPEECH BUBBLE ===
        g.fillStyle(0xffffff);
        g.fillRoundedRect(rx + 24, ry - 40, 44, 30, 8);
        
        // Bubble tail
        g.beginPath();
        g.moveTo(rx + 28, ry - 10);
        g.lineTo(rx + 22, ry - 14);
        g.lineTo(rx + 34, ry - 14);
        g.closePath();
        g.fill();
        
        // "Hi!" dots in bubble
        g.fillStyle(0xe74c3c);
        g.fillCircle(rx + 36, ry - 28, 4);
        g.fillCircle(rx + 46, ry - 28, 4);
        g.fillCircle(rx + 56, ry - 28, 4);
        
        g.generateTexture('helpdesk', w, h);
        g.destroy();
    }
    
    generateResumeStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRoundedRect(0, h - 30, w - 6, 26, 4);
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 10, h - 56, 14, 30);
        
        g.fillStyle(GAME_CONFIG.colors.resumeColor);
        g.fillRoundedRect(4, 4, w - 14, h - 60, 6);
        
        // Document
        g.fillStyle(0xffffff);
        g.fillRoundedRect(w/2 - 20, 12, 34, 44, 3);
        
        // Person icon
        g.fillStyle(GAME_CONFIG.colors.resumeColor);
        g.fillCircle(w/2 - 6, 22, 6);
        g.fillEllipse(w/2 - 6, 34, 10, 8);
        
        // Text lines
        g.fillStyle(0xbdc3c7);
        g.fillRect(w/2 + 2, 20, 10, 2);
        g.fillRect(w/2 + 2, 26, 8, 2);
        g.fillRect(w/2 - 16, 44, 26, 2);
        g.fillRect(w/2 - 16, 50, 22, 2);
        
        g.generateTexture('resume', w, h);
        g.destroy();
    }
    
    generateSocialStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRoundedRect(0, h - 30, w - 6, 26, 4);
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 10, h - 56, 14, 30);
        
        g.fillStyle(GAME_CONFIG.colors.socialColor);
        g.fillRoundedRect(4, 4, w - 14, h - 60, 6);
        
        // People network
        g.fillStyle(0xffffff);
        g.fillCircle(w/2 - 3, 30, 10);
        g.fillCircle(w/2 - 3, 24, 6);
        g.fillCircle(w/2 - 22, 45, 8);
        g.fillCircle(w/2 - 22, 40, 5);
        g.fillCircle(w/2 + 16, 45, 8);
        g.fillCircle(w/2 + 16, 40, 5);
        
        g.lineStyle(3, 0xffffff, 0.7);
        g.lineBetween(w/2 - 3, 35, w/2 - 18, 42);
        g.lineBetween(w/2 - 3, 35, w/2 + 12, 42);
        
        g.generateTexture('social', w, h);
        g.destroy();
    }
    
    generateProjectsStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRoundedRect(0, h - 30, w - 6, 26, 4);
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 10, h - 56, 14, 30);
        
        g.fillStyle(GAME_CONFIG.colors.projectsColor);
        g.fillRoundedRect(4, 4, w - 14, h - 60, 6);
        
        // Code window
        g.fillStyle(0x2c3e50);
        g.fillRoundedRect(10, 12, w - 26, 52, 4);
        g.fillStyle(0x34495e);
        g.fillRect(10, 12, w - 26, 10);
        
        // Window buttons
        g.fillStyle(0xe74c3c);
        g.fillCircle(16, 17, 3);
        g.fillStyle(0xf39c12);
        g.fillCircle(24, 17, 3);
        g.fillStyle(0x2ecc71);
        g.fillCircle(32, 17, 3);
        
        // Code lines
        g.fillStyle(0x9b59b6);
        g.fillRect(14, 28, 16, 3);
        g.fillStyle(0x3498db);
        g.fillRect(32, 28, 20, 3);
        g.fillStyle(0xf39c12);
        g.fillRect(18, 36, 12, 3);
        g.fillStyle(0x2ecc71);
        g.fillRect(32, 36, 26, 3);
        
        g.generateTexture('projects', w, h);
        g.destroy();
    }
    
    generateSkillsStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.skillsColor);
        g.fillRoundedRect(4, 4, w - 14, h - 10, 8);
        
        g.fillStyle(0x2c3e50);
        g.fillRoundedRect(10, 12, w - 26, 44, 4);
        
        g.fillStyle(0x1a1a2e);
        g.fillRect(14, 16, w - 34, 36);
        
        // Skill bars
        const barColors = [0x2ecc71, 0x3498db, 0xf39c12, 0xe74c3c];
        barColors.forEach((color, i) => {
            const y = 20 + i * 9;
            g.fillStyle(0x34495e);
            g.fillRect(18, y, w - 42, 5);
            g.fillStyle(color);
            g.fillRect(18, y, 20 + Math.random() * 20, 5);
        });
        
        // Control panel
        g.fillStyle(0x1a1a2e);
        g.fillRoundedRect(10, 60, w - 26, 24, 4);
        
        g.fillStyle(0x7f8c8d);
        g.fillCircle(24, 72, 8);
        g.fillStyle(0xe74c3c);
        g.fillCircle(24, 70, 5);
        
        g.fillStyle(0x3498db);
        g.fillCircle(w - 28, 68, 5);
        g.fillStyle(0x2ecc71);
        g.fillCircle(w - 18, 72, 5);
        
        g.generateTexture('skills', w, h);
        g.destroy();
    }
    
    generateTimelineStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRoundedRect(0, h - 30, w - 6, 26, 4);
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 10, h - 56, 14, 30);
        
        g.fillStyle(GAME_CONFIG.colors.timelineColor);
        g.fillRoundedRect(4, 4, w - 14, h - 60, 6);
        
        // Hourglass
        g.fillStyle(0xffffff);
        g.beginPath();
        g.moveTo(w/2 - 16, 14);
        g.lineTo(w/2 + 10, 14);
        g.lineTo(w/2 - 3, 36);
        g.closePath();
        g.fill();
        
        g.beginPath();
        g.moveTo(w/2 - 16, 58);
        g.lineTo(w/2 + 10, 58);
        g.lineTo(w/2 - 3, 36);
        g.closePath();
        g.fill();
        
        // Sand
        g.fillStyle(0xf39c12);
        g.beginPath();
        g.moveTo(w/2 - 3, 36);
        g.lineTo(w/2 - 10, 54);
        g.lineTo(w/2 + 4, 54);
        g.closePath();
        g.fill();
        
        // Frame
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 18, 12, 30, 4);
        g.fillRect(w/2 - 18, 56, 30, 4);
        
        g.generateTexture('timeline', w, h);
        g.destroy();
    }
    
    generateTrophiesStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRoundedRect(0, 4, w - 6, h - 10, 6);
        
        g.fillStyle(0x2c3e50);
        g.fillRect(6, 10, w - 18, h - 24);
        
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(6, h/2, w - 18, 4);
        
        // Trophy
        g.fillStyle(0xf1c40f);
        g.fillRect(w/2 - 20, 20, 14, 18);
        g.fillRect(w/2 - 22, 16, 18, 6);
        g.fillStyle(0xf39c12);
        g.fillCircle(w/2 - 22, 28, 4);
        g.fillCircle(w/2 - 6, 28, 4);
        
        // Medal
        g.fillStyle(0xe74c3c);
        g.fillRect(w/2 + 6, 18, 8, 14);
        g.fillStyle(0xf1c40f);
        g.fillCircle(w/2 + 10, 38, 8);
        
        g.generateTexture('trophies', w, h);
        g.destroy();
    }
    
    generateContactStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 6, h - 60, 8, 56);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRoundedRect(w/2 - 16, h - 24, 28, 20, 4);
        
        g.fillStyle(GAME_CONFIG.colors.contactColor);
        g.fillRoundedRect(8, 16, w - 22, 48, 8);
        
        g.fillStyle(0xc0392b);
        g.fillEllipse(w/2 - 3, 18, w - 28, 20);
        
        // Mail slot
        g.fillStyle(0x2c3e50);
        g.fillRoundedRect(14, 34, w - 34, 10, 2);
        
        // Envelope
        g.fillStyle(0xffffff);
        g.fillRect(12, 50, 24, 16);
        g.fillStyle(0xecf0f1);
        g.beginPath();
        g.moveTo(12, 50);
        g.lineTo(24, 60);
        g.lineTo(36, 50);
        g.closePath();
        g.fill();
        
        g.generateTexture('contact', w, h);
        g.destroy();
    }
    
    // About Me stall - Person with info
    generateAboutMeStall() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2.5;
        const h = this.size * 3;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRoundedRect(6, 10, w - 6, h - 6, 6);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRoundedRect(0, h - 30, w - 6, 26, 4);
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 10, h - 56, 14, 30);
        
        // Blue/teal background
        g.fillStyle(0x17a2b8);
        g.fillRoundedRect(4, 4, w - 14, h - 60, 6);
        
        // Person silhouette (larger, centered)
        g.fillStyle(0xffffff);
        g.fillCircle(w/2 - 3, 24, 12);
        g.fillEllipse(w/2 - 3, 46, 20, 16);
        
        // Info "i" symbol
        g.fillStyle(0xf1c40f);
        g.fillCircle(w - 22, 18, 8);
        g.fillStyle(0x17a2b8);
        g.fillRect(w - 24, 14, 4, 4);
        g.fillRect(w - 24, 20, 4, 8);
        
        // Decorative lines (like a bio card)
        g.fillStyle(0xffffff, 0.6);
        g.fillRect(14, 60, w - 34, 2);
        g.fillRect(14, 66, w - 40, 2);
        
        g.generateTexture('aboutMe', w, h);
        g.destroy();
    }
    
    generateInteractionGlow() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const s = this.size * 3;
        const c = s / 2;
        
        g.fillStyle(0x4ade80, 0.05);
        g.fillCircle(c, c, s / 2);
        g.fillStyle(0x4ade80, 0.1);
        g.fillCircle(c, c, s / 2 - 12);
        g.fillStyle(0x4ade80, 0.15);
        g.fillCircle(c, c, s / 2 - 24);
        g.fillStyle(0x4ade80, 0.2);
        g.fillCircle(c, c, s / 2 - 36);
        
        g.generateTexture('glow', s, s);
        g.destroy();
    }
    
    generateTorch() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size;
        const h = this.size * 1.5;
        
        g.fillStyle(GAME_CONFIG.colors.stone);
        g.fillRect(w/2 - 3, h/2, 6, h/2);
        g.fillRect(w/2 - 8, h/2, 16, 6);
        
        g.fillStyle(GAME_CONFIG.colors.torchWood);
        g.fillRect(w/2 - 4, 12, 8, h/2);
        
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(w/2 - 5, 10, 10, 6);
        
        g.fillStyle(GAME_CONFIG.colors.fireRed);
        g.fillEllipse(w/2, 10, 14, 10);
        g.fillStyle(GAME_CONFIG.colors.fireOrange);
        g.fillEllipse(w/2, 8, 10, 12);
        g.fillStyle(GAME_CONFIG.colors.fireYellow);
        g.fillEllipse(w/2, 4, 6, 10);
        
        g.fillStyle(GAME_CONFIG.colors.fireYellow, 0.2);
        g.fillCircle(w/2, 8, 16);
        
        g.generateTexture('torch', w, h);
        g.destroy();
    }
    
    generateTree() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2;
        const h = this.size * 2.5;
        
        g.fillStyle(0x000000, 0.3);
        g.fillEllipse(w/2, h - 8, w - 16, 16);
        
        g.fillStyle(0x8d6e63);
        g.fillRect(w/2 - 14, h - 24, 28, 20);
        g.fillStyle(0x6d4c41);
        g.fillRect(w/2 - 16, h - 28, 32, 6);
        
        g.fillStyle(0x4e342e);
        g.fillEllipse(w/2, h - 24, 24, 8);
        
        g.fillStyle(GAME_CONFIG.colors.treeTrunk);
        g.fillRect(w/2 - 4, h - 50, 8, 30);
        
        g.fillStyle(GAME_CONFIG.colors.treeLeaves);
        g.fillCircle(w/2, h - 55, 20);
        g.fillCircle(w/2 - 12, h - 45, 14);
        g.fillCircle(w/2 + 12, h - 45, 14);
        
        g.fillStyle(GAME_CONFIG.colors.treeLeavesLight);
        g.fillCircle(w/2, h - 60, 14);
        
        g.generateTexture('tree', w, h);
        g.destroy();
    }
    
    generatePottedPlant() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const s = this.size;
        
        g.fillStyle(0x000000, 0.3);
        g.fillEllipse(s/2, s - 4, s - 8, 8);
        
        g.fillStyle(0xd35400);
        g.fillRect(s/2 - 8, s - 16, 16, 14);
        g.fillStyle(0xe67e22);
        g.fillRect(s/2 - 10, s - 18, 20, 4);
        
        g.fillStyle(0x27ae60);
        g.fillEllipse(s/2, s - 22, 6, 10);
        g.fillEllipse(s/2 - 8, s - 20, 5, 8);
        g.fillEllipse(s/2 + 8, s - 20, 5, 8);
        
        g.generateTexture('plant', s, s);
        g.destroy();
    }
    
    generateRug() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 8;
        const h = this.size * 5;
        
        g.fillStyle(GAME_CONFIG.colors.rugRed);
        g.fillRoundedRect(0, 0, w, h, 4);
        
        g.fillStyle(GAME_CONFIG.colors.rugGold);
        g.fillRoundedRect(8, 8, w - 16, h - 16, 3);
        
        g.fillStyle(GAME_CONFIG.colors.rugPattern);
        g.fillRoundedRect(16, 16, w - 32, h - 32, 2);
        
        g.fillStyle(GAME_CONFIG.colors.rugGold);
        g.beginPath();
        g.moveTo(w/2, h/2 - 20);
        g.lineTo(w/2 + 30, h/2);
        g.lineTo(w/2, h/2 + 20);
        g.lineTo(w/2 - 30, h/2);
        g.closePath();
        g.fill();
        
        g.generateTexture('rug', w, h);
        g.destroy();
    }
    
    generateBookshelf() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const w = this.size * 2;
        const h = this.size * 2;
        
        g.fillStyle(0x000000, 0.3);
        g.fillRect(6, 8, w - 6, h - 4);
        
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(0, 0, w - 4, h - 6);
        
        g.fillStyle(GAME_CONFIG.colors.wood);
        g.fillRect(4, 4, w - 12, h - 14);
        
        g.fillStyle(GAME_CONFIG.colors.woodDark);
        g.fillRect(4, h/2, w - 12, 4);
        
        const bookColors = [0x3498db, 0xe74c3c, 0x27ae60, 0xf39c12, 0x9b59b6];
        let x = 8;
        bookColors.forEach((color) => {
            const bw = 6 + Math.random() * 4;
            const bh = 18 + Math.random() * 6;
            g.fillStyle(color);
            g.fillRect(x, h/2 - bh - 2, bw, bh);
            x += bw + 2;
        });
        
        g.generateTexture('bookshelf', w, h);
        g.destroy();
    }
    
    generateFireParticle() {
        const g = this.scene.make.graphics({ x: 0, y: 0, add: false });
        const s = 8;
        g.fillStyle(0xffffff);
        g.fillCircle(s/2, s/2, s/2);
        g.generateTexture('fireParticle', s, s);
        g.destroy();
    }
}

window.SpriteGenerator = SpriteGenerator;
