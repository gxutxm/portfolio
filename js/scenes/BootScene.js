// === BOOT SCENE ===
// Handles loading and sprite generation

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }
    
    preload() {
        // Nothing to preload - we generate everything!
    }
    
    create() {
        try {
            // Generate all sprites procedurally
            const spriteGen = new SpriteGenerator(this);
            spriteGen.generateAll();
            
            // Short delay to show loading screen
            this.time.delayedCall(800, () => {
                // Hide loading screen
                const loadingScreen = document.getElementById('loading-screen');
                loadingScreen.classList.add('hidden');
                
                // Start game scene
                this.scene.start('GameScene');
            });
        } catch (error) {
            console.error('Error in BootScene:', error);
            // Show error to user
            const loadingHint = document.querySelector('.loading-hint');
            if (loadingHint) {
                loadingHint.textContent = 'Error loading game: ' + error.message;
                loadingHint.style.color = '#ff6b6b';
            }
        }
    }
}

window.BootScene = BootScene;
