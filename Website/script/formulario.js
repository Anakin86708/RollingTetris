// formulario para saber quem está jogando 



function validaFormulario()
{
    let nome = document.forms["form"]["nome"].value;
    let aniversario = document.forms["form"]["aniversario"].value;
    let cpf = document.forms["form"]["cpf"].value;
    let telefone = document.forms["form"]["phone"].value;
    let email = document.forms["form"]["mail"].value;
    let usuario = document.forms["form"]["user"].value;
    let senha = document.forms["form"]["senha"].value;

    let validaCPF = "\d{11}";



    if (nome == null || nome == "")
    {
        alert("Nome errado!");
        return false;
    }else if(aniversario == null)
    {
        alert("Data de nascimento deve ser válida");
        return false;
    }
}