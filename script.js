// constants and variables is here...........................................................
let inputdir = { x: 0, y: 0 }
const musicsound = new Audio("music.mp3")
const gameoversound = new Audio("gameover.mp3")
const movesound = new Audio("move.mp3")
const foodsound = new Audio("food.mp3")
let lastpainttime = 0;
let speed = 10;
let snakearr = [
    { x: 12, y: 10 }
]
food = { x: 5, y: 7 }
let score = 0;

// game fuctions are here......................................................................
function iscollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameingine()

}

function gameingine() {
    //Part 1: Update the snake array and......................
    if (iscollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        inputdir = { x: 0, y: 0 }
        alert("gameover press anykey to restart!")
        musicsound.play()
        snakearr = [{ x: 12, y: 10 }]
        score = 0;
    }

    //when you eaten food regenerate food and increament the sanke 
    if (snakearr[0].x === food.x && snakearr[0].y === food.y) {
        foodsound.play();
        score += 1;
        if (score>hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            highscore.innerHTML = "high score: " + hiscoreval;
        }
        scoreboard.innerHTML = "score: " + score;
        let a = 2;
        let b = 16;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake........ 
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] }

    }
    snakearr[0].x += inputdir.x
    snakearr[0].y += inputdir.y

    //Part 2: Display snake and Food..........................
    // Displaying the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement("div");
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeelement.classList.add("head");
        } else {
            snakeelement.classList.add("snake");
        }
        board.appendChild(snakeelement);
    });
    
    //Displaying the food 
    foodelement = document.createElement("div")
    foodelement.classList.add("food")
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    board.append(foodelement);
}



// main logics are here..........................................................................
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore)
    highscore.innerHTML = "high score: " + hiscore; 
}
window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    inputdir = { x: 0, y: 1 } //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowUp");
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            console.log("arrowDown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            console.log("arrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            console.log("arrowRight");
            inputdir.x = 1;
            inputdir.y = 0;
            break;

    }
})