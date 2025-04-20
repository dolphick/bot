function changeStatus(status) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/status/${status}`);
    xhr.send();
}

function changeActivity() {
    let activity_type = "";
    const name = document.getElementById("activity_name").value;
    const radio_elements = document.getElementsByName("activity_type");
    for (let i=0; i<radio_elements.length; i++) {
        if (radio_elements[i].checked) {
            activity_type = radio_elements[i].id;
            break;
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `/api/activity/${activity_type}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({name: name}));
}