// javaScript da tasklist

if (localStorage.getItem("loggedUser") == null) {
    alert("Usuário não logado.");
    window.location.href = "index.html";
}

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
let accList = JSON.parse(localStorage.getItem("accList"));
let taskList = loggedUser.taskList;

if (isLogged() == false) {
    alert("Usuário não logado.");
    window.location.href = "index.html";
} else {
    console.log(`${loggedUser.formName} está logado`);
    showList();
}

function isLogged() {
    if (localStorage.getItem("loggedUser") == null) {
        return false;
    }
}

function validateInputs() {
    if (!document.getElementById("description").value && !document.getElementById("detail").value) {
        Swal.fire({
            icon: "error",
            title: "Insira uma descrição e um detalhamento.",
        });
        return false;
    } else if (!document.getElementById("description").value) {
        Swal.fire({
            icon: "error",
            title: "Insira uma descrição.",
        });
        return false;
    } else if (!document.getElementById("detail").value) {
        Swal.fire({
            icon: "error",
            title: "Insira um detalhamento.",
        });
        return false;
    } else {
        return true;
    }
}

function addTask() {
    if (!validateInputs()) {
        return;
    }

    console.log("inserindo tarefa na lista de tarefas");
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    let task = {
        description: document.getElementById("description").value,
        detail: document.getElementById("detail").value,
    };
    loggedUser.taskList.push(task);
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    updateAccList();
    location.reload();
}

// feature botão salvar extendido
function addTaskTop() {
    if (!validateInputs()) {
        return;
    }

    console.log("inserindo tarefa na lista de tarefas");
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    let task = {
        description: document.getElementById("description").value,
        detail: document.getElementById("detail").value,
    };
    loggedUser.taskList.unshift(task);
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    updateAccList();
    location.reload();
}

function updateAccList() {
    for (let x = 0; x < accList.length; x++) {
        if (accList[x].formName == loggedUser.formName) {
            accList[x].taskList = JSON.parse(localStorage.getItem("loggedUser")).taskList;
            let accListJSON = JSON.stringify(accList);
            localStorage.setItem("accList", accListJSON);
            return;
        }
    }
}

function showList() {
    let x = taskList.length;
    y = 0;
    document.getElementById("tBody").innerHTML = "";
    while (x > 0) {
        x--;
        document.getElementById("tBody").innerHTML +=
            '<tr id="tableLine">' +
            '<td id="table" scope="row indexTable">' +
            (y + 1) +
            "</td>" +
            '<td id="tableDescription' +
            y +
            '"> <p style="max-width: 10vw; overflow: auto; scrollbar-width: thin; ">' +
            taskList[y].description +
            "</p></td>" +
            '<td id="tableDetails' +
            y +
            '"> <p style="max-width: 65vw; overflow: auto; scrollbar-width: thin; ">' +
            taskList[y].detail +
            "</p></td>" +
            '<td id="tableAction' +
            y +
            '">' +
            '<button style="margin-right: 8px;" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal' +
            y +
            '">Apagar</button>' +
            '<button id="tableEdit" type="button" class="btn btn-success" ' +
            // 'onclick="editTask(' +
            // y +
            // ')"' +
            'data-bs-toggle="modal" data-bs-target="#editModal' +
            y +
            '">Editar</button>' +
            "</td>" +
            "</tr>" +
            '<div class="modal fade" id="exampleModal' +
            y +
            '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title" id="exampleModalLabel">Apagar tarefa</h5>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">' +
            "</button>" +
            "</div>" +
            '<div class="modal-body">Deseja apagar esta tarefa?</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>' +
            '<button id="apagar" type="button" class="btn btn-danger" onclick="deleteTask(' +
            y +
            ')">Apagar</button></div></div></div></div>' +
            '<div class="modal fade" id="editModal' +
            y +
            '" tabindex="-1" aria-labelledby="exampleModalLabel"aria-hidden="true">' +
            '<div class="modal-dialog"><div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title" id="exampleModalLabel">Editar tarefa</h5>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal"aria-label="Close"></button>' +
            "</div>" +
            '<div class="modal-body">' +
            '<div class="form-floating mb-3">' +
            '<input type="text" class="form-control" id="floatingDescription' +
            y +
            '" placeholder=" " value="' +
            taskList[y].description +
            '" >' +
            '<label for="floatingDescription">Descrição</label>' +
            "</div>" +
            '<div class="form-floating">' +
            '<input type="text" class="form-control" id="floatingDetails' +
            y +
            '" placeholder=" " value="' +
            taskList[y].detail +
            '" >' +
            '<label id="detailsHistory" for="floatingDetails">Detalhamento</label>' +
            "</div>" +
            "</div>" +
            '<button style="margin: 0px 16px 0px;" type="button" class="btn btn-secondary"data-bs-dismiss="modal">Cancelar</button>' +
            '<button style="margin: 8px 16px 16px;" type="button" class="btn btn-primary"onclick="saveEdit(' +
            y +
            ')">Salvar</button>' +
            "</div>" +
            "</div>" +
            "</div>";
        y++;
        // detailsHistory.value.innerText = `${detailsHistory}`;
    }
}

function deleteTask(x) {
    console.log("deletando array de index " + x);
    taskList.splice(x, 1);
    let loggedUserJSON = JSON.stringify(loggedUser);
    localStorage.setItem("loggedUser", loggedUserJSON);
    updateAccList();
    location.reload();
}

function saveEdit(x) {
    //validação especial do edit
    function validateEditInputs(x) {
        let desc = document.getElementById("floatingDescription" + x).value;
        let det = document.getElementById("floatingDetails" + x).value;
        if (!desc && !det) {
            Swal.fire({
                icon: "error",
                title: "Insira uma descrição e um detalhamento.",
            });
            return false;
        } else if (!desc) {
            Swal.fire({
                icon: "error",
                title: "Insira uma descrição.",
            });
            return false;
        } else if (!det) {
            Swal.fire({
                icon: "error",
                title: "Insira um detalhamento.",
            });
            return false;
        } else {
            return true;
        }
    }
    if (!validateEditInputs(x)) {
        return;
    }

    loggedUser.taskList[x].description = document.getElementById("floatingDescription" + x).value;
    loggedUser.taskList[x].detail = document.getElementById("floatingDetails" + x).value;
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    updateAccList();
    location.reload();
}

// feature - logout button
function logout() {
    localStorage.removeItem("loggedUser");
    let alertaBootstrap = '<div class="alert alert-success" role="alert">Deslogando usuário...</div>';
    Swal.fire({
        icon: "info",
        html: alertaBootstrap,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
    });
    setTimeout(() => (window.location.href = "index.html"), 2000);
}
