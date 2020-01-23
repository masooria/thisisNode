const http = require("http");
const fs = require("fs");
console.log('server strated')
http.createServer(async (req, res) =>{
    try{
        let respHtml = await getResponse();
        res.writeHead(200);
        res.end(respHtml)
    }
    catch (err){
        console.error(`caught-> ${err}`)
    }
}).listen(3000, '127.0.0.1')

async function getResponse(){
    let stringify = data => data.toString();
    let templateHtml = stringify(await getFile('./index.html'));
    let liItems_str = stringify(await getFile('./listItems.json'));
    let liItems_json = JSON.parse(liItems_str)
    let respHtml = templateHtml.replace('%', liItems_json.join('</li><li>'))
    return respHtml;

}

function getFile(filename){
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
}