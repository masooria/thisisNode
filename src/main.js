const port = 3000,
http = require ('http'),
fs = require ('fs'),
httpStatus = require ('http-status-codes')

const app = http.createServer();

app.on('request', async (req, res) => {

  var body = [];                                           
  req.on("data", (bodyData) => {  
    console.log(bodyData);                         
    body.push(bodyData);                                   
  });
  req.on("end", () => {                                    
    body = Buffer.concat(body).toString();                 
    console.log(`Request Body Contents: ${body}`);
  });
  
  res.writeHead(httpStatus.OK)
  let stringify = data => data.toString();
  let html = stringify(await fs.promises.readFile('index.html'));
  res.end(html)
})


app.listen(port)




//Implementation details

function getJSONString(obj) {
    return JSON.stringify(obj, null, 2)
}