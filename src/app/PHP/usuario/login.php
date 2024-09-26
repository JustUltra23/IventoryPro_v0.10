<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, OPTIONS'); // Permitir métodos POST y OPTIONS
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

// Limpiar los datos para evitar inyecciones SQL
$email = mysqli_real_escape_string($conexion, $params->email);
$contrasena = sha1($params->password); // Asegúrate de usar el mismo método de encriptación

// Cambia la consulta para obtener el rol_id y el id del usuario
$consulta = "SELECT id, identificacion, rol_id FROM usuarios WHERE correo_electronico = '$email' AND contrasena = '$contrasena'";
$result = mysqli_query($conexion, $consulta);

// Verificar si la consulta se ejecutó correctamente
if (!$result) {
    http_response_code(500);
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'Error en la base de datos: ' . mysqli_error($conexion)]);
    mysqli_close($conexion);
    exit();
}

// Verificar si se encontró un usuario
if (mysqli_num_rows($result) > 0) {
    $usuario = mysqli_fetch_assoc($result);
    error_log("Usuario encontrado con rol_id: " . $usuario['rol_id']); // Log para depurar

    // Crear la respuesta
    $response = [
        'resultado' => 'Ok',
        'mensaje' => 'Inicio de sesión exitoso',
        'rol_id' => $usuario['rol_id'], // Añadir rol_id a la respuesta
        'user_id' => $usuario['id'], // Añadir id del usuario
        'identificacion' => $usuario['identificacion'] // Añadir identificación a la respuesta
    ];

    echo json_encode($response);
} else {
    // Credenciales inválidas
    http_response_code(401);
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'Credenciales inválidas']);
}

mysqli_close($conexion);
?>


