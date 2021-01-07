<?php
    session_start();

    if(!isset($_SESSION['logado']))
    {
        header('location: index.html');
    }
    else{
        include_once 'backend/conexao.php';

        $conn = getNewConnection();
        $stmt = $conn->prepare("SELECT * FROM pessoa WHERE usuario = :u");
        $stmt->bindValue(":u", $_SESSION['usuario']);
        
        if($stmt->execute())
        {
            $dados = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        ?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="images/icon.png">
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/edit_info.css">
    <link id="colorsCSS" rel="stylesheet" type="text/css" href="css/colors/default.css">
    <title>Rolling Tetris</title>
</head>

<body onload="onLoad()">
    <div class="container">
        <header>
            <div class="back-button">
                <a class="btn-global" href="game.php">VOLTAR</a>
            </div>
            <div>
                <a href="game.php"><img src="images/logo-peq.png" alt="logo do tetris rolling"></a>
            </div>
        </header>

        <main>
            <div class="default-div register">
                <div class="header">
                    <div class="user-name">
                        <h1>Informações Pessoais</h1>
                    </div>
                    <img class="default-avatar avatar" src="images/sample-avatar.bmp" alt="Avatar">
                    <!-- Futuro evento em JS para permitir a edição da imagem -->
                </div>
                <form method="POST" action="backend/atualizarDados.php">
                    <div class="form-line">
                        <p>Nome completo</p>
                        <input type="text" name="nome" value="<?php echo $dados['nome']?>">
                    </div>
                    <div class="form-line">
                        <p>Data de nascimento</p>
                        <input type="date" disabled value="<?php echo $dados['nascimento']?>">
                    </div>
                    <div class="form-line">
                        <p>CPF</p>
                        <input type="text" disabled value="<?php echo $dados['cpf']?>"> 
                    </div>
                    <div class="form-line">
                        <p>Telefone</p>
                        <input type="tel" name="telefone" value="<?php echo $dados['telefone']?>"> 
                    <div class="form-line">
                        <p>E-Mail</p>
                        <input type="email" name="email" value="<?php echo $dados['email']?>">
                    </div>
                    <div class="form-line">
                        <p>Username</p>
                        <input type="text" disabled value="<?php echo $dados['usuario']?>">
                    </div>
                    <div class="form-line">
                        <p>Senha</p>
                        <input type="password" name="senha">
                    </div>
                    <button type="submit" name="enviar">Salvar</button>
                </form>
            </div>
        </main>

        <footer>
            <b>Gaveta Filmes - Web</b>. <br>
            SI401B - Programação para a Web, Unicamp, 2020.
        </footer>
    </div>
    <script src="script/default.js"></script>
</body>

</html>

<?php } 

        if(isset($_GET['enviar'])){
            // $a = $_POST['mail'];
            echo 'clicou';
            
        } 

?>