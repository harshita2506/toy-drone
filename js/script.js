var c = document.getElementById("gameStart");
var ctx = c.getContext("2d");
var scale = 0.35;
class Drone {
    place(xPosition, yPosition, direction) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        switch (direction) {
            case "North":
                this.orientation = 0;
                break;
            case "West":
                this.orientation = 1;
                break;
            case "South":
                this.orientation = 2;
                break;
            case "East":
                this.orientation = 3;
                break;
        }
    }
    rotateLeft() {
        this.orientation = this.orientation + 1
        if (this.orientation == 4) {
            this.orientation = 0
        }
    }
    rotateRight() {
        this.orientation = this.orientation - 1
        if (this.orientation == -1) {
            this.orientation = 3
        }
    }
    move() {
        switch (this.orientation) {
            case 0:
                this.yPosition = this.yPosition - 1
                break;
            case 1:
                this.xPosition = this.xPosition - 1
                break;
            case 2:
                if (this.yPosition >= 10) {
                    alert("Too close to boundary - Cannot Move")
                } else {
                    this.yPosition = this.yPosition + 1
                }
                break;
            case 3:
                if (this.xPosition >= 10) {
                    alert("Too close to boundary - Cannot Move")
                } else {
                    this.xPosition = this.xPosition + 1
                }
                break;
        }
        if (this.yPosition < 0) {
            this.yPosition = 0
            alert("Too close to boundary - Cannot Move")
        }
        if (this.xPosition < 0) {
            this.xPosition = 0
            alert("Too close to boundary - Cannot Move")
        }
    }
    report() {
        new Report(this.xPosition, this.yPosition, this.orientation)
    }
}
class Report {
    constructor(xPosition, yPosition, direction) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        switch (direction) {
            case 0:
                alert("X: " + xPosition + "\nY:" + yPosition + "\nDirection: " + "North");
                break;
            case 1:
                alert("X: " + xPosition + "\nY:" + yPosition + "\nDirection: " + "West");
                break;
            case 2:
                alert("X: " + xPosition + "\nY:" + yPosition + "\nDirection: " + "South");
                break;
            case 3:
                alert("X: " + xPosition + "\nY:" + yPosition + "\nDirection: " + "East");
                break;
        }
    }
}
class Player {
    constructor() {
        const image0 = new Image();
        image0.src = 'images/0.png'
        image0.onload = () => {
            this.image0 = image0
            this.width = image0.width * scale
            this.height = image0.height * scale
        }
        const image1 = new Image();
        image1.src = 'images/1.png'
        image1.onload = () => {
            this.image1 = image1
            this.width = image1.width * scale
            this.height = image1.height * scale
        }
        const image2 = new Image();
        image2.src = 'images/2.png'
        image2.onload = () => {
            this.image2 = image2
            this.width = image2.width * scale
            this.height = image2.height * scale
        }
        const image3 = new Image();
        image3.src = 'images/3.png'
        image3.onload = () => {
            this.image3 = image3
            this.width = image3.width * scale
            this.height = image3.height * scale
        }
    }
    update(xPos, yPos, orientation) {
        switch (orientation) {
            case 0:
                ctx.drawImage(this.image0, xPos*20, yPos*20, this.width, this.height);
                break;
            case 1:
                ctx.drawImage(this.image1, xPos*20, yPos*20, this.width, this.height);
                break;
            case 2:
                ctx.drawImage(this.image2, xPos*20, yPos*20, this.width, this.height);
                break;
            case 3:
                ctx.drawImage(this.image3, xPos*20, yPos*20, this.width, this.height);
                break;
        }
    }
}

var place = document.getElementById("PlaceId");
place.style.display = 'block';
var drone = new Drone();
const player = new Player();

function OkClickHandler() {
    var xPos = parseInt(document.getElementById("xInput").value);
    var yPos = parseInt(document.getElementById("yInput").value);
    if ((isNaN(xPos)) || (isNaN(yPos))) {
        alert("Invalid x, y supplied - setting x and y to zero");
        xPos = 0;
        yPos = 0;
    }
    var direction = document.getElementById("directionOptions").value;
    drone.place(xPos, yPos, direction)
    var dialogBox = document.getElementById("formContainer");
    dialogBox.style.opacity = 0;
    ToggleContainer("formContainer", true);
    ToggleContainer("buttonContainer", false);
    place.style.display = 'none'
    player.update(drone.xPosition, drone.yPosition, drone.orientation);
}

function CancelClickHandler() {
    var dialogBox = document.getElementById("formContainer");
    dialogBox.style.opacity = 0;
    dialogBox.reset();
}

function MoveFun() {
    drone.move()
    var xImg = player.image0.height * scale
    var yImg = player.image0.width * scale
    drawMove(drone, xImg, yImg);
    console.log('dronemove after', drone)
}

function RotateLeftFun() {
    drone.rotateLeft()
    var xImg = player.image0.height * scale
    var yImg = player.image0.width * scale
    drawRotated(drone, xImg, yImg);
    console.log("droneleft", drone);
}

function RotateRightFun() {
    drone.rotateRight()
    var xImg = player.image0.height * scale
    var yImg = player.image0.width * scale
    drawRotated(drone, xImg, yImg);
    console.log('rotateRight', drone);
}

function drawMove(drone, xImg, yImg) {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.translate(drone.xPosition, drone.yPosition);
    droneStepImage(drone.orientation, xImg, yImg)
    ctx.restore();
}

function drawRotated(drone, xImg, yImg) {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    droneStepImage(drone.orientation, xImg, yImg);
    ctx.restore();
}

function droneStepImage(orientation, xImg, yImg) {
    droneXPos = drone.xPosition * 20;
    droneYPos = drone.yPosition * 20;
    switch (orientation) {
        case 0:
            ctx.drawImage(player.image0, droneXPos, droneYPos, xImg, yImg);
            break;
        case 1:
            ctx.drawImage(player.image1, droneXPos, droneYPos, xImg, yImg);
            break;
        case 2:
            ctx.drawImage(player.image2, droneXPos, droneYPos, xImg, yImg);
            break;
        case 3:
            ctx.drawImage(player.image3, droneXPos, droneYPos, xImg, yImg);
            break;
    }
}

function ReportFun() {
    drone.report()
    console.log('droneReport', drone);
}

function ToggleContainer(containerId, isDisabled) {
    var containerChildren = document.getElementById(containerId).children;
    for (let i = 0; i < containerChildren.length; i++) {
        containerChildren[i].disabled = isDisabled;
    }
}

function placeFun() {
    droneXPos = drone.xPosition * 20;
    droneYPos = drone.yPosition * 20;
    ToggleContainer("formContainer", false);
    var dialogBox = document.getElementById("formContainer");
    dialogBox.style.opacity = 1;
    dialogBox.reset()
    ToggleContainer("buttonContainer", true);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
}

function attackFun() {
    var x = 0;
    var y = 0;
    var attackFlag = true;
    const image = new Image();
    image.src = "images/attack.png"
    image.onload = () => {
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    switch (this.drone.orientation) {
        case 0:
            y = this.drone.yPosition + this.height - player.image0.height / 4
            if (y == 250 || y == 0) {
                alert("Too close to boundary - Cannot Attack")
                attackFlag = false
            }
            break;
        case 1:
            x = this.drone.xPosition + this.width - player.image0.width / 4
            if (x == 0) {
                alert("Too close to boundary - Cannot Attack")
                attackFlag = false
            }
            break;
        case 2:
            y = this.drone.yPosition + this.height + player.image0.height
            if (y == 260) {
                alert("Too close to boundary - Cannot Attack")
                attackFlag = false
            }
            break;
        case 3:
            x = this.drone.xPosition + this.width + player.image0.width
            if (x == 260) {
                alert("Too close to boundary - Cannot Attack")
                attackFlag = false
            }
            break;
    }
    if (this.image && attackFlag) {
        ctx.drawImage(this.image, x, y, this.width, this.height);
        setTimeout(() => {
            ctx.clearRect(x, y, this.width, this.height);
        }, 2000)
    } else {
        console.log('else');
    }
}
