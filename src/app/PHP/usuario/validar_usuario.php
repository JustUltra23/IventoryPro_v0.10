<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$params = json_decode($json);

require("../conexion.php");

$nombreUsuario = $params->nombre_usuario;
$identificacion = $params->identificacion;
$correoElectronico = $params->correo_electronico;

// Validar datos existentes
function validarDatos($conexion, $nombreUsuario, $correoElectronico, $identificacion) {
    $validarUsuario = "SELECT COUNT(*) as count FROM usuarios WHERE nombre_usuario = '$nombreUsuario'";
    $validarCorreo = "SELECT COUNT(*) as count FROM usuarios WHERE correo_electronico = '$correoElectronico'";
    $validarIdentificacion = "SELECT COUNT(*) as count FROM usuarios WHERE identificacion = '$identificacion'";

    $usuarioResult = mysqli_query($conexion, $validarUsuario);
    $correoResult = mysqli_query($conexion, $validarCorreo);
    $identificacionResult = mysqli_query($conexion, $validarIdentificacion);

    $usuarioCount = mysqli_fetch_assoc($usuarioResult)['count'];
    $correoCount = mysqli_fetch_assoc($correoResult)['count'];
    $identificacionCount = mysqli_fetch_assoc($identificacionResult)['count'];

    $errors = [];

    if ($usuarioCount > 0) {
        $errors[] = "El nombre de usuario ya está registrado.";
    }
    if ($correoCount > 0) {
        $errors[] = "El correo electrónico ya está registrado.";
    }
    if ($identificacionCount > 0) {
        $errors[] = "La identificación ya está registrada.";
    }

    return [
        'userExists' => $usuarioCount > 0,
        'emailExists' => $correoCount > 0,
        'idExists' => $identificacionCount > 0,
        'errors' => $errors, // Agregar los errores aquí
    ];
}

// Llama a la función para validar antes de insertar
$validacion = validarDatos($conexion, $nombreUsuario, $correoElectronico, $identificacion);

header('Content-Type: application/json');
echo json_encode($validacion);

mysqli_close($conexion);
?>
