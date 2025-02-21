document.getElementById("judgeMode").addEventListener("click", function() {
    alert("심판 모드 활성화");
    document.getElementById("roleSelection").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    document.getElementById("startRound").style.display = "inline-block";
});

document.getElementById("playerMode").addEventListener("click", function() {
    alert("플레이어 모드 활성화");
    document.getElementById("roleSelection").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
});

// 게임 캔버스 설정
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let players = [];
let words = [];
let gameStarted = false;

document.getElementById("startRound").addEventListener("click", function() {
    gameStarted = true;
    alert("Round Start!");
});
