function changeStatus(status) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/status/${status}`);
    xhr.send();
}

function changeActivity() {
    let activity_type = "";
    const radio_elements = document.getElementsByName("activity_type");
    for (let i=0; i<radio_elements.length; i++) {
        if (radio_elements[i].checked) {
            activity_type = radio_elements[i].id;
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/activity/${activity_type}`);
    xhr.send("foo=bar");
}