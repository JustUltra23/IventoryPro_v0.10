<?php 
    $servidor = "auth-db1625.hstgr.io";  // Nombre del servidor de la base de datos
    $usuario = "u606519744_admin2";      // Usuario de la base de datos
    $clave = "Octubre2024.";            // Contraseña de la base de datos
    $bd = "u606519744_iventorypro";      // Nombre de la base de datos
    
    $conexion = mysqli_connect($servidor, $usuario, $clave) or die ("NO HUBO CONEXIÓN CON SQL");
    mysqli_select_db($conexion, $bd) or die ("No se encontró la base de datos");
?>