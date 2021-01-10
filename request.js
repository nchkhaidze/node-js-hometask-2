const http = require("http");
const name = process.argv[2];

if (!name) {
  console.log("Usage: node request.js <YourName>");
  return;
}

const options = {
  path: `/?name=${name}`,
  method: "POST",
  headers: { IKnowYourSecret: "TheOwlsAreNotWhatTheySeem" },
};

const request = http.request("http://localhost:8080/", options, response => {
  let str = "";

  response.on("data", d => {
    str += d;
  });

  response.on("end", () => {
    console.log(str);
  })
});

request.end();