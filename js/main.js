// === MAIN GAME INITIALIZATION ===

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Phaser game configuration
    const config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: 1920,
        height: 1080,
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: [BootScene, GameScene],
        scale: {
            mode: Phaser.Scale.NONE
        },
        render: {
            antialias: false,
            pixelArt: true,
            roundPixels: true
        },
        backgroundColor: '#1a1a2e'
    };
    
    // Create the game
    const game = new Phaser.Game(config);
    
    // Make game globally accessible
    window.game = game;
    
    console.log('🎮 Portfolio Game Initialized!');
    console.log('📋 Controls: WASD or Arrow Keys to move, E to interact');
    console.log('🐐 Secret: Type "gggoat" for a surprise!');
});
