// formulario para saber quem está jogando 

var mydatabase = [];
// função que o usuário ao se cadastrar no sistema, seus dados ficam guardados
function playerCadastro(){
    var form = document.forms['form'];
    var basedados = {
        'name':form['nome'].value,
        'niver':form['aniversario'].value,
        'cpf':form['identificacao'].value,
        'telefone':form['phone'].value,
        'email':form['mail'].value,
        'usuario':form['user'].value,
        'password':form['senha'].value,
    }
    mydatabase.push(basedados);
}

// não sei exatamente como transpor uma nova classe para a Pessoa que estiver jogando
