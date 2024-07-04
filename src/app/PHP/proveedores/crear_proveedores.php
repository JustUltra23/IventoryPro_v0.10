<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

require("../conexion.php");

$nombre = $params->nombre;
$identificacion = $params->identificacion;
$fecha_convenio = $params->fecha_convenio;
$direccion = $params->direccion;
$celular = $params->celular;
$correo_electronico = $params->correo_electronico;
$ciudad = $params->ciudad;

$insertar = "INSERT INTO proveedores (nombre, identificacion, fecha_convenio, direccion, celular, correo_electronico, ciudad) VALUES ('$nombre', '$identificacion', '$fecha_convenio', '$direccion', '$celular', '$correo_electronico', '$ciudad')";

if (mysqli_query($conexion, $insertar)) {
    class Result {}
    $response = new Result();
    $response->resultado = 'Ok';
    $response->mensaje = 'Proveedor creado correctamente';
    echo json_encode($response);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . $insertar . "<br>" . mysqli_error($conexion);
}

mysqli_close($conexion);
?>
