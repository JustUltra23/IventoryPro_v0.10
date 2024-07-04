<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

require("../conexion.php");

//id 	codigo_ean 	nombre 	descripcion 	precio 	proveedor_id 	

$nombre = $params->nombre;
$codigo_ean = $params->codigo_ean;
$descripcion = $params->descripcion;
$precio = $params->precio;
$proveedor_id = $params->proveedor_id;

$insertar = "INSERT INTO productos (nombre, codigo_ean, descripcion, precio, proveedor_id) VALUES ('$nombre', '$codigo_ean', '$descripcion', '$precio', '$proveedor_id')";

if (mysqli_query($conexion, $insertar)) {
    class Result {}
    $response = new Result();
    $response->resultado = 'Ok';
    $response->mensaje = 'Producto creado correctamente';
    echo json_encode($response);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . $insertar . "<br>" . mysqli_error($conexion);
}

mysqli_close($conexion);
?>