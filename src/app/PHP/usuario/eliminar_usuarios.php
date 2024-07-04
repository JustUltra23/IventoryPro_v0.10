<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

require("../conexion.php");

$id = $_GET['id'];

$query = "DELETE FROM usuarios WHERE id=$id";
$result = mysqli_query($conexion, $query);

$response = new stdClass();
if ($result) {
    $response->resultado = 'Ok';
    $response->mensaje = 'Usuario eliminado correctamente';
} else {
    $response->resultado = 'Error';
    $response->mensaje = 'Error al eliminar el usuario';
}

echo json_encode($response);
?>
