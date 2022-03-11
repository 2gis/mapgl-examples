function parseUrlQuery() {
    const options = {};
    location.search
        .slice(1)
        .split('&')
        .map((str) => str.split('='))
        .forEach((couple) => {
            const key = couple[0];
            const value = couple[1];

            if (value === undefined) {
                options[key] = true;
            } else if (!Number.isNaN(Number(value))) {
                options[key] = Number(value);
            } else if (value === 'true') {
                options[key] = true;
            } else if (value === 'false') {
                options[key] = false;
            } else {
                options[key] = value;
            }
        });
    return options;
}

function updateUrlQuery(options, defaultOptions) {
    let url = '';

    for (const key in options) {
        const value = options[key];
        const defaulValue = defaultOptions[key];

        if (value === defaulValue) {
            continue;
        }

        url += (url === '' ? '?' : '&') + key;
        if (value !== false) {
            url += '=' + value;
        }
    }

    history.replaceState({}, document.title, url);
}

function waitForNextFrame() {
    return new Promise((resolve) => requestAnimationFrame(resolve));
}
