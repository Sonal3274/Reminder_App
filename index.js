const list = document.getElementsByClassName("list")[0];
let remainderMapArray = [];


//Create reminder function (Template Card)
function createReminder() {
    //Error handling
    event.preventDefault();
    let timeHr = $("#TimeHr").val();
    let timeMin = $("#TimeMin").val();
    let timeSec = $("#TimeSec").val();
    let id = Math.floor(Math.random() * 100);
    const li = document.createElement("li");
    li.className = "reminder";
    li.id = id;
    const div = document.createElement("div");
    div.className = "text";
    div.id = `text` + id + ``;
    div.innerText = $("#remindMessage").val() + ", At: " + timeHr + "Hr " + timeMin + "Min " + timeSec + "Sec";

    //Actions container
    const actionContainer = document.createElement("div");
    actionContainer.className = "actions";

    const deleteBtn = document.createElement("button")
    deleteBtn.className = "btn-delete btn";
    deleteBtn.innerText = "Delete";

    //Event Handler
    let currentTime = new Date();
    var remainderMap = {
        remainderId: `text` + id + ``,
        remainderTimeLeft: getTimeInFutureForRemainder(currentTime, timeHr, timeMin, timeSec) - currentTime
    }
    remainderMapArray.push(remainderMap);
    deleteBtn.addEventListener("click", function() {
        list.removeChild(li);
    })

    //Append the button for actions
    actionContainer.appendChild(deleteBtn);

    //Append all the elements in Li
    li.appendChild(div);
    li.appendChild(actionContainer);
    $("#remainderForm").modal("toggle");
    $("#form").trigger("reset");
    return li;
}

function getTimeInFutureForRemainder(curr, hr, min, sec) {
    return new Date(curr.getFullYear(), curr.getMonth(), curr.getDate(), hr, min, sec);
}
$(document).ready(function() {

    $("#remainderForm").on("submit", function() {
        let reminder = createReminder();
        list.appendChild(reminder);
    });
});

const myTimeout = setInterval(myRemaindersCheck, 3000);

let audio = new Audio('wake-up-sound.mp3');

let elementToRemove;

function myRemaindersCheck() {
    for (let index = 0; index < remainderMapArray.length; index++) {
        const element = remainderMapArray[index];
        if (element.remainderTimeLeft < 0) {
            audio.play();
            if (confirm(document.getElementById(element.remainderId).innerHTML)) {
                elementToRemove = index;
                audio.pause();
                document.getElementById(element.remainderId).style.textDecoration = "line-through";
                break;
            } else {
                elementToRemove = index;
                audio.pause();
                document.getElementById(element.remainderId).style.textDecoration = "line-through";
                break;
            }
        } else {
            element.remainderTimeLeft = element.remainderTimeLeft - 3000;
        }
    }
    if (elementToRemove > -1) {
        remainderMapArray.splice(elementToRemove, 1);
        elementToRemove = undefined;
    }
}