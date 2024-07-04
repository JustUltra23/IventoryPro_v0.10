<?php 
    $servidor = "localhost";
    $usuario = "root";
    $clave = "";
    $bd = "iventorypro";
    $conexion = mysqli_connect($servidor, $usuario, $clave) or die ("NO HUBO CONEXIÓN CON SQL");
    mysqli_select_db($conexion, $bd) or die ("no encontro la base de datos");
?>