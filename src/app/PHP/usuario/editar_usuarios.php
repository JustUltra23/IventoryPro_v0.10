<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

require("../conexion.php");

// Actualiza solo los campos permitidos, sin la contraseña
$editar = "UPDATE usuarios SET nombre_usuario='$params->nombre_usuario', identificacion='$params->identificacion', nombre_completo='$params->nombre_completo', correo_electronico='$params->correo_electronico', celular='$params->celular', rol_id='$params->rol_id' WHERE id=$params->id";

if (mysqli_query($conexion, $editar)) {
    $response = new stdClass();
    $response->resultado = 'Ok';
    $response->mensaje = 'Datos modificados correctamente';
} else {
    $response = new stdClass();
    $response->resultado = 'Error';
    $response->mensaje = 'Error al modificar los datos';
}

echo json_encode($response);
?>

