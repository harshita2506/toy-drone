var c = document.getElementById("gameStart");
var ctx = c.getContext("2d");
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
                this.yPosition = this.yPosition + 1
                break;
            case 3:
                this.xPosition = this.xPosition + 1
                break;
        }
        if (this.yPosition < 0) {
            this.yPosition = 0
            alert("Too close to boundary - Cannot fire")
        } else if (this.yPosition >= 10) {
            this.yPosition = 10
            alert("Too close to boundary - Cannot fire")
        }
        if (this.xPosition < 0) {
            this.xPosition = 0
            alert("Too close to boundary - Cannot fire")
        } else if (this.xPosition >= 10) {
            this.xPosition = 10
            alert("Too close to boundary - Cannot fire")
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
        this.rotation = 0
        const image = new Image();
        image.src = 'images/0.png';
        image.onload = () => {
            const scale = 0.35
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            console.log('image.width', this.width, this.height);
        }
    }
    update(xPos, yPos, direction) {
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
        // if (this.image) {
            // ctx.clearRect(0, 0, c.width, c.height);
            // ctx.save();
            ctx.translate(xPos, yPos);
            ctx.rotate((direction * 90) * Math.PI / 180);
            ctx.drawImage(this.image, 0-this.width /18, 0-this.height/18, this.width, this.height);

        // }
        console.log('0-this.width /18', 0-this.width /18, 0-this.height/18);
    }
}

var place = document.getElementById("PlaceId");
place.style.display = 'block';

var drone = new Drone();
const player = new Player();
const projectile = [];
var projectileLengthFlag = 0;

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
    drawMove(drone);
    console.log('dronemove after', drone)
}

var angleInDegrees = 0;
function RotateLeftFun() {
    drone.rotateLeft()
    console.log("droneleft", drone);
    // angleInDegrees -= 90;
    drawRotated(drone);
}
function RotateRightFun() {
    drone.rotateRight()
    // angleInDegrees += 90;
    drawRotated(drone);

    console.log('rotateRight', drone);
}

function drawMove(drone) {
    var xImg = player.image.height * 0.35
    var yImg = player.image.width * 0.35
    console.log('xIMG', xImg);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    droneStepImage(drone.orientation, xImg, yImg);

    // ctx.translate(drone.xPosition, drone.yPosition);
    // ctx.drawImage(player.image, xDrone, yDrone, xImg, yImg);
    ctx.restore();
}

function droneStepImage(orientation, xImg, yImg) {
    droneXPos = drone.xPosition * 20;
    droneYPos = drone.yPosition * 20;
    switch (orientation) {
        case 0:
            ctx.drawImage(player.image, droneXPos, droneYPos, xImg, yImg);
            break;
        case 1:
            ctx.drawImage(player.image, droneXPos, droneYPos, xImg, yImg);
            break;
        case 2:
            ctx.drawImage(player.image, droneXPos, droneYPos, xImg, yImg);
            break;
        case 3:
            ctx.drawImage(player.image, droneXPos, droneYPos, xImg, yImg);
            break;
    }
}
function drawRotated(drone) {
    console.log('drawaaa');
    var xImg = player.image.height * 0.35
    var yImg = player.image.width * 0.35
    var orientation = drone.orientation;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.translate(xImg / 2, yImg / 2);
    // player.image.src = 'images/'+ orientation + '.png';
    // console.log('origin', player.image.src);
    if (orientation == 0)
        orientation = 4;
        if (orientation == -1)
        orientation = 3;
    ctx.rotate((orientation * 90) * Math.PI / 180);
    ctx.drawImage(player.image, 0 - xImg / 2, 0 - yImg / 2, xImg, yImg);
    console.log('0 - xImg / 2', 0 - xImg / 2);
    ctx.restore();
}
function ReportFun() {
    drone.report()
    console.log('droneReport', drone.report());
}
function ToggleContainer(containerId, isDisabled) {
    var containerChildren = document.getElementById(containerId).children;
    for (let i = 0; i < containerChildren.length; i++) {
        containerChildren[i].disabled = isDisabled;
    }
}
function placeFun() {
    ToggleContainer("formContainer", false);
    var dialogBox = document.getElementById("formContainer");
    dialogBox.style.opacity = 1;
    ToggleContainer("buttonContainer", true);
}
// class Explosion {
//     constructor({explosion}){
//         this.bomb = {
//           x: explosion.x,
//           y: explosion.y,
//           radius: 10
//         }
//     }
  
//     draw(){
//       context.beginPath();
      
//       context.arc(this.bomb.x, this.bomb.y, this.bomb.radius, 0 , Math.PI * 2);
  
//       context.fillStyle = 'white';
  
//       context.fill();
  
//       context.closePath();
//     }
  
//     update(){
//       this.draw();
//       this.bomb.radius += 1;
//     }
//   }
function attackFun() {
    // var ex = new Explosion(drone.xPos, dron.yPos)
    // console.log('exxx', ex);
    // ex.update()
    // var d = document.getElementById('fireBtn')
    // d.addEventListener('pointerup', () => {
    //     setTimeout(() => {
    //         console.log('pointerup');
    //         projectile.forEach((element, index) => {
    //             projectile.splice(index, 1)
    //         })
    //     }, 2000)
    // })
    // d.addEventListener('pointerdown', () => {
    //     console.log('pointerdown');
    //     projectileLengthFlag = projectile.length - 1
    //     projectile.push(new Projectile({
    //         position: {
    //             x: player.position.x,
    //             y: player.position.y
    //         }
    //     }))
    // })
}