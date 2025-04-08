// Asset Categories and Types
const ASSET_TYPES = {
    CHARACTER: 'character',
    BANNER: 'banner',
    ANIMATION: 'animation'
};

// Preload States
const PRELOAD_STATES = {
    LOADING: 'loading',
    READY: 'ready',
    ERROR: 'error'
};

// Asset Manager Class
class AssetManager {
    constructor() {
        this.assets = {
            characterCards: {},
            bannerArt: {},
            animations: {},
            other: {}
        };
        this.loadingPromises = [];
    }

    async preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    async preloadVideo(src) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.oncanplaythrough = () => resolve(video);
            video.onerror = reject;
            video.src = src;
            video.load();
        });
    }

    async loadInitialAssets() {
        const promises = [];

        // Load banner art
        const bannerArtFiles = ['cheerio.png', 'focalors.png'];
        for (const file of bannerArtFiles) {
            promises.push(
                this.preloadImage(`Assets/bannerArt/${file}`)
                    .then(img => this.assets.bannerArt[file] = img)
            );
        }

        // Load animations
        const animationFiles = ['bestWish.mp4', 'goodWish.mp4', 'shitWish.mp4']; //Updated to mp4
        for (const file of animationFiles) {
            promises.push(
                this.preloadVideo(`Assets/shitimation/${file}`)
                    .then(video => this.assets.animations[file] = video)
            );
        }

        // Load other assets
        promises.push(
            this.preloadImage('Assets/other/explosion.png')
                .then(img => this.assets.other['explosion.png'] = img)
        );

        return Promise.all(promises);
    }

    async loadCharacterAssets(characters) {
        const promises = [];

        for (const char of characters) {
            const path = `Assets/Characters/${char.rarity}Star/${char.filename}`;
            if (!this.assets.characterCards[path]) {
                promises.push(
                    this.preloadImage(path)
                        .then(img => this.assets.characterCards[path] = img)
                );
            }
        }

        return Promise.all(promises);
    }

    unloadCharacterAssets() {
        this.assets.characterCards = {};
    }

    getLoadingProgress() {
        const total = this.loadingPromises.length;
        const completed = this.loadingPromises.filter(p => p.status === 'fulfilled').length;
        return total > 0 ? completed / total : 1;
    }
}

const assetManager = new AssetManager();

// Example usage (Illustrative):
// const charactersToLoad = [
//     { rarity: 3, filename: 'poop_3_star.png' },
//     { rarity: 4, filename: 'Cheerio_4_star.png' },
//     // ...more characters
// ];

// async function loadAll() {
//     await assetManager.loadInitialAssets();
//     await assetManager.loadCharacterAssets(charactersToLoad);
//     console.log("Assets Loaded:", assetManager.assets);
// }


// loadAll();

export { assetManager, ASSET_TYPES, PRELOAD_STATES };
