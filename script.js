document.addEventListener("DOMContentLoaded", () => {
    const roleSelection = document.getElementById("roleSelection");
    const judgeScreen = document.getElementById("judgeScreen");
    const wordInputScreen = document.getElementById("wordInputScreen");
    const waitingScreen = document.getElementById("waitingScreen");
    const gameScreen = document.getElementById("gameScreen");
    const boxContainer = document.getElementById("boxContainer");
    const gameCanvas = document.getElementById("gameCanvas");
    const restartGame = document.getElementById("restartGame");

    const judgeModeBtn = document.getElementById("judgeMode");
    const playerModeBtn = document.getElementById("playerMode");
    const observerModeBtn = document.getElementById("observerMode");
    const generateBoxesBtn = document.getElementById("generateBoxes");
    const startRoundBtn = document.getElementById("startRound");
    
    let boxCount = 0;
    let boxes = [];
    let correctBoxIndex = -1;
    let player = { x: 50, y: 50, size: 30 };
    let speed = 5;
    
    // 역할 선택 화면
    judgeModeBtn.addEventListener("click", () => {
        roleSelection.classList.add("hidden");
        judgeScreen.classList.remove("hidden");
    });
    
    playerModeBtn.addEventListener("click", () => {
        roleSelection.classList.add("hidden");
        waitingScreen.classList.remove("hidden");
    });
    
    observerModeBtn.addEventListener("click", () => {
        roleSelection.classList.add("hidden");
        gameScreen.classList.remove("hidden");
    });
    
    // 박스 생성
    generateBoxesBtn.addEventListener("click", () => {
        boxCount = parseInt(document.getElementById("boxCount").value);
        if (isNaN(boxCount) || boxCount < 1) return;
        
        judgeScreen.classList.add("hidden");
        wordInputScreen.classList.remove("hidden");
        
        boxContainer.innerHTML = "";
        boxes = [];
        
        correctBoxIndex = Math.floor(Math.random() * boxCount);
        
        for (let i = 0; i < boxCount; i++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.textContent = "단어";
            box.style.left = `${Math.random() * 700 + 50}px`;
            box.style.top = `${Math.random() * 500 + 50}px`;
            if (i === correctBoxIndex) {
                box.classList.add("correct-box");
            }
            gameScreen.appendChild(box);
            boxes.push(box);
        }
    });
    
    // 라운드 시작
    startRoundBtn.addEventListener("click", () => {
        wordInputScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        initGame();
    });
    
    // 게임 로직
    function initGame() {
        const ctx = gameCanvas.getContext("2d");
        gameCanvas.width = 800;
        gameCanvas.height = 600;
        
        document.addEventListener("keydown", movePlayer);
        updateGame(ctx);
    }
    
    function movePlayer(event) {
        switch (event.key) {
            case "ArrowUp":
                player.y -= speed;
                break;
            case "ArrowDown":
                player.y += speed;
                break;
            case "ArrowLeft":
                player.x -= speed;
                break;
            case "ArrowRight":
                player.x += speed;
                break;
        }
        checkCollision();
    }
    
    function checkCollision() {
        boxes.forEach((box, index) => {
            const boxX = parseFloat(box.style.left);
            const boxY = parseFloat(box.style.top);
            if (
                player.x < boxX + 100 &&
                player.x + player.size > boxX &&
                player.y < boxY + 50 &&
                player.y + player.size > boxY
            ) {
                if (index === correctBoxIndex) {
                    displayWinMessage();
                }
            }
        });
    }
    
    function displayWinMessage() {
        alert("정답!");
        restartGame.classList.remove("hidden");
    }
});
