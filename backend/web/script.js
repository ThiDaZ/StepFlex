function sendData() {

    const data = "name"

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "A", true);
    ajax.send(data);


}

