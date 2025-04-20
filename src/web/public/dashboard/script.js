window.addEventListener("DOMContentLoaded", () => {
    loadClientInformation();
    loadPingStats();
})

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

function loadClientInformation() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/@me");
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
            const user = JSON.parse(xhr.responseText);
            const element = document.getElementById("user");
            element.innerHTML = `<div style="display: flex;"><img src="${user.avatar_url}" alt="Avatar" style="margin: 8px;"><span>Name: ${user.username}#${user.discriminator}<br>ID: ${user.id}</span><div>`;
        }
    }
}

function loadPingStats() {
    let chart_data = new Object();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/stats/ping");
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState === xhr.DONE) {
            const response = JSON.parse(xhr.responseText);
            for (let i=0; i<Object.keys(response).length; i++) {
                const date = new Date(parseInt(Object.keys(response)[i])*1000);
                chart_data[date.toLocaleTimeString("ja-JP")] = Object.values(response)[i];
            }

            const canvas = document.getElementById("ping_canvas");
            new Chart(canvas, {
                type: "line",
                data: {
                    datasets: [{
                        label: "Ping (ms)",
                        data: chart_data
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    }
}