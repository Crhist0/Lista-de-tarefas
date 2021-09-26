document.getElementById("submit").addEventListener("click", logIn);

if (localStorage.getItem("accList") === null) {
    let accList = [];
    localStorage.setItem("accList", JSON.stringify(accList));
}

let accList = JSON.parse(localStorage.getItem("accList"));
let name = document.getElementById("name");
let pass = document.getElementById("pass");

function logIn() {
    if (testEmptyLogIn() == false) {
        return;
    }

    if (testExistentAccName() == false) {
        alert("Conta não encontrada.");
        return;
    }

    if (testAccNameAndPass() == true) {
        alert(`Bem vindo ${name.value}!`);
        window.location.assign("taskList.html");
        alert(""); // não sei porque, mas sem esse alerta o "window.location.assign("recados.html");" não vai
    } else {
        alert("Senha incorreta.");
        return;
    }
    // alert("passou todos os testes");
}

function testEmptyLogIn() {
    if (name.value && pass.value) {
        return true;
    } else {
        alert("Insira o nome e a senha.");
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
