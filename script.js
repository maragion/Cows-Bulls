"use strict"

let cows = 0;
let bulls = 0;
let userNumber;
let result = "";

function hideSecretNum() {
    document.getElementById("secret").style.color = "transparent"
}

function showSecretNum() {
    if (bulls == 4) {
        document.getElementById("secret").style.color = "black"
    }
}

function hideGame() {
    document.getElementById("secret").style.display = "none"
    document.getElementById("message").style.display = "none"
    document.getElementById("userInput").style.display = "none"
    document.getElementById("checkButton").style.display = "none"
    document.getElementById("repeatButton").style.display = "none"
    document.getElementById("secretTitle").style.display = "none"

}

function hideRules() {
    document.getElementById("rules").style.display = "none"
}

function showGame() {
    document.getElementById("secret").style.display = "block"
    document.getElementById("message").style.display = "block"
    document.getElementById("userInput").style.display = "block"
    document.getElementById("checkButton").style.display = "block"
    document.getElementById("secretTitle").style.display = "none"
    document.getElementById("secretTitle").style.display = "inline"
    document.getElementById("repeatButton").style.display = "none"

}

function getRandInt() {
    let number = ""
    for (let i = 0; i < 4; i++) {
        let numberPart = Math.floor(Math.random() * 10);
        if (i === 0 && numberPart === 0) {
            i--;
            continue;
        } else if (number.includes(numberPart)) {
            i--;
            continue;
        }
        number += numberPart;
    } return number;
}

function getUserNumber() {
    userNumber = document.getElementById("userInput").value;
    return userNumber;
}

function checkUserInput() {
    if (userNumber.length > 4 || userNumber.length < 4) {
        result = "<p>Необходимое колличество символов: 4</p>";
        return result;
    }

    for (let i = 0; i < 4; i++) {
        let count = 0;

        if (i == 0 && userNumber[i] == 0) {
            result = "<p>Число не должно начинаться с ноля!</p>";
            return result;
        } else if (!(Number.isInteger(Number(userNumber[i])))) {
            result = "<p>Во вводе должны содержаться только цифры!</p>";
            return result;
        } for (let j = 0; j < 4; j++) {
            if (userNumber[i] === userNumber[j]) {
                count += 1;
            }
            if (count > 1) {
                result = "<p>Цифры не должны повторяться!</p>"
                return result
            }
        }
    }
    result = userNumber;
    return result;
}

function getCowsAndBulls(number) {
    let secretNumber = document.getElementById("secret").value;
    cows = 0;
    bulls = 0;

    for (let i = 0; i < 4; i++) {
        if (number[i] == secretNumber[i]) {
            bulls += 1;
        } else
            for (let j = 0; j < 4; j++) {
                if (number[i] == secretNumber[j]) {
                    cows += 1;
                }
            }
    }
    result = (`<p>Коровы ${cows}, Быки ${bulls}</p>`);
    return result;
}

function checkWin() {
    if (bulls == 4) {
        document.getElementById("checkButton").style.display = "none"
        document.getElementById("repeatButton").style.display = "block"
        result += "Число отгадано! Если хотите сыграть снова, нажмите на кнопку ниже."
    }
}

function gameStart() {
    hideRules()
    document.getElementById("secret").value = getRandInt();
    hideSecretNum();
    showGame()
}

function getResults() {
    getUserNumber();

    let check = checkUserInput();

    if (check.length > 4) {
        return

    } else {
        getCowsAndBulls(check);
    }
}

function showResults() {
    let message = document.getElementById("message");

    getResults();

    showSecretNum()

    checkWin()

    message.innerHTML += `Вы ввели ${userNumber}. ${result}`
}

