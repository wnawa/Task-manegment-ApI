# Task Management API 
Using I have created this API. It can read the data from JSON file and display or add new Tasks through the following endpoints:
 <ul><li>Get all Tasks
http://127.0.0.1:2000/tasks
{
    "tasks": [
        {
            "id": 1,
            "name": "shopping",
            "completed": false
        },
        {
            "id": 2,
            "name": "study",
            "completed": false
        },
        {
            "id": 4,
            "name": "shower",
            "completed": false
        },
        {
            "id": 3,
            "name": "washing",
            "complete": false
        }
    ]
}</li>
 <li>
Post New Tasks
http://127.0.0.1:2000/tasks</li>
 <li>Put Edit Task to mark as completed 
http://127.0.0.1:2000/tasks/:id</li>



</ul>
