# RemoteControl
This application implement remote control backend using RobotJS library and websocket.

## Installation
1. Clone/download repo
2. `npm install`
3. Create '.env' file with content: `PORT = 8080`

## Usage
:hammer_and_wrench:  **Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

:crossed_swords:  **Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

---

**For perform control use keyboard**  :keyboard:

:arrow_up: => Move mouse Up
:arrow_down: => Move mouse Down
:arrow_left: => Move mouse Left
:arrow_right: => Move mouse Right
`c` => Draw circle
`r` => Draw rectangle 
`s` => Draw square
`p` => Send current mouse coordinates
`Ctrl`+ `p` => Send desktop capture (optionally)
