<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtén el usuario_id enviado por el frontend
$usuario_id = isset($_GET['usuario_id']) ? $_GET['usuario_id'] : null;

if ($usuario_id) {
    // Consulta las PQRs creadas solo por el usuario autenticado
    $query = "SELECT pqrs.id, usuarios.nombre_usuario, pqrs.fo_documento, pqrs.fecha, pqrs.tipo, pqrs.descripcion, pqrs.estado, tiendas.nombre AS nombre_tienda 
              FROM pqrs
              JOIN usuarios ON pqrs.usuario_id = usuarios.id
              JOIN tiendas ON pqrs.fo_tienda = tiendas.id
              WHERE pqrs.usuario_id = '$usuario_id'  -- Filtra por usuario_id
              ORDER BY pqrs.fecha DESC";
    
    $result = mysqli_query($conexion, $query);
    
    $lista_pqrs = array();
    
    while ($row = mysqli_fetch_assoc($result)) {
        $lista_pqrs[] = $row;
    }

    // Devuelve los datos como JSON
    echo json_encode($lista_pqrs);
} else {
    echo json_encode(array("message" => "Usuario no especificado"));
}

mysqli_close($conexion);
?>
