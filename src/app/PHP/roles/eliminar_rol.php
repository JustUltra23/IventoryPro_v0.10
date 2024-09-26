<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Verificar si se pasó un ID en la solicitud
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Eliminar el rol de la base de datos
    $query = "DELETE FROM roles WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Rol eliminado exitosamente"));
    } else {
        echo json_encode(array("message" => "No se pudo eliminar el rol: " . mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "ID no proporcionado."));
}

mysqli_close($conexion);
?>
