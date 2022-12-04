=================================================================
***********************Opening the Project***********************
=================================================================
To connect to the databse first you need to open commandline prompt, or power shell, any command interputer you perfer.
  -Once inside the command line you need to enter this line:
  C:\Users\LabStudent-55-604385\Documents\Workspace\MongoDBServer\bin\mongod.exe --dbpath=C:\Users\LabStudent-55-604385\Documents\Workspace\MongoDBServer\data --nojournal
  This will start the mongo server and you will be ready to open the project in VS Code.
  
  In the file directory of C:\Users\LabStudent-55-604385\Documents\Workspace\bookstore\aa-assignment-1, from the file path click on it and enter cmd. This will open command prompt within file directory. once there just enter > (code .), which should open the project in vs code. once insde the vs code, you want to open new terminal and do npm install in /aaf-assignent-1, once in /backend and one more in /book-store. This will install the package.json for the project. 

=================================================================
***********************Running the Project***********************
=================================================================
inside the vs code terminal you want to make sure that you are inside the /book-store directory and do (npm start). Now make sure you have another terminal open but the directory is in /backend and also do (npm start). The first one should start the front end and the second one should start the backend. Your browser will open with front connected, if not hit refreash to reload the page, and the components should be loaded.
