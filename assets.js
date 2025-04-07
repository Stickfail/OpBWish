
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

// Asset Lists
const assets = {
    characterCards: {
        "3star": [
            'Assets/Characters/3Star/poop_3_star.png'
        ],
        "4star": [
            'Assets/Characters/4Star/Cheerio_4_star.png',
            'Assets/Characters/4Star/Focalors_4_star.png',
            'Assets/Characters/4Star/Kanade_4_star.png'
        ],
        "5star": [
            'Assets/Characters/5Star/Cheerio_5_star.png',
            'Assets/Characters/5Star/Kanade_5_star.png'
            // TODO: Add Focalors 5 star when available
        ]
    },
    bannerArt: [
        'Assets/bannerArt/cheerio.png',
        'Assets/bannerArt/focalors.png'
    ],
    wishAnimations: [
        'Assets/shitimation/bestWish.gif',
        'Assets/shitimation/goodWish.gif',
        'Assets/shitimation/shitWish.gif'
    ],
    other: [
        'Assets/other/explosion.png'
    ]
};

// TODO: Add your character data here! Follow this format:
// const characterData = {
//     "Cheerio": { description: "...", element: "...", weapon: "..." },
//     "Focalors": { description: "...", element: "...", weapon: "..." },
//     ...
// };

// Preloader Functions
async function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

async function preloadVideo(src) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.oncanplaythrough = () => resolve(video);
        video.onerror = reject;
        video.src = src;
    });
}

// Main preloader
async function preloadAssets(progressCallback) {
    const total = Object.values(assets.characterCards).flat().length + 
                 assets.bannerArt.length + 
                 assets.wishAnimations.length;
    let loaded = 0;

    try {
        // Preload character cards
        for (const rarity in assets.characterCards) {
            for (const path of assets.characterCards[rarity]) {
                await preloadImage(path);
                loaded++;
                progressCallback?.(loaded / total);
            }
        }

        // Preload banner art
        for (const path of assets.bannerArt) {
            await preloadImage(path);
            loaded++;
            progressCallback?.(loaded / total);
        }

        // Preload animations
        for (const path of assets.wishAnimations) {
            await preloadVideo(path);
            loaded++;
            progressCallback?.(loaded / total);
        }

        return PRELOAD_STATES.READY;
    } catch (error) {
        console.error('Asset preloading failed:', error);
        return PRELOAD_STATES.ERROR;
    }
}

// Export interface
export {
    preloadAssets,
    assets,
    PRELOAD_STATES,
    ASSET_TYPES
};
