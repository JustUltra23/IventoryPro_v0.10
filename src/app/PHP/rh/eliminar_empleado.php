<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: DELETE');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

// Comprobar que el ID esté presente
if (isset($data['id'])) {
    $id = $data['id'];

    // Eliminar el empleado de la base de datos
    $query = "DELETE FROM empleados WHERE id='$id'";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Empleado eliminado con éxito."));
    } else {
        echo json_encode(array("message" => "Error al eliminar el empleado.", "error" => mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "ID no proporcionado."));
}

mysqli_close($conexion);
?>
