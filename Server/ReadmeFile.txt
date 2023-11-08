After Unzipping the Project Run command ----> "npm i" in the command shell 

After running the "npm i" all the dependencies of the project is installed in the system

To start the Backend on the localhost we need to install the node in the local machine link----->"https://nodejs.org/en/" install the Recommended for most users Version.

You don't need to create the .env file as I am not removing it from the folder

Run "node index.js" in the command line interface to start the server 

After Successfull Run of the command below line will be logged inside the terminal :-
"Listening on port 5000
Connected to MongoDB Atlas"


To test the Api from the Postman you can use the following routes:-
(a) Register User:-localhost:5000/user/register
Method:Post
PayloadData:
    {
    "username":"User2",
    "password":"123456"
}


(b) Login User:localhost:5000/user/login
Method:Post
PayloadData:-{
    "username":"User2",
    "password":"123456" 
}


