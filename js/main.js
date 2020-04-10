
function clock (){
    let today = new Date(),
        h = today.getHours(),
        m = today.getMinutes(),
        s = today.getSeconds();

    document.querySelectorAll('.txt')[0].innerHTML = checktime(h) + ":" + checktime(m) + ":" + checktime(s);

    //this function is adding a "0" in front of numbers < 10 
    function checktime (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}
setInterval(clock, 500);