// formulario para saber quem está jogando 


function validaFormulario() {
    let nome = document.forms["form"]["nome"].value;
    let aniversario = document.forms["form"]["aniversario"].value;
    let cpf = document.forms["form"]["cpf"].value;
    let telefone = document.forms["form"]["phone"].value;
    let email = document.forms["form"]["mail"].value;
    let usuario = document.forms["form"]["user"].value;
    let senha = document.forms["form"]["senha"].value;

    if (nome == null || nome == "") {
        alert("Nome errado!");
        return false;
    }
    if (aniversario == null) {
        alert("Data de nascimento deve ser válida");
        return false;
    }
    if (!validaCPF(cpf)) {
        alert("CPF inválido!");
        return false;
    }
    if (!validaTelefone(telefone)) {
        alert("Telefone inválido! Insira no formato (00)0000-0000")
        return false;
    }
    if ((usuario == null || usuario == "") && (usuario > 29)) {
        alert("O nome de usuáio não deve ser nulo e não pode ultrapassar 30 caracteres.");
        return false;
    }
    if ((senha == null || senha == "") && (senha > 49)) {
        alert("A senha não deve ser nula e não pode ultrapassar 50 caracteres.");
        return false;
    }
    return true;
}

function validaCPF(cpf) {
    let regexCPF = /^\d{11}(?!.)/;

    return regexCPF.test(cpf);
}

function validaTelefone(telefone) {
    let regexTelefone = /\(\d{2}\)\d{4,5}-\d{4}/;

    return regexTelefone.test(telefone);
}

function loadRankingFromDB() {
    var xhttp;
    
    var data = new FormData();
    data.append('cpf', cpf);
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("rankingTable").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "backend/rankingBD.php", true);
    console.log("Envindo cpf " + cpf);
    xhttp.send(data);
}
