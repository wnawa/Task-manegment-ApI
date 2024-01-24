const http = require('http');
const url = require('url');
// Declare variables
var fs = require('fs'),
    obj
const tasks = [];
// Read the file and send to the callback
fs.readFile('./db.json', handleFile)

// Write the callback function
function handleFile(err, data) {
    if (err) throw err
    obj = JSON.parse(data)
    console.log(obj["tasks"]);
    // You can now play with your datas
}

// //GET /tasks: Retrieve a list of tasks.
const handleGetTasks = (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj["tasks"]));
}
const port = 2000;
//POST /tasks: Add a new task.
// N.B:Watch out for th e json formate you add douple quetes is a must in json
//  { "id": 3, "name": "wahsing", "completed": false }
const addPostTask = async (req, res) => {
    try {
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        await new Promise((resolve, reject) => {
            req.on('end', () => {
                const task = JSON.parse(body);
                // tasks.push(task);
                obj.tasks.push(task);
                console.log(obj.tasks);
                //Write data to the json file
                fs.writeFile("db.json", JSON.stringify(obj), function (err) {
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                });
                //write in the response
                res.writeHead(201, { 'contexnt-Type': 'application/json' });
                res.end(JSON.stringify(task));
                resolve();
            });
            req.on('error', error => reject(error));
        });
    } catch (error) {
        res.writeHead(400, { 'content-Type': 'text/plain' });
        res.end('Invalid data');
    }

}

//create server
const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    if (path == '/tasks' && req.method == 'GET') {

        handleGetTasks(res);
    }
    else if (path == '/tasks' && req.method == 'POST') {

        await addPostTask(req, res);

    } else if (path.startsWith('/tasks/') && req.method == 'PUT') {
        //Get the id from th url

        const taskId = parseInt(path.split('/')[2]);
        console.log(taskId);
        handleCompleteTask(req, res, taskId);
    }
    else {
        //Show Error id the Path not Found
        res.writeHead(404, { 'content-Type': 'text/plain' });
        res.end('Not Found');
    }
});



//start the server
server.listen(port, () => {
    // The server object listens on port 3000
    console.log(`server start at port ${port}`);
}
);
