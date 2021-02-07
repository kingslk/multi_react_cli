const META = {
    common: {
        'X-UA-Compatible': {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge'
        },
        Expires: {
            'http-equiv': 'Expires',
            content: '0'
        },
        Pragma: {
            'http-equiv': 'Pragma',
            content: 'no-cache'
        },
        'Cache-control': {
            'http-equiv': 'Cache-control',
            content: 'no-cache'
        },
        Cache: {
            'http-equiv': 'Cache',
            content: 'no-cache'
        }
    },
    moble: {
        viewport: {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0'
        },
        'x5-fullscreen': {
            name: 'x5-fullscreen',
            content: 'true'
        }
    }
};

const title = {
    test: 'multi test'
};
module.exports = {
    META,
    title
};
