function checkConnectionCondition(uri) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        fetch(uri)
            .then(() => {
                // Time difference of accessing the website
                const duration = Date.now() - startTime;
                if (duration <= 500) {
                    resolve('good');
                } else if (duration <= 5000) {
                    resolve('fine');
                } else {
                    resolve('terrible');
                }
            }).catch(() => resolve('terrible'));
    });
}

// Try to access my personal website
checkConnectionCondition('https://xiluo.net').then(console.log);


