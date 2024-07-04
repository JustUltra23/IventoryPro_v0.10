<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

//id 	codigo_ean 	nombre 	descripcion 	precio 	proveedor_id 	

require("../conexion.php");

$id = $params->id;
$nombre = $params->nombre;
$codigo_ean = $params->codigo_ean;
$descripcion = $params->descripcion;
$precio = $params->precio;
$proveedor_id = $params->proveedor_id;

$actualizar = "UPDATE productos SET nombre='$nombre', codigo_ean='$codigo_ean', descripcion='$descripcion', precio='$precio', proveedor_id='$proveedor_id' WHERE id=$id";

if (mysqli_query($conexion, $actualizar)) {
    class Result {}
    $response = new Result();
    $response->resultado = 'Ok';
    $response->mensaje = 'Proveedor actualizado correctamente';
    echo json_encode($response);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . $actualizar . "<br>" . mysqli_error($conexion);
}

mysqli_close($conexion);
?>