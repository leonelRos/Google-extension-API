// function clock() {
//     let today = new Date(),
//         h = today.getHours(),
//         m = today.getMinutes(),
//         s = today.getSeconds();

//     document.querySelectorAll('.txt')[0].innerHTML = checktime(h) + ":" + checktime(m) + ":" + checktime(s);

//     //this function is adding a "0" in front of numbers < 10 
//     function checktime(i) {
//         if (i < 10) {
//             i = "0" + i;
//         }
//         return i;
//     }
// }
// setInterval(clock, 500);

setInterval(setClock, 1000);

const dataHour = document.querySelector('[data-hour-hand]')
const dataMinute = document.querySelector('[data-minute-hand]')
const dataSecond = document.querySelector('[data-second-hand]')
const greetings = document.querySelector('[data-greeting]');
const name = document.querySelector('[data-name]')
const message = document.querySelector('[data-message]');


function setClock() {
    var currentDate = new Date();
    var secondsRatio = currentDate.getSeconds() / 60; //divide by 60 because there are 60 seconds in a minute
    var minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60; //60 seconds in one minute
    var hourRatio = (minutesRatio + currentDate.getHours()) / 12; // only 12 hours
    setRotation(dataSecond, secondsRatio)
    setRotation(dataMinute, minutesRatio)
    setRotation(dataHour, hourRatio)
}
//this function allows the handles to roatte using 
//(--rotation frm css to 360 degrees)
function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

function setBackImage(n) {
    let today = new Date();
    let hour = today.getHours();

    if (hour < 12) {
        //morning
        document.body.style.backgroundImage = "url('./img/morning-1.jpg')";
        greetings.textContent = 'Good Morning'
    } else if (hour < 18) {
        //afternoon
        document.body.style.backgroundImage = "url('./img/afternoon-1.jpg')";
        greetings.textContent = 'Good Afternoon';
        document.body.style.color = "aliceblue"
    } else {
        //evening
        document.body.style.backgroundImage = "url('./img/night-2.jpeg')";
        // document.body.style.backgroundImage = "url('./img/afternoon-1.jpg')";
        greetings.textContent = 'Good Evening';
        document.body.style.color = 'antiquewhite';
    }
}
//get name
function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '____'
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function setName(e) {
    if (e.type === "keypress") {
        //make sure ENTER  is pressed
        if (e.which == 13 || e.keyCode == 13) {
            //13 == key code ENTER || since is deprecated we use both which and keycode for browsers
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText); //we use the target prop to target specific item name
    };
};


//get message
function getMessage() {
    if (localStorage.getItem('message') === null) {
        message.textContent = '____';
    } else {
        message.textContent = localStorage.getItem('message');
    }
}

function setMessage(e) {
    if (e.type === "keypress") {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('message', e.target.innerText);
            message.blur();
        }
    } else {
        localStorage.setItem('message', e.target.innerText);
    }
}

//adding event listeners
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
message.addEventListener('keypress', setMessage);
message.addEventListener('blur', setMessage);

setClock();
setBackImage();
getName();
getMessage();
setName();
setMessage();