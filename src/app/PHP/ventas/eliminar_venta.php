<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtener el ID de la venta desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$venta_id = isset($data['venta_id']) ? $data['venta_id'] : null;

// Verificar que se haya recibido el ID de la venta
if (!$venta_id) {
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'ID de venta no proporcionado']);
    exit();
}

// Iniciar transacción
$conexion->begin_transaction();

try {
    // Eliminar los detalles de la venta primero
    $query_detalles = "DELETE FROM detalles_ventas WHERE venta_id = ?";
    $stmt_detalles = $conexion->prepare($query_detalles);
    $stmt_detalles->bind_param('i', $venta_id);

    if (!$stmt_detalles->execute()) {
        throw new Exception('Error al eliminar los detalles de la venta');
    }

    $stmt_detalles->close();

    // Luego eliminar la venta principal
    $query_venta = "DELETE FROM ventas WHERE id = ?";
    $stmt_venta = $conexion->prepare($query_venta);
    $stmt_venta->bind_param('i', $venta_id);

    if (!$stmt_venta->execute()) {
        throw new Exception('Error al eliminar la venta principal');
    }

    $stmt_venta->close();

    // Si todo va bien, hacer commit a la transacción
    $conexion->commit();
    echo json_encode(['resultado' => 'Éxito', 'mensaje' => 'Venta eliminada correctamente']);
} catch (Exception $e) {
    // Si algo falla, revertir la transacción
    $conexion->rollback();
    echo json_encode(['resultado' => 'Error', 'mensaje' => $e->getMessage()]);
}

// Cerrar la conexión
$conexion->close();

?>
