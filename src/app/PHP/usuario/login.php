<?php
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');  // Permitir métodos POST y OPTIONS
header('Content-Type: application/json; charset=UTF-8');

// Manejar la solicitud OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Leer el cuerpo de la solicitud
$json = file_get_contents('php://input');
$params = json_decode($json);

// Verificar que los parámetros existan
if (!isset($params->email) || !isset($params->password)) {
    http_response_code(400);
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'Faltan datos obligatorios']);
    exit();
}

require("../conexion.php");

$email = mysqli_real_escape_string($conexion, $params->email);
$contrasena = sha1($params->password);

// Verificar si hay algún error en la conexión
if (mysqli_connect_errno()) {
    error_log("Error de conexión a la base de datos: " . mysqli_connect_error());
    http_response_code(500);
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'Error de conexión a la base de datos']);
    exit();
}

$consulta = "SELECT id, identificacion, rol_id FROM usuarios WHERE correo_electronico = '$email' AND contrasena = '$contrasena'";
$result = mysqli_query($conexion, $consulta);

if (!$result) {
    http_response_code(500);
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'Error en la base de datos: ' . mysqli_error($conexion)]);
    mysqli_close($conexion);
    exit();
}

if (mysqli_num_rows($result) > 0) {
    $usuario = mysqli_fetch_assoc($result);
    error_log("Usuario encontrado con rol_id: " . $usuario['rol_id']);

    $response = [
        'resultado' => 'Ok',
        'mensaje' => 'Inicio de sesión exitoso',
        'rol_id' => $usuario['rol_id'],
        'user_id' => $usuario['id'],
        'identificacion' => $usuario['identificacion']
    ];

    echo json_encode($response);
} else {
    http_response_code(401);
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'Credenciales inválidas']);
}

mysqli_close($conexion);

?>


