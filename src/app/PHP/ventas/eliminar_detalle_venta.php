<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtener el ID del detalle de la venta desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$detalle_id = isset($data['detalle_id']) ? $data['detalle_id'] : null;

// Agregar log para verificar el ID que está recibiendo
error_log(print_r($data, true)); // Esto guardará el contenido de $data en el log de errores del servidor

if (!$detalle_id) {
    echo json_encode(['error' => 'ID de detalle no proporcionado']);
    exit();
}

// Agregar log para verificar el ID de la venta
error_log('ID de venta recibido: ' . $venta_id)

// Antes de eliminar el detalle, verificar si existe
$checkQuery = "SELECT * FROM detalles_ventas WHERE id = ?";
$checkStmt = $conexion->prepare($checkQuery);
$checkStmt->bind_param('i', $detalle_id);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows === 0) {
    echo json_encode(['error' => 'ID de detalle no encontrado']);
    exit();
}

// Eliminar el detalle de la venta
$query = "DELETE FROM detalles_ventas WHERE id = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param('i', $detalle_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['resultado' => 'Éxito']);
} else {
    echo json_encode(['error' => 'No se pudo eliminar el detalle de la venta']);
}

$stmt->close();
$conexion->close();

