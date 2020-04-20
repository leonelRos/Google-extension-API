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
setClock();