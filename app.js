let gameState = 1;

let mainSprite;
let xRate = 0;
let edges;
let roadSprites;
let roadImage;
let velocity = 20;
let boyImages = [];
let bikeImages = [];
let soundImages = [];
let humanGroup;
let coinsGroup;
let coinsAnimation;
let totalCoinsScore = 0;
let pausePlayBtn;
let btnCanPressed = true;
let soundBtnCanPressed = true;
let pauseImg;
let playImg;
let paused = false;
let soundOff = false;
let drawer;
let soundBtn;
let homeBtn;
let homeImg;
let photoBtn;
let photoCanBeClicked = true;
let photoImg;
let gameGroup;
let drawerImg;
let replayBtn;
let replayImg;
let replayCanBeClicked = true;
let boostersGroup1;
let boostersGroup2;
let coinsCanBeAdded = true;
let magnetImage;
let hornImage;
let drawerXPos = -75;


///////// HOME PAGE \\\\\\\\\\\\
let gamePlayBtnImg;
let storeBtnImg;
let settingsBtnImg1;
let settingsBtnImg2;
let infoBtnImg;
let rocxy;


//////// INFO PAGE \\\\\\\\\
let gotoHomeInfoImg;


function draw() {
    background(drawerImg);

    if (gameState == 0 || gameState == -1 || gameState == -5) {
        coinsCollide();

        background(255);

        replayBtnPressed();

        tackleRoadTracks();

        pausePlayPressed();

        soundBtnPressed();

        boosterGroup1Touching();

        boosterGroup2Touching();

        if (homeBtnPressed()) {
            gameState = 1;
        }

        photo();


        // if (humanGroup.isTouching(mainSprite)) {
        //     gameGroup.forEach(element => {
        //         element.visible = false;
        //         // element.x += 20000;
        //     });

        //     setTimeout(() => {
        //         gameGroup.forEach(element => {
        //             element.visible = true;
        //             // element.x += 20000;
        //         });
        //     }, 3000);
        // }

        // for(let i = 0; i < touches.length; i++) {
        //     let touchx = touches[i].x; 
        //     let touchy = touches[i].y;

        //   }

        if (frameCount % 500 == 0 && gameState != -1) {
            velocity += 0.5;
        }
    }

    drawSprites();

    if (touches.length > 0) {
        for (let xyz of touches) {

            if (gameState == 0) {
                break
            }



            if (gameState == 1) {
                if (guessTouching(width / 2, height / 2 - 160, 240, 120, xyz)) {
                    vibrate();
                    triggerGame();
                }
                else if (guessTouching(width / 2, height / 2 + 30, 250, 120, xyz)) {
                    vibrate();
                    console.log("lifet")
                }
                else if (guessTouching(width - 100, height - 120, 80, 80, xyz)) {
                    vibrate();
                    gameState = -2;
                }
                else if (guessTouching(100, height - 120, 70, 70, xyz)) {
                    vibrate();
                    soundOff = !(soundOff);
                }
                else if (guessTouching(100, 50, 200, 100, xyz)) {
                    vibrate();
                    gameState = 4;
                }
                touches = [];
                break;
            }

            if (gameState == -2) {
                if (guessTouching(80, 85, 100, 100, xyz)) {
                    vibrate();
                    gameState = 1;
                    touches = [];
                    break;
                }
            }
        }
    }

    imageMode(CENTER);

    if (gameState == 1) {
        noStroke();
        fill('#88F4EA')
        ellipse(50, 56, 75);
        fill(240);
        textSize(20)
        text('KUSHAGRA', 100, 50);
        image(rocxy, 50, 56, 50, 50);
        image(magnetImage, 110, 73, 18, 18);
        text('' + 1000, 125, 80.5);
        image(gamePlayBtnImg, width / 2, height / 2 - 160, 240, 120);
        image(storeBtnImg, width / 2, height / 2 + 30, 250, 120);
        image(infoBtnImg, width - 100, height - 120, 80, 80);

        if (soundOff) {
            image(settingsBtnImg2, 100, height - 120, 70, 70);
        }
        else {
            image(settingsBtnImg1, 100, height - 120, 70, 70);
        }

        // image(infoBtnImg, )
        fill(0);
        ellipse(width / 2, height / 2 - 160, 1, 1);
    }

    if (gameState == 4) {
        noStroke();
        fill('#88F4EA');
        ellipse(width / 2 - 130, 150, 150);
        fill(240);
        textSize(30);
        text('KUSHAGRA', width / 2, 135);
        image(rocxy, width / 2 - 180, 101, 100, 100);
        image(magnetImage, width / 2, 163, 30, 30);
        text('' + 1000, width / 2 + 40, 189);

        for (let x = 116; x <= width - 105; x += (width - 75) / 3) {
            for (let y = 330; y <= height - 100; y += 150) {
                fill('#88F4EA');
                ellipse(x, y, 100);
                image(rocxy, x - 30, y - 30, 60, 60);
            }
        }
    }

    if (gameState == 0) {
        image(pauseImg, 75, 65, 65, 65);
    }

    if (gameState == -1) {
        pausePlayBtn.visibility = false;

        noStroke();
        fill(255);
        rect(0, 0, 150, height);

        let gameImages = [playImg, replayImg, homeImg, photoImg, soundImages[0]]
        if (soundOff) {
            gameImages[4] = soundImages[1];
        }
        let nth = -1;
        for (let x = (height / 5) / 2; x <= (height - ((height / 5) / 2)); x += (height / 5)) {
            nth++;
            if (nth == 0) {
                image(gameImages[0], 75, x, 65, 65);
                continue;
            }
            image(gameImages[nth], 75, x, 60, 60);
        }
    }

    if (gameState == 0 || gameState == -1) {
        textSize(30);
        fill(0);
        textAlign(CENTER);
        text('Coins: ' + totalCoinsScore, width - 150, 80);
    }

    if (gameState == 1 || gameState == -2) {
        textSize(15);
        fill(50);
        textAlign(CENTER);
        text("©Kushagra Dwivedy 2021", width / 2, height - 20);
    }

    if (gameState == -2) {
        image(gotoHomeInfoImg, 80, 85, 100, 100);
        textSize(40);
        fill(0);
        textAlign(CENTER);
        text("HJGFAFJDS JKHDSGF\nLHSDF JGFA", width / 2, height / 2);
    }
}

setInterval(() => {
    if (gameState == 0) {
        pedestrians();
        pedestrians();
        // honked();
        // coins();
        coins(true);
    }
}, 1500);

// setInterval(() => {
//     if (gameState == 0) {
//         coins(true);
//     }
// }, 2500);

window.addEventListener('blur', e => {
    if (gameState != 0) return;
    vibrate();
    paused = true;

    drawerOpenClose();

    gameState = -1;
    pausePlayBtn.addImage(playImg);
    pausePlayBtn.scale = 0.15;
    velocity = 0;
    boostersGroup1.forEach(element => {
        element.velocityY = 0;
        element.lifetime = -1;
    });
    boostersGroup2.forEach(element => {
        element.velocityY = 0;
        element.lifetime = -1;
    });
    coinsGroup.forEach(element => {
        element.velocityY = 0;
        element.lifetime = -1;
    });
    humanGroup.forEach(element => {
        element.velocityY = 0;
        element.lifetime = -1;
        element.velocityX = 0;
    });
});

window.addEventListener("deviceorientation", event => {

    if (!(mainSprite)) return;

    if (event.gamma >= xRate || event.gamma <= -xRate) {
        mainSprite.x += event.gamma / 2;
        xRate = event.gamma / 3;
    }

    if (mainSprite.x > width - mainSprite.width) {
        mainSprite.x = width - mainSprite.width;
    }

    if (mainSprite.x < mainSprite.width) {
        mainSprite.x = mainSprite.width;
    }
}, true);
