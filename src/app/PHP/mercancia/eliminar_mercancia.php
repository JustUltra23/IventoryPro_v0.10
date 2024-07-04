<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$id = $_GET['id'];

require("../conexion.php");

$eliminar = "DELETE FROM productos WHERE id=$id";

if (mysqli_query($conexion, $eliminar)) {
    class Result {}
    $response = new Result();
    $response->resultado = 'Ok';
    $response->mensaje = 'Producto eliminado correctamente';
    echo json_encode($response);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . $eliminar . "<br>" . mysqli_error($conexion);
}

mysqli_close($conexion);
?>