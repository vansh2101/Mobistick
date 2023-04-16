## Inspiration
Our team is am all high school students team and our national level examinations ended recently. We all were pretty tired and wanted to chill out (like every other student). A couple of us are 
## What it does
There are three components of the app, the **browser extension**, **mobile app** and **server**. We also have a few in-house games available via the dashboard.
The server provides a link between the browser extension and the mobile app. The browser extension is used to connect to the server and the mobile app is used to play the games. The server is used to send the data between the browser extension and the mobile app. The dashboard is used to manage the games and the users.
The browser extension receives commands from mobile and executes it on the browser. The mobile app can be linked with the browser extension via QR Code and has several features which uses the sensors of the mobile phone to power the joystick and controller.
## How we built it
We divided the task into four parts according to everyone's preferences and expertise. We used NodeJS for the server, React for the dashboard and browser extension and React Native for the mobile app. To connect the PC with mobile, we used [Socket.io](https://socket.io).
## Challenges we ran into
Not a lot of time! Also, we had a few team members who are new hackers.
## Accomplishments that we're proud of
Our teammates made a huge effort to learn new technologies and frameworks. We also managed to build a working prototype in a short time. We made our own game to ensure a full ecosystem. However, it support all games.
## What we learned
We decided not to use any service and build everything on our own so that we can learn and understand the working of the system. We also had to learn a lot of new technologies and frameworks

## What's next for MobiStick
- Multiplayer support: So that one day all of us can play games together
- Support outside of Chrome: Firefox, Safari, Edge, Opera
- Support for other platforms such as iOS
- Integrating a large variety of games