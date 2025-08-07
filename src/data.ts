interface item {
    name: string,
    link: string,
    img: string
}

interface dataInterface {
    textImg: string;
    development: item[],
    media: item[],
    quickstart: item[]
}

export const data: dataInterface = {
    textImg: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546140.jpg?semt=ais_hybrid&w=740&q=80',
    development: [
        {
            name: 'GitHub',
            link: 'https://github.com/',
            img: 'https://cdn-icons-png.flaticon.com/256/25/25231.png'
        },
        {
            name: 'Dribbble',
            link: 'https://dribbble.com',
            img: 'https://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Dribbble-icon.png'
        },
        {
            name: 'Framer Motion Examples',
            link: 'https://framermotionexamples.com/',
            img: 'https://www.ejable.com/wp-content/uploads/2022/04/Framer-Motion-1200x1159.webp'
        }
    ],
    media: [
        {
            name: 'IMDb',
            link: 'https://imdb.com/',
            img: 'https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg'
        },
        {
            name: 'Stremio',
            link: 'stremio://',
            img: 'https://open-store.io/icons/stremio.jhayproject/stremio.jhayproject-1.0.0.png'
        },
        {
            name: 'P-Stream',
            link: 'https://pstream.mov/',
            img: 'https://pstream.mov/apple-touch-icon.png?v=2'
        }
    ],
    quickstart: [
        {
            name: 'YouTube',
            link: 'https://youtube.com/',
            img: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png'
        },
        {
            name: 'Kimi',
            link: 'https://kimi.com/',
            img: 'https://www.toolpilot.ai/cdn/shop/files/988aea881aa97e3236a25f08c7f84efc.png?v=1752369325'
        },
        {
            name: "Apple Music",
            link: 'https://music.apple.com/',
            img: 'https://help.apple.com/assets/679AC66B6FBB32042D0B438B/679AC66C701C3B09880E6E54/en_US/14afc11a08e3fe617b2404ee08a0d0af.png'
        }
    ]
}