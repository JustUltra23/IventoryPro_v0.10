<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

require("../conexion.php");

$id = $params->id;
$nombre = $params->nombre;
$identificacion = $params->identificacion;
$fecha_convenio = $params->fecha_convenio;
$direccion = $params->direccion;
$celular = $params->celular;
$correo_electronico = $params->correo_electronico;
$ciudad = $params->ciudad;

$actualizar = "UPDATE proveedores SET nombre='$nombre', identificacion='$identificacion', fecha_convenio='$fecha_convenio', direccion='$direccion', celular='$celular', correo_electronico='$correo_electronico', ciudad='$ciudad' WHERE id=$id";

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
