// função para criar conta

function createAcc() {
    // // função inicial para criar a accList caso ela não exista
    if (localStorage.getItem("accList") === null || localStorage.getItem("accList") === "[]") {
        let accList = [];
        let accListJSON = JSON.stringify(accList);
        localStorage.setItem("accList", accListJSON);
    }

    let Name = document.getElementById("formName").value;
    let Pass = document.getElementById("formPass").value;
    let Rpass = document.getElementById("formRepeatPass").value;
    console.log("criando conta de " + Name);

    // validação de conta
    if (!Name && !Pass && Rpass) {
        alert("Insira um nome.");
        return;
    } else if (Name && Rpass !== Pass) {
        alert("A senha não foi repetida corretamente.");
        return;
    } else if (!Name && !Pass) {
        alert("Insira um nome e uma senha.");
        return;
    } else if (Pass == "") {
        alert("Insira uma senha válida.");
        return;
    } else if ((!Name && Pass) || (!Name && Rpass)) {
        alert("Insira um nome.");
        return;
    } else if (Name.length <= 3) {
        alert("Nome muito curto.");
        return;
    } else if (Pass.length <= 3) {
        alert("Senha muito curta.");
        return;
    }

    // criação da conta
    else if (Name && Rpass === Pass) {
        let accList = JSON.parse(localStorage.getItem("accList"));
        let acc = {
            formName: document.getElementById("formName").value,
            formPass: document.getElementById("formPass").value,
            taskList: [],
        };

        //função para dar push na accList
        function pushAcc() {
            accList.push(acc);
            let accListJSON = JSON.stringify(accList);
            localStorage.setItem("accList", accListJSON);
            alert("Conta de " + acc.formName + " criada com sucesso!");
            window.location.href = "index.html"; // esta linha não está entrando, não entendi porque :/
            alert(""); // com esse alerta o comando acima vai, pra mim não fez sentido
        } //Fim da função

        // verificação de lista vazia
        if (accList.length === 0) {
            pushAcc();
        } // verificação de duplicidade
        else {
            console.log("checando contas duplicadas");
            for (let X = 0; X < accList.length; X++) {
                if (accList[X].formName === acc.formName) {
                    alert("já existe uma conta de nome " + acc.formName);
                    return;
                }
            }
            // passou todos os testes
            console.log("sem contas duplicadas, criando...");
            pushAcc();
        }
    }
}
