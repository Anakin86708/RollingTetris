<?php
include_once('conexao.php');

if (!isset($_POST['cpf']))
{
    return;
}

$conn = getNewConnection();
$sql = "SELECT pe.nome, pa.pontuacao, pa.dificuldade, pa.tempoPartida, pe.cpf FROM pessoa pe JOIN partida pa ON pe.cpf = pa.cpfJogador WHERE pe.cpf = ? ORDER BY pontuacao DESC";
$stmt = $conn->prepare($sql);
$stmt->bindValue(1, $_POST['cpf']);
$stmt->execute();

echo "<tr class='ranking-row header-table'>
<th>Nome</th>
<th>Pontuação</th>
<th>Nível</th>
<th>Tempo</th>
</tr>";
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<tr class='ranking-row'><td>{$row['nome']}</td><td>{$row['pontuacao']}</td><td>{$row['dificuldade']}</td><td>{$row['tempoPartida']}</td>";
}
