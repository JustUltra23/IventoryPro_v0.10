<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir datos JSON y validar el campo EAN
$data = json_decode(file_get_contents("php://input"), true);
$ean = isset($data['ean']) ? $data['ean'] : '';

$response = new stdClass();

// Verificar que el EAN no esté vacío
if (!empty($ean)) {
    // Usar prepared statements para evitar inyecciones SQL
    $stmt = $conexion->prepare("SELECT * FROM productos WHERE codigo_ean = ?");  // Cambiado de 'ean' a 'codigo_ean'
    $stmt->bind_param('s', $ean);  // 's' indica que el parámetro es una cadena

    if ($stmt->execute()) {
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response->resultado = 'Ok';
            $response->producto = $result->fetch_assoc();
        } else {
            $response->resultado = 'Error';
            $response->mensaje = 'Producto no existe';
        }
    } else {
        $response->resultado = 'Error';
        $response->mensaje = 'Error al consultar producto';
    }

    $stmt->close();
} else {
    $response->resultado = 'Error';
    $response->mensaje = 'EAN no proporcionado o vacío';
}

echo json_encode($response);

mysqli_close($conexion);

?>



