<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Verificar si se pasó un ID en la solicitud
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $query = "SELECT * FROM pqrs WHERE id = $id";
    $result = mysqli_query($conexion, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);
    } else {
        echo json_encode(array("message" => "Solicitud no encontrada"));
    }
} else {
    // Consultar todas las solicitudes
    $query = "SELECT * FROM pqrs";
    $result = mysqli_query($conexion, $query);
    $solicitudes = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $solicitudes[] = $row;
    }
    
    echo json_encode($solicitudes);
}

mysqli_close($conexion);
?>
