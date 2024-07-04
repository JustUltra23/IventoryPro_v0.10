<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

require("../conexion.php");

$nombreUsuario = $params->nombre_usuario;
$identificacion = $params->identificacion;
$contrasena = sha1($params->contrasena); // Se recomienda usar sha1 o algún otro método seguro para almacenar contraseñas
$nombreCompleto = $params->nombre_completo;
$correoElectronico = $params->correo_electronico;
$celular = $params->celular;
$rolId = $params->rol_id;

$insertar = "INSERT INTO usuarios (nombre_usuario, identificacion, contrasena, nombre_completo, correo_electronico, celular, rol_id) VALUES ('$nombreUsuario', '$identificacion', '$contrasena', '$nombreCompleto', '$correoElectronico', '$celular', '$rolId')";

if (mysqli_query($conexion, $insertar)) {
    class Result {}
    $response = new Result();
    $response->resultado = 'Ok';
    $response->mensaje = 'USUARIO REGISTRADO CORRECTAMENTE';
    echo json_encode($response);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . $insertar . "<br>" . mysqli_error($conexion);
}

mysqli_close($conexion);
?>




