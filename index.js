var http = require("http");

//TODO - Use Employee Module here
const employee = require('./Employee');
console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url == '/') {
            console.log(req.url,'--req.url22--');
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            const data = "<h1>Welcome to Lab Exercise 03</h1>";
            return res.writeHead(200).end(data);
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            return res.writeHead(200, {'content-type':'text/json'}).end(JSON.stringify(employee));
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            const nameArray = [];
            for(let emp of employee){
                nameArray.push(emp?.firstName + ' ' + emp?.lastName)
            }
            nameArray.sort()
            return res.writeHead(200, {'content-type':'text/json'}).end(JSON.stringify(nameArray));
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }  
            let total_salary = 0;
            for(let emp of employee){
                total_salary += parseInt(emp?.Salary)
            }
            return res.writeHead(200, {'content-type':'text/json'}).end(JSON.stringify({total_salary}));
        }
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})