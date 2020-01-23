const http = require('http')
const fs = require('fs');
console.log('server staererawer')

http.createServer(async (req, res) => {
    try{
        let htmlResp = await getResp(req);
        res.writeHead(200);
        res.end(htmlResp);
    }
    catch(err){
        console.error(`err caught $(err)`)
    }

}).listen(3000, '127.0.0.1')

async function getResp(req){
    let stringify = data => data.toString();
    let htmlTemplate = stringify(await fs.promises.readFile('index.html'));
    console.log(req.url)
    if (req.url === '/'){ 
        let li_items = stringify(await fs.promises.readFile('listItems.json'));
        let li_items_json = JSON.parse(li_items)
        return htmlTemplate.replace('%', li_items_json.join('</li><li>'))
    }
    else if (req.url == '/raw'){
        return htmlTemplate
    }
}
