function preload() {
    roadImage = loadImage('images/road.jpg');
    pauseImg = loadImage('images/pause.png');
    playImg = loadImage('images/play.png');
    homeImg = loadImage('images/home.png');
    photoImg = loadImage('images/camera.png');
    drawerImg = loadImage('https://iili.io/Bn9tFn.md.png');
    replayImg = loadImage('images/replay.jpg');
    magnetImage = loadImage('images/magnet.png');
    hornImage = loadImage('images/bullhorn.png')
    gotoHomeInfoImg = loadImage('images/Wizard house.png');
    rocxy = loadImage('images/gameplayfaces_04.png');



    // 
    soundImages = [
        loadImage('images/sound.png'),
        loadImage("https://i.ibb.co/vJmZvVc/no-sound.png")
    ];

    for (let x = 1; x <= 6; x++) {
        bikeImages.push(loadImage(`images/bike${x}.png`))
    }

    for (let x = 1; x <= 5; x++) {
        boyImages.push(loadImage(`images/boy ${x}.png`))
    }

    coinsAnimation = loadAnimation(
        'images/coin1.png',
        'images/coin2.png',
        'images/coin3.png',
        'images/coin4.png',
        'images/coin3.png',
        'images/coin2.png'
    );



    /////// HOME \\\\\\\\
    gamePlayBtnImg = loadImage('images/playGame.png');
    storeBtnImg = loadImage('images/store.png');
    settingsBtnImg1 = loadImage('images/soundOn.png');
    settingsBtnImg2 = loadImage('images/soundOff.png')
    infoBtnImg = loadImage('images/information.png');
}

function setup() {

    gameGroup = new Group();

    homeBtnGroup = new Group();

    createCanvas(window.innerWidth, window.innerHeight);

    roadSprites = [createSprite(width / 2, height / 2, width, height), createSprite(width / 2, -(height / 2), width, height)];
    gameGroup.add(roadSprites[0]);
    gameGroup.add(roadSprites[1]);


    edges = createEdgeSprites();

    humanGroup = new Group();

    coinsGroup = new Group();

    boostersGroup1 = new Group();

    boostersGroup2 = new Group();

    mainSprite = createSprite(width / 2, height / 2 + 100, 50, 50);
    mainSprite.addImage(bikeImages[0]);
    mainSprite.scale = 0.7;
    mainSprite.setCollider('rectangle', 0, -50, 80, 100)
    gameGroup.add(mainSprite);

    pausePlayBtn = createSprite(75, 70, 100, 100);
    pausePlayBtn.scale = 0.3;
    gameGroup.add(pausePlayBtn);

    drawer = createSprite(-75, height / 2, 150, height);
    drawer.shapeColor = "white";
    drawer.depth = pausePlayBtn.depth - 1;
    gameGroup.add(drawer);

    replayBtn = createSprite(-75, height - 520, 100, 100);
    replayBtn.addImage(replayImg);
    replayBtn.scale = 0.3;
    gameGroup.add(replayBtn);

    homeBtn = createSprite(-75, height - 260, 100, 100);
    homeBtn.addImage(homeImg);
    homeBtn.scale = 0.38;
    gameGroup.add(homeBtn);

    photoBtn = createSprite(-75, height - 390, 100, 100);
    photoBtn.addImage(photoImg);
    photoBtn.scale = 0.13;
    gameGroup.add(photoBtn);

    soundBtn = createSprite(-75, height - 130, 100, 100);
    soundBtn.addImage(soundImages[0])
    soundBtn.scale = 0.13;
    gameGroup.add(soundBtn);

    let localVar = [1, height / 5];
    gameGroup.forEach(element => {
        if (element.x == width / 2 || (element.x == -75 && element.y == height / 2)) return;
        element.y = (localVar[1] * localVar[0]) - 85;
        localVar[0] += 1;
    });

    drawerOpenClose();
    createHomePage();
}

function vibrate() {
    window.navigator.vibrate(300);
}

// function storeButtonPressed() {
//     if (mousePressedOver(storeBtn)) {
//         createStorePage();
//         gameState = 3;
//     }
// }

function createStorePage() {

}

function boosterGroup1Touching() {
    let canBeTapped = true;

    if (boostersGroup1.isTouching(mainSprite) && canBeTapped) {
        coinsCanBeAdded = false;
        coinsGroup.forEach(element => {
            element.velocityY = 0;
            element.attractionPoint(7, mainSprite.x, mainSprite.y);
        });
        canBeTapped = false;

        setTimeout(() => {
            if (coinsGroup.isTouching(mainSprite) == false) return;

            totalCoinsScore += 5;
            coinsGroup.destroyEach();
            return;
        }, 200);

        setTimeout(() => {
            canBeTapped = true;
            coinsCanBeAdded = true;
            boostersGroup1.destroyEach();
            return;
        }, 250);
    }
}

function boosterGroup2Touching() {
    canBeTapped = true;
    if (boostersGroup2.isTouching(mainSprite) && canBeTapped) {
        let a = 0
        boostersGroup2.destroyEach();
        let b = setInterval(() => {
            if (gameState != 0) return;
            a += 1
            honked();
            if (a >= 4) {
                clearInterval(b);
            }
        }, 1500);
    }
}

function coinsCollide() {
    coinsGroup.isTouching(mainSprite, e => {
        if (!(coinsCanBeAdded)) return console.log("ey");
        e.destroy();
        totalCoinsScore++;
    });
}

function createStoreCard(y, bikeImage) {
    let card = createSprite(width / 2, y, width - 60, 250);
    // let productImage = createS
    let productImage = createSprite(card.x, card.y - 50);
    productImage.addImage(bikeImage);
    productImage.rotation = 90;
    productImage.scale = 0.75;
    let productHalo = createSprite(productImage.x, productImage.y);
    productHalo.addImage(loadImage('images/halo.png'));
    // productHalo.scale = 0.5;
    productImage.depth += productHalo.depth;

    // productImage.scale = 0.5;
}

function replayBtnPressed() {
    if (mousePressedOver(replayBtn) && replayCanBeClicked) {
        vibrate();
        totalCoinsScore = 0;
        boostersGroup1.destroyEach();
        boostersGroup2.destroyEach();
        humanGroup.destroyEach();
        coinsGroup.destroyEach();
        velocity = 20;
        gameState = 0;
        paused = false;
        drawerOpenClose();

        replayCanBeClicked = false;
        setTimeout(() => {
            replayCanBeClicked = true;
        }, 500);
    }
}

function soundBtnPressed() {
    if (mousePressedOver(soundBtn) && soundBtnCanPressed) {
        vibrate();

        soundOff = !(soundOff);
        if (soundOff) {
            soundBtn.addImage(soundImages[1]);
        } else {
            soundBtn.addImage(soundImages[0]);
        }
        soundBtn.scale = 0.13;
        soundBtnCanPressed = false;

        setTimeout(() => {
            soundBtnCanPressed = true;
        }, 500);
    }
}

function pausePlayPressed() {
    if (mousePressedOver(pausePlayBtn) && btnCanPressed) {
        pausePlayBtnCreate();

        btnCanPressed = false;

        setTimeout(() => {
            btnCanPressed = true;
        }, 500);
    }
}

function pausePlayBtnCreate() {
    vibrate();
    paused = !(paused);
    drawerOpenClose();

    if (paused) {
        gameState = -1;
        pausePlayBtn.addImage(playImg);
        pausePlayBtn.scale = 0.15;
        velocity = 0;

        gameGroup.forEach(element => {
            element.velocityY = 0;
            element.lifetime = -1;
            element.velocityX = 0;
        });
    } else {
        gameState = 0;
        pausePlayBtn.addImage(pauseImg);
        pausePlayBtn.scale = 0.3;
        velocity = 20;

        boostersGroup1.forEach(element => {
            element.velocityY = velocity;
            element.lifetime = 50;
        });
        boostersGroup2.forEach(element => {
            element.velocityY = velocity;
            element.lifetime = 50;
        });
        coinsGroup.forEach(element => {
            element.velocityY = velocity;
            element.lifetime = 50;
        });
        humanGroup.forEach(element => {
            element.velocityY = velocity;
            element.lifetime = 43;
            element.velocityX = (element.rotation / 18) * -1;
        });
    }
}

function homeBtnPressed() {
    if (mousePressedOver(homeBtn)) {
        vibrate();
        createHomePage();
        return true;
    }
    return false;
}

function createHomePage() {
    boostersGroup1.destroyEach();
    boostersGroup2.destroyEach();

    paused = false;
    gameGroup.setVisibleEach(false);
    gameGroup.setVelocityEach(0, 0);
}

function guessTouching(x, y, w, h, arr) {
    if (((x - w / 2) <= arr.x) && ((x + w / 2) >= arr.x)) {
        if (((y - h / 2) <= arr.y) && ((y + h / 2) >= arr.y)) {
            return true;
        }
    }
    return false;
}

function triggerGame() {
    // gameGroup.setVisibleEach(true);
    if (!(soundOff)) {
        soundBtn.addImage(soundImages[0]);
    } else {
        soundBtn.addImage(soundImages[1]);
    }
    gameState = 0;
    pausePlayBtn.addImage(pauseImg);
    pausePlayBtn.scale = 0.3;
    velocity = 20;
    paused = false;
    coinsGroup.destroyEach();
    humanGroup.destroyEach();
    gameGroup.setVisibleEach(true);
    drawerOpenClose();
}

function createInfoPage() {
    gameState = -2;
}

function photo() {
    if (mousePressedOver(photoBtn) && photoCanBeClicked) {
        vibrate();
        photoCanBeClicked = false;
        drawerOpenClose();
        pausePlayBtn.visible = false;

        setTimeout(() => {
            let aTag = document.createElement('a');

            let canvas = document.querySelector("canvas");

            let img = canvas.toDataURL("image/png");

            aTag.href = img;
            aTag.download = "";

            aTag.click();
            aTag.remove();

            drawerOpenClose();
            pausePlayBtn.visible = true;
        }, 0);

        setTimeout(() => {
            photoCanBeClicked = true;
        }, 500);
    }
}

function drawerOpenClose() {
    drawer.x *= -1;
    soundBtn.x *= -1;
    homeBtn.x *= -1;
    photoBtn.x *= -1;
    replayBtn.x *= -1;
}

function tackleRoadTracks() {
    for (let x of roadSprites) {
        x.velocityY = velocity;
        x.addImage(roadImage);

        if (x.y >= height + (height / 2)) {
            x.y = -(height / 2);
        }
    }
}

function pedestrians() {
    let human = createSprite(random(50, width - 50), -50, 20, 20);
    human.addImage(random(boyImages));
    human.scale = 0.25;
    human.lifetime = 43;
    human.depth = pausePlayBtn.depth - 2;

    human.velocityY = velocity;

    if (human.x > width / 2) {
        human.velocityX = -5;
        human.rotation = 90;
    } else {
        human.velocityX = 5;
        human.rotation = -90;
    }

    gameGroup.add(human);
    humanGroup.add(human);
}

function honked() {
    humanGroup.forEach(x => {
        // if (x.rotation == 90) {
        // x.velocityX = ((element.rotation / 18) * -1);

        if (x.velocityX > 0) {
            x.velocityX = 10;
        } else {
            x.velocityX = -10;
        }
        // } 
    });
}

function coins(createBooster = false) {
    let xyz;
    let rand = Math.round(random(0, 2));

    let x;

    let randint = Math.round(random(0, 2));

    switch (randint) {
        case 0:
            x = width / 4;
            break;
        case 1:
            x = width / 2;
            break;
        case 2:
            x = width - (width / 4);
            break;
    }

    switch (rand) {
        case 0:
            xyz = width / 4;
            if (x == xyz) {
                x = width / 2;
            }
            break;
        case 1:
            xyz = width / 2;
            if (x == xyz) {
                x = width / 4;
            }
            break;
        case 2:
            xyz = width - (width / 4);
            if (x == xyz) {
                x = width / 2;
            }
            break;
    }

    if (createBooster) {
        rand = Math.round(random(0, 1));
        let booster;
        switch (rand) {
            case 0:
                booster = createSprite(200, -200, 60, 60);
                booster.addImage(magnetImage);
                booster.scale = 0.15;
                booster.x = x;
                booster.lifetime = 50;
                booster.depth = drawer.depth - 2;
                booster.velocityY = velocity;
                boostersGroup1.add(booster)
                gameGroup.add(booster);
                break;
            case 1:
                booster = createSprite(200, -200, 60, 60);
                booster.addImage(hornImage);
                booster.scale = 0.3;
                booster.rotation = -40;
                booster.x = x;
                booster.lifetime = 50;
                booster.depth = drawer.depth - 2;
                booster.velocityY = velocity;
                boostersGroup2.add(booster)
                gameGroup.add(booster);
                break;
        }
    }

    // else {
    for (let x = -250; x <= -50; x += 50) {

        let localSprite = createSprite(xyz, x, 20, 20)
        localSprite.velocityY = velocity;
        localSprite.scale = 0.4;
        localSprite.lifetime = 60;
        localSprite.depth = drawer.depth - 2;

        localSprite.addAnimation('coinsAnimation', coinsAnimation);

        gameGroup.add(localSprite);
        coinsGroup.add(localSprite);
    }
    // }
}