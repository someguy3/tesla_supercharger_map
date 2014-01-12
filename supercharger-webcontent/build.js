({
    baseUrl: 'project/scripts',
    name: 'main',
    out: 'main-built.js',
    include: 'requireLib',
    paths: {
        requireLib: 'require',
        jquery: 'empty:',
        jqueryui: 'empty:'
    }
})