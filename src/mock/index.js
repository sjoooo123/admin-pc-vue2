function importAll(r) {
    r.keys().forEach(key => {
        require('./data/'+key.split('/')[1]);
    });
}

importAll(require.context('./data', false, /\.js$/))


