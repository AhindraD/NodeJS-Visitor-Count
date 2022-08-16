const http = require('http');
const fs = require('fs');
let count = 0;

const server = http.createServer((req, res) => {
    let path = '';
    count++;
    if (req.url === '/style.css') {
        res.setHeader("Content-Type", "text/css");
        fs.readFile('./views/style.css', { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.log('Error', err.message)
                res.write('Error', err.message)
                res.end()
            }
            res.write(data)
            res.end()
        })
    }
    else {
        switch (req.url) {

            case '/':
                path += './Views/home.html'
                break;

            case '/home':
                path += './Views/home.html'
                break;

            case '/contact':
                path += './Views/contact.html'
                break;

            case '/products':
                path += './Views/products.html'
                break;

            default:
                path += './Views/home.html'
                break;
        }
        fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.log('error', err.message)
                res.write('Server Error' + err.message)
                res.end()
            }
            res.write(data)
            res.write(`
            <script>
            document.querySelector(".counter").innerHTML = "💠Website Visited: ${count} times";
            </script>
            `)
            res.end()
        })
    }
})

const PORT = 8000;
server.listen(PORT, () => {
    console.log('SERVER is running on http://localhost:' + PORT);
})