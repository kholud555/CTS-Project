
function getLeaderboard()
{
     return JSON.parse(localStorage.getItem('leaderboard')) || [];
}

function sortLeaderboard() {
    var leaderboard = getLeaderboard();
    return leaderboard.sort((a, b) => (a.totalQuestions-a.correctAnswers) - (b.totalQuestions-b.correctAnswers));
}

function displyLeaderBoard(){
    var leaderboard = sortLeaderboard();
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; 

    leaderboard.forEach((user, index) => {
        var tr = document.createElement("tr");
        var icon = document.createElement("td");
        var name = document.createElement("td");
        var score = document.createElement("td");
        var date = document.createElement("td");
        icon.classList.add("p-2");
        switch(index) {
            case 0:
                icon.innerHTML = `<i class="fa-solid fa-medal text-yellow-500"></i>`;
                score.classList.add("text-green-700");
                break;
            case 1:
                icon.innerHTML = `<i class="fa-solid fa-medal text-gray-400"></i>`;
                score.classList.add("text-red-700");
                break;
            case 2:
                icon.innerHTML = `<i class="fa-solid fa-medal text-yellow-900"></i>`;
                score.classList.add("text-red-700");
                break;
            default:
                icon.innerHTML = `<i class="fa-solid fa-trophy"></i>`;
        }
        name.innerHTML = user.name;
        score.innerHTML = `${user.correctAnswers}/${user.totalQuestions}`;
        date.innerHTML = user.date; 
        tr.appendChild(icon);
        tr.appendChild(name);
        tr.appendChild(score);
        tr.appendChild(date);
        tbody.appendChild(tr);
    });
}

function addEventListeners() {
    var homeBtn = document.querySelector(".return-to-home");
 
    homeBtn.addEventListener("click", function() {
        sessionStorage.removeItem("userPreferences");
        window.location.href = "index.html";
    });
}

displyLeaderBoard();
addEventListeners();

