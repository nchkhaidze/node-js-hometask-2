const http = require("http");
const fs = require("fs")
const url = require("url");
const db = "./visitors.json"

let users = {
  visitors: [],
};

if (fs.existsSync(db)) {
  users = JSON.parse(fs.readFileSync(db, "utf-8"));
} 

http.createServer((request, response) => {
  // eliminating the second browser call
  if (request.url === '/favicon.ico') {
    return;
  } 
  
  if (!request.headers["iknowyoursecret"]) {
    response.end("You don't know the secret");
    return;
  }

  const name = url.parse(request.url, true).query.name;
  const ip =  request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  const visitor = {name, ip};
  users.visitors.push(visitor);

  response.writeHead(200, {"Content-Type": "text/plain"});
  fs.writeFile(db, JSON.stringify(users), err => {
    if (err) {
      throw err;
    }
  })
  response.write(`Hello, ${users.visitors.map(visitor => visitor.name).join(", ")}!`);
  response.end();
}).listen(8080, console.log("Server listening at port 8080"));