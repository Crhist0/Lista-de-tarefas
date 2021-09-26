// document.getElementById("submit").addEventListener("click", logIn);

document.getElementById("submit").addEventListener("click", function (event) {
    logIn();
    event.preventDefault();
    // location.reload();
    setTimeout(() => location.reload(), 2000);
});

let accList = JSON.parse(localStorage.getItem("accList"));
let name = document.getElementById("name");
let pass = document.getElementById("pass");

function logIn() {
    if (localStorage.getItem("accList") === null) {
        let accList = [];
        localStorage.setItem("accList", JSON.stringify(accList));
    }

    if (testEmptyLogIn() == false) {
        return;
    }

    if (testExistentAccName() == false) {
        Swal.fire({
            icon: "error",
            title: "Conta não encontrada.",
        });
        return;
    }

    if (testAccNameAndPass() == true) {
        let alertaBootstrap = '<div class="alert alert-success" role="alert">Bem vindo ' + name.value + "!</div>";
        Swal.fire({
            icon: "success",
            html: alertaBootstrap,
            title: "Logando...",
            text: `Bem vindo ${name.value}!`,
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
        // window.location.assign("taskList.html");
        // alert(""); // não sei porque, mas sem esse alerta o "window.location.assign("recados.html");" não vai
    } else {
        Swal.fire({
            icon: "error",
            title: "Senha incorreta.",
        });
        return;
    }
    // alert("passou todos os testes");
}

function testEmptyLogIn() {
    if (name.value && pass.value) {
        return true;
    } else {
        // Swal.fire("Insira o nome e a senha.");
        Swal.fire({
            icon: "error",
            title: "Insira o nome e a senha.",
        });
        return false;
    }
}

function testExistentAccName() {
    for (let x = 0; x < accList.length; x++) {
        console.log(accList[x].formName);
        if (accList[x].formName == name.value) {
            // alert("conta encontrada e senha batem");
            return true;
        }
    }

    return false;
}

function testAccNameAndPass() {
    for (let x = 0; x < accList.length; x++) {
        if (accList[x].formName == name.value && accList[x].formPass == pass.value) {
            let loggedUserJSON = JSON.stringify(accList[x]);
            localStorage.setItem("loggedUser", loggedUserJSON);
            return true;
        }
    }
}

if (!!JSON.parse(localStorage.getItem("loggedUser"))) {
    window.location.assign("taskList.html");
}
