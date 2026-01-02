// === MAIN GAME SCENE ===

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.interactionHint = null;
        this.currentInteractable = null;
        this.stalls = [];
        this.torches = [];
        this.interactKey = null;
        this.cheatBuffer = '';
        this.isDancing = false;
    }
    
    create() {
        try {
            this.createRoom();
            this.createPathways();
            this.createFloorTitle();
            this.createDecorations();
            this.createStalls();
            this.createPlayer();
            this.setupControls();
            this.setupCollisions();
            this.setupCheatCode();
            
            this.interactionHint = document.getElementById('interaction-hint');
            
            // Camera - show entire room, no following
            this.cameras.main.setZoom(1);
            this.cameras.main.centerOn(
                GAME_CONFIG.roomWidth * GAME_CONFIG.tileSize / 2, 
                GAME_CONFIG.roomHeight * GAME_CONFIG.tileSize / 2
            );
            
            this.createAmbientParticles();
            this.animateTorches();
            
            // Ensure game has keyboard focus
            this.input.keyboard.enabled = true;
            this.game.canvas.focus();
            
            // Click anywhere to ensure focus
            this.input.on('pointerdown', () => {
                this.game.canvas.focus();
            });
            
        } catch (error) {
            console.error('Error in GameScene:', error);
        }
    }
    
    setupCheatCode() {
        // Listen for keyboard input for cheat code - use document level
        document.addEventListener('keydown', (event) => {
            // Don't track if typing in an input field
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                return;
            }
            
            // Only track letter keys for cheat code
            if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
                this.cheatBuffer += event.key.toLowerCase();
                
                // Keep only last 6 characters
                if (this.cheatBuffer.length > 6) {
                    this.cheatBuffer = this.cheatBuffer.slice(-6);
                }
                
                // Check for "gggoat" cheat code
                if (this.cheatBuffer === 'gggoat' && !this.isDancing) {
                    this.triggerDance();
                    this.cheatBuffer = '';
                }
            }
        });
    }
    
    triggerDance() {
        this.isDancing = true;
        
        // Stop any current movement
        this.player.setVelocity(0);
        
        // Flash text
        const danceText = this.add.text(this.player.x, this.player.y - 60, '🎉 GG GOAT! 🎉', {
            fontFamily: '"Press Start 2P"',
            fontSize: '16px',
            color: '#ffd700',
            stroke: '#000000',
            strokeThickness: 4,
        }).setOrigin(0.5).setDepth(100);
        
        // Animate text
        this.tweens.add({
            targets: danceText,
            y: danceText.y - 30,
            alpha: 0,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => danceText.destroy()
        });
        
        // Store original values
        const originalX = this.player.x;
        const originalY = this.player.y;
        const originalScaleX = this.player.scaleX;
        const originalScaleY = this.player.scaleY;
        
        // Stop breathing animation
        this.tweens.killTweensOf(this.player);
        
        // Spawn confetti particles
        for (let i = 0; i < 20; i++) {
            const confetti = this.add.circle(
                this.player.x + Phaser.Math.Between(-50, 50),
                this.player.y - 40,
                Phaser.Math.Between(3, 6),
                Phaser.Math.RND.pick([0xffd700, 0xe74c3c, 0x3498db, 0x2ecc71, 0x9b59b6])
            ).setDepth(99);
            
            this.tweens.add({
                targets: confetti,
                y: confetti.y + Phaser.Math.Between(80, 150),
                x: confetti.x + Phaser.Math.Between(-40, 40),
                alpha: 0,
                duration: Phaser.Math.Between(800, 1500),
                ease: 'Quad.easeOut',
                onComplete: () => confetti.destroy()
            });
        }
        
        // Camera shake
        this.cameras.main.shake(200, 0.005);
        
        // Simple sequential dance using delays
        this.time.delayedCall(0, () => {
            this.tweens.add({ targets: this.player, x: originalX - 30, y: originalY - 20, duration: 150 });
        });
        this.time.delayedCall(150, () => {
            this.tweens.add({ targets: this.player, y: originalY, duration: 150 });
        });
        this.time.delayedCall(300, () => {
            this.tweens.add({ targets: this.player, x: originalX + 30, y: originalY - 20, duration: 150 });
        });
        this.time.delayedCall(450, () => {
            this.tweens.add({ targets: this.player, y: originalY, duration: 150 });
        });
        this.time.delayedCall(600, () => {
            this.player.scaleX = -originalScaleX;
        });
        this.time.delayedCall(700, () => {
            this.player.scaleX = originalScaleX;
        });
        this.time.delayedCall(800, () => {
            this.player.scaleX = -originalScaleX;
        });
        this.time.delayedCall(900, () => {
            this.player.scaleX = originalScaleX;
            this.tweens.add({ targets: this.player, x: originalX, duration: 100 });
        });
        this.time.delayedCall(1000, () => {
            this.tweens.add({ targets: this.player, y: originalY - 40, duration: 200 });
        });
        this.time.delayedCall(1200, () => {
            this.tweens.add({ targets: this.player, y: originalY, duration: 300, ease: 'Bounce.easeOut' });
        });
        this.time.delayedCall(1500, () => {
            this.tweens.add({ targets: this.player, x: originalX - 15, duration: 80 });
        });
        this.time.delayedCall(1580, () => {
            this.tweens.add({ targets: this.player, x: originalX + 15, duration: 80 });
        });
        this.time.delayedCall(1660, () => {
            this.tweens.add({ targets: this.player, x: originalX - 15, duration: 80 });
        });
        this.time.delayedCall(1740, () => {
            this.tweens.add({ targets: this.player, x: originalX + 15, duration: 80 });
        });
        this.time.delayedCall(1820, () => {
            this.tweens.add({ targets: this.player, x: originalX, duration: 80 });
        });
        
        // End dance after all moves
        this.time.delayedCall(2000, () => {
            this.isDancing = false;
            this.player.x = originalX;
            this.player.y = originalY;
            this.player.scaleX = originalScaleX;
            this.player.scaleY = originalScaleY;
            
            // Restart breathing animation
            this.tweens.add({
                targets: this.player,
                scaleY: originalScaleY * 0.96,
                duration: 400,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    createRoom() {
        const tileSize = GAME_CONFIG.tileSize;
        const roomW = GAME_CONFIG.roomWidth;
        const roomH = GAME_CONFIG.roomHeight;
        
        // Floor
        for (let x = 0; x < roomW; x++) {
            for (let y = 0; y < roomH; y++) {
                this.add.image(
                    x * tileSize + tileSize/2, 
                    y * tileSize + tileSize/2, 
                    'floor'
                ).setDepth(0);
            }
        }
        
        // Walls - only around perimeter
        this.walls = this.physics.add.staticGroup();
        
        // Top wall (2 rows)
        for (let x = 0; x < roomW; x++) {
            this.walls.create(x * tileSize + tileSize/2, tileSize/2, 'wall').setDepth(1);
            this.walls.create(x * tileSize + tileSize/2, tileSize + tileSize/2, 'wall').setDepth(1);
        }
        
        // Bottom wall
        for (let x = 0; x < roomW; x++) {
            this.walls.create(x * tileSize + tileSize/2, (roomH - 1) * tileSize + tileSize/2, 'wall').setDepth(1);
        }
        
        // Left wall
        for (let y = 2; y < roomH - 1; y++) {
            this.walls.create(tileSize/2, y * tileSize + tileSize/2, 'wall').setDepth(1);
        }
        
        // Right wall
        for (let y = 2; y < roomH - 1; y++) {
            this.walls.create((roomW - 1) * tileSize + tileSize/2, y * tileSize + tileSize/2, 'wall').setDepth(1);
        }
    }
    
    createPathways() {
        const tileSize = GAME_CONFIG.tileSize;
        const centerX = Math.floor(GAME_CONFIG.roomWidth / 2);
        const centerY = Math.floor(GAME_CONFIG.roomHeight / 2);
        const pathPositions = [];
        
        // Main horizontal path (wider)
        for (let x = 3; x < GAME_CONFIG.roomWidth - 3; x++) {
            for (let dy = -2; dy <= 2; dy++) {
                pathPositions.push({ x: x, y: centerY + dy });
            }
        }
        
        // Main vertical path (wider)
        for (let y = 4; y < GAME_CONFIG.roomHeight - 3; y++) {
            for (let dx = -2; dx <= 2; dx++) {
                pathPositions.push({ x: centerX + dx, y: y });
            }
        }
        
        // Draw path tiles
        pathPositions.forEach(pos => {
            this.add.image(
                pos.x * tileSize + tileSize/2,
                pos.y * tileSize + tileSize/2,
                'pathTile'
            ).setDepth(1);
        });
    }
    
    createFloorTitle() {
        const tileSize = GAME_CONFIG.tileSize;
        const centerX = STALL_POSITIONS.floorTitle.x * tileSize;
        const centerY = STALL_POSITIONS.floorTitle.y * tileSize;
        
        // Glow effect behind text
        const glow = this.add.graphics();
        glow.fillStyle(0xffd700, 0.15);
        glow.fillEllipse(centerX, centerY - 20, 320, 60);
        glow.setDepth(1);
        
        // Main title - BRIGHT and SHARP
        const titleStyle = {
            fontFamily: '"Press Start 2P"',
            fontSize: '28px',
            color: '#ffd700',
            stroke: '#8b4513',
            strokeThickness: 6,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#000000',
                blur: 8,
                fill: true
            }
        };
        
        const title = this.add.text(centerX, centerY - 20, "GG's PORTFOLIO", titleStyle)
            .setOrigin(0.5)
            .setDepth(3);
        
        // Add subtle glow animation
        this.tweens.add({
            targets: title,
            alpha: 0.9,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Small controls text under title
        const controlsStyle = {
            fontFamily: '"Press Start 2P"',
            fontSize: '8px',
            color: '#bdc3c7',
            stroke: '#2c3e50',
            strokeThickness: 3,
        };
        
        this.add.text(centerX, centerY + 25, 'WASD to move • E to interact', controlsStyle)
            .setOrigin(0.5)
            .setDepth(2)
            .setAlpha(0.85);
        
        // Decorative lines
        const g = this.add.graphics();
        g.lineStyle(3, 0xffd700, 0.6);
        g.lineBetween(centerX - 160, centerY + 45, centerX + 160, centerY + 45);
        g.lineStyle(1, 0xffd700, 0.3);
        g.lineBetween(centerX - 140, centerY + 52, centerX + 140, centerY + 52);
        g.setDepth(2);
    }
    
    createDecorations() {
        const tileSize = GAME_CONFIG.tileSize;
        const roomW = GAME_CONFIG.roomWidth;
        const roomH = GAME_CONFIG.roomHeight;
        
        // === TORCHES on walls ===
        const torchPositions = [
            // Top wall
            { x: 8, y: 2.5 }, { x: 20, y: 2.5 }, { x: 30, y: 2.5 }, 
            { x: 40, y: 2.5 }, { x: 52, y: 2.5 },
            // Bottom wall
            { x: 8, y: roomH - 1.5 }, { x: 20, y: roomH - 1.5 }, { x: 30, y: roomH - 1.5 },
            { x: 40, y: roomH - 1.5 }, { x: 52, y: roomH - 1.5 },
            // Side walls
            { x: 1.5, y: 9 }, { x: 1.5, y: 17 }, { x: 1.5, y: 25 },
            { x: roomW - 1.5, y: 9 }, { x: roomW - 1.5, y: 17 }, { x: roomW - 1.5, y: 25 },
        ];
        
        torchPositions.forEach(pos => {
            const torch = this.add.image(pos.x * tileSize, pos.y * tileSize, 'torch');
            torch.setDepth(5);
            this.torches.push(torch);
            
            // Fire particles
            this.add.particles(pos.x * tileSize, pos.y * tileSize - 12, 'fireParticle', {
                speed: { min: 20, max: 50 },
                angle: { min: 250, max: 290 },
                scale: { start: 0.4, end: 0 },
                lifespan: 600,
                frequency: 80,
                tint: 0xffd93d,
                blendMode: 'ADD'
            }).setDepth(6);
        });
        
        // === TREES in corners ===
        const treePositions = [
            { x: 4, y: 6 }, { x: 56, y: 6 },
            { x: 4, y: 28 }, { x: 56, y: 28 },
        ];
        
        treePositions.forEach(pos => {
            const tree = this.add.image(pos.x * tileSize, pos.y * tileSize, 'tree');
            tree.setDepth(8);
        });
        
        // === PLANTS scattered ===
        const plantPositions = [
            { x: 12, y: 4 }, { x: 48, y: 4 },
            { x: 12, y: 30 }, { x: 48, y: 30 },
            { x: 2, y: 13 }, { x: 2, y: 21 },
            { x: 58, y: 13 }, { x: 58, y: 21 },
        ];
        
        plantPositions.forEach(pos => {
            this.add.image(pos.x * tileSize, pos.y * tileSize, 'plant').setDepth(8);
        });
        
        // === BOOKSHELVES on top wall ===
        const bookshelfPositions = [
            { x: 12, y: 2.5 }, { x: 24, y: 2.5 }, 
            { x: 36, y: 2.5 }, { x: 48, y: 2.5 },
        ];
        
        bookshelfPositions.forEach(pos => {
            this.add.image(pos.x * tileSize, pos.y * tileSize, 'bookshelf').setDepth(3);
        });
        
        // === RUG in center ===
        this.add.image(
            STALL_POSITIONS.floorTitle.x * GAME_CONFIG.tileSize,
            STALL_POSITIONS.floorTitle.y * GAME_CONFIG.tileSize,
            'rug'
        ).setDepth(1).setAlpha(0.6);
    }
    
    animateTorches() {
        this.torches.forEach(torch => {
            this.tweens.add({
                targets: torch,
                alpha: 0.85,
                duration: 100 + Math.random() * 200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    createStalls() {
        const tileSize = GAME_CONFIG.tileSize;
        this.stallsGroup = this.physics.add.staticGroup();
        
        const stallTypes = [
            { key: 'resume', pos: STALL_POSITIONS.resume, label: '📄 RESUME', color: '#27ae60' },
            { key: 'aboutMe', pos: STALL_POSITIONS.aboutMe, label: '👤 ABOUT ME', color: '#17a2b8' },
            { key: 'social', pos: STALL_POSITIONS.social, label: '👥 SOCIAL', color: '#e91e63' },
            { key: 'projects', pos: STALL_POSITIONS.projects, label: '🚀 PROJECTS', color: '#9b59b6' },
            { key: 'skills', pos: STALL_POSITIONS.skills, label: '⚡ SKILLS', color: '#f39c12' },
            { key: 'timeline', pos: STALL_POSITIONS.timeline, label: '⏳ TIMELINE', color: '#00bcd4' },
            { key: 'trophies', pos: STALL_POSITIONS.trophies, label: '🏆 TROPHIES', color: '#ffc107' },
            { key: 'contact', pos: STALL_POSITIONS.contact, label: '✉️ CONTACT', color: '#e74c3c' },
        ];
        
        stallTypes.forEach(stall => {
            const x = stall.pos.x * tileSize;
            const y = stall.pos.y * tileSize;
            
            // Create stall as image only (no physics body blocking player)
            const stallSprite = this.add.image(x, y, stall.key);
            stallSprite.setScale(1.3);
            stallSprite.setData('type', stall.key);
            stallSprite.setData('label', stall.label);
            stallSprite.setDepth(10);
            
            const glow = this.add.image(x, y, 'glow').setAlpha(0).setDepth(9);
            stallSprite.setData('glow', glow);
            
            // Label
            this.add.text(x, y + 60, stall.label, {
                fontFamily: '"Press Start 2P"',
                fontSize: '10px',
                color: stall.color,
                stroke: '#000000',
                strokeThickness: 4,
            }).setOrigin(0.5).setDepth(15);
            
            // Hover animation
            this.tweens.add({
                targets: stallSprite,
                y: y - 4,
                duration: 1800 + Math.random() * 400,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.stalls.push(stallSprite);
        });
        
        // HELPDESK - CENTER RIGHT, easily accessible
        const helpdeskX = STALL_POSITIONS.helpdesk.x * tileSize;
        const helpdeskY = STALL_POSITIONS.helpdesk.y * tileSize;
        
        const helpdesk = this.add.image(helpdeskX, helpdeskY, 'helpdesk');
        helpdesk.setData('type', 'helpdesk');
        helpdesk.setData('label', '🎧 HELPDESK');
        helpdesk.setScale(1.2);
        helpdesk.setDepth(10);
        
        const helpdeskGlow = this.add.image(helpdeskX, helpdeskY, 'glow').setAlpha(0).setScale(2).setDepth(9);
        helpdesk.setData('glow', helpdeskGlow);
        
        // Pulsing label
        const helpdeskLabel = this.add.text(helpdeskX, helpdeskY + 75, '🎧 HELPDESK', {
            fontFamily: '"Press Start 2P"',
            fontSize: '12px',
            color: '#1abc9c',
            stroke: '#000000',
            strokeThickness: 5,
        }).setOrigin(0.5).setDepth(15);
        
        this.tweens.add({
            targets: helpdeskLabel,
            scale: 1.08,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        this.stalls.push(helpdesk);
    }
    
    createPlayer() {
        const tileSize = GAME_CONFIG.tileSize;
        
        // Start in center
        const startX = STALL_POSITIONS.floorTitle.x * tileSize;
        const startY = STALL_POSITIONS.floorTitle.y * tileSize + 80;
        
        this.player = this.physics.add.sprite(startX, startY, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(20);
        this.player.setScale(1.2);
        this.player.body.setSize(24, 24); // Smaller collision box
        
        // Shadow
        this.playerShadow = this.add.ellipse(startX, startY + 18, 28, 12, 0x000000, 0.3);
        this.playerShadow.setDepth(19);
        
        // Breathing animation
        this.tweens.add({
            targets: this.player,
            scaleY: 1.15,
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    setupControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
        
        this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.interactKey.on('down', () => this.tryInteract());
    }
    
    setupCollisions() {
        // Only collide with walls, not stalls
        this.physics.add.collider(this.player, this.walls);
    }
    
    createAmbientParticles() {
        this.add.particles(0, 0, 'fireParticle', {
            scale: { start: 0.12, end: 0 },
            alpha: { start: 0.3, end: 0 },
            speed: 12,
            lifespan: 6000,
            frequency: 400,
            tint: 0xffffff,
            emitZone: {
                type: 'random',
                source: new Phaser.Geom.Rectangle(
                    0, 0,
                    GAME_CONFIG.roomWidth * GAME_CONFIG.tileSize,
                    GAME_CONFIG.roomHeight * GAME_CONFIG.tileSize
                )
            }
        }).setDepth(50);
    }
    
    update() {
        if (window.modalManager && window.modalManager.isOpen) {
            this.player.setVelocity(0);
            return;
        }
        
        // Don't move while dancing
        if (this.isDancing) {
            return;
        }
        
        this.handleMovement();
        this.updateShadow();
        this.checkInteractables();
    }
    
    handleMovement() {
        // Don't handle movement if typing in an input field
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            this.player.setVelocity(0);
            return;
        }
        
        const speed = GAME_CONFIG.playerSpeed;
        let vx = 0;
        let vy = 0;
        
        if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -speed;
        else if (this.cursors.right.isDown || this.wasd.right.isDown) vx = speed;
        
        if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -speed;
        else if (this.cursors.down.isDown || this.wasd.down.isDown) vy = speed;
        
        if (vx !== 0 && vy !== 0) {
            vx *= 0.707;
            vy *= 0.707;
        }
        
        this.player.setVelocity(vx, vy);
    }
    
    updateShadow() {
        if (this.playerShadow) {
            this.playerShadow.x = this.player.x;
            this.playerShadow.y = this.player.y + 18;
        }
    }
    
    checkInteractables() {
        const interactionRange = 100; // Increased range
        let nearestStall = null;
        let nearestDist = interactionRange;
        
        this.stalls.forEach(stall => {
            const dist = Phaser.Math.Distance.Between(
                this.player.x, this.player.y, stall.x, stall.y
            );
            
            const glow = stall.getData('glow');
            if (glow) glow.setAlpha(0);
            
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestStall = stall;
            }
        });
        
        if (nearestStall) {
            this.currentInteractable = nearestStall;
            const glow = nearestStall.getData('glow');
            if (glow) glow.setAlpha(0.6);
            this.interactionHint.classList.remove('hidden');
        } else {
            this.currentInteractable = null;
            this.interactionHint.classList.add('hidden');
        }
    }
    
    tryInteract() {
        // Don't interact if typing in an input field
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            return;
        }
        
        if (!this.currentInteractable) return;
        if (window.modalManager && window.modalManager.isOpen) return;
        
        const type = this.currentInteractable.getData('type');
        this.cameras.main.shake(80, 0.003);
        
        if (type === 'helpdesk') {
            window.modalManager.openChatbot();
        } else {
            window.modalManager.openModal(type);
        }
    }
}

window.GameScene = GameScene;
