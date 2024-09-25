<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtener los datos de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$detalle_id = isset($data['detalle_id']) ? $data['detalle_id'] : null;
$new_ean = isset($data['nuevo_codigo_ean']) ? $data['nuevo_codigo_ean'] : null;

if (!$detalle_id || !$new_ean) {
    echo json_encode(['error' => 'ID de detalle o nuevo EAN no proporcionado']);
    exit();
}

// Validar si el nuevo EAN existe en la tabla de productos
$query = "SELECT id FROM productos WHERE codigo_ean = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param('s', $new_ean);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $producto = $result->fetch_assoc();
    $nuevo_producto_id = $producto['id'];

    // Actualizar el detalle de la venta con el nuevo EAN
    $update_query = "UPDATE detalles_ventas SET producto_id = ? WHERE id = ?";
    $update_stmt = $conexion->prepare($update_query);
    $update_stmt->bind_param('ii', $nuevo_producto_id, $detalle_id);
    $update_stmt->execute();

    if ($update_stmt->affected_rows > 0) {
        echo json_encode(['resultado' => 'Éxito']);
    } else {
        echo json_encode(['error' => 'No se pudo actualizar el detalle de la venta']);
    }
} else {
    echo json_encode(['error' => 'El nuevo EAN no existe en la base de datos']);
}

$stmt->close();
$conexion->close();
?>
