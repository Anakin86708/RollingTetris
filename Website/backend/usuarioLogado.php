<?php
    session_start();
    if(!isset($_SESSION['username']))
    {
        header("Location: ../index.html");
        exit();
    }
    else
    {
        header("Location: ../game.html");
    }
?>

