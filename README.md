# Microsoft-Engage2021--Vikranth
## Deployed Link of the project
This is the link of the web application after deploying the code on **heroku**:
https://videocalling-by-nvc.herokuapp.com/

## Video demo of the website
The video demo of the website can be found here 

## Problem statement
To build a fully functional prototype with at least one mandatory functionality -
a minimum of two participants should be able connect with each other using the product to have a video conversation.
### Adopt feature:
Include a chat feature in your application where meeting participants can share info without disrupting the flow of the meeting.
Through this feature the participants should be able have conversation befor joining, while in the meet and after leaving the meeting.
## Agile Methodology and Approach to Build the Project
I have followed **Agile Scrum Methodology** to build this project.<br/>
**Agile Scrum Methodology** is a project manage method that is best used to improve the project in every iteration.
Each iteration has sprints, where the goal in each sprint is to build the most important feature first and then improve the project  as a potentially deliverable product.
Microsfot has provided us with sprints :**Design, Build, Adopt** which are 1-2 weeks each.<br/>
After researching about **webRTC** and how it works
I have further made my own sprints in the **Build and Adopt phases** of length 1-2 days each. They are:
1. Initializing a server and a starting web page.
2. Adding the ability to stream my own video( *local video*)
3. Connecting other clients and ability to see their video.
4. Styling the page.
5. Creating a unique room in the server.
6. Building the mute audio, video and leave meeting buttons.
7. Styling the page. 
8. Bulding the chat ability to send and recieve messages.
9. Adding the feature to display the time at which thhe message has been sent.
10. Showing whether a new user has connected or disconnect to the room in the Chat.
11. Styling the page.
## Libraries and dependencies used
The code is written in javascript, HTML/CSS languages.
I have used **NodeJs** to create the signallling servers.<br/>
Nodejs can be downloaded from https://nodejs.org/en/download/ and you can verify it by the command `node -v` and to verify npm use `npm -v`
As I have mentioned earlier, I have built this project using **webRTC**.<br/>
I used the following libraries and dependencies:
- ejs
- socket.io
- express
- peer
- peerjs
- uuid
- cors<br/>
You can also see the list of dependencies in the **package.json** file.<br/>
To install the dependencies use the command `npm install`.<br/>
For example to install socket.io, use `npm install socket.io`.
## Files 
The html page of the website the user will be seeing on his browser is the **room.ejs** file in **views** folder.<br/>
ejs stands for **embedded java script** and it is used to create HTML pages with plain javascript.<br/>
The public folder contains the **client.js server file, style.css styling file and an animation.gif** .
<br/>
<br/>
**Note:** *This code can't be run on localhost because of the port used in client.js file. It needs to be deployed before using.* 

