const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    console.log('acho');
    res.jsonp(req.rawHeaders);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next();
});

server.use(router);
if (process.env.PORT == undefined) {
    process.env.PORT = 3000;
}

server.listen(process.env.PORT, () => {
    console.log('JSON Server esta vivoooo !!! na porta ' + process.env.PORT);
});