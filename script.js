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
    let words = [];
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

    // 박스 생성 및 단어 입력 화면 이동
    generateBoxesBtn.addEventListener("click", () => {
        boxCount = parseInt(document.getElementById("boxCount").value);
        if (isNaN(boxCount) || boxCount < 1) return;

        judgeScreen.classList.add("hidden");
        wordInputScreen.classList.remove("hidden");

        boxContainer.innerHTML = "";
        boxes = [];
        words = [];

        correctBoxIndex = Math.floor(Math.random() * boxCount);

        for (let i = 0; i < boxCount; i++) {
            const box = document.createElement("div");
            box.classList.add("box");

            // 텍스트 입력 필드 추가
            const inputField = document.createElement("input");
            inputField.type = "text";
            inputField.placeholder = "단어 입력";
            inputField.classList.add("word-input");
            
            // 정답 박스 구분
            if (i === correctBoxIndex) {
                box.classList.add("correct-box");
            }

            box.appendChild(inputField);
            boxContainer.appendChild(box);
            boxes.push(inputField);
        }
    });

    // 라운드 시작 (입력된 단어들을 반영하여 게임 화면 이동)
    startRoundBtn.addEventListener("click", () => {
        words = boxes.map(input => input.value || "기본단어");

        // 단어 박스를 실제 게임 화면에 반영
        wordInputScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");

        gameScreen.innerHTML = ""; // 기존 요소 제거
        words.forEach((word, index) => {
            const box = document.createElement("div");
            box.classList.add("box");
            box.textContent = word;
            box.style.left = `${Math.random() * 700 + 50}px`;
            box.style.top = `${Math.random() * 500 + 50}px`;

            if (index === correctBoxIndex) {
                box.classList.add("correct-box");
            }

            gameScreen.appendChild(box);
        });

        notifyPlayers(); // 플레이어 모드를 선택한 사용자들에게 게임이 시작됨을 알림
    });

    function notifyPlayers() {
        waitingScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
    }
});
