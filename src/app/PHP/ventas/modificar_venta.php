<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents('php://input'), true);
$venta_id = $data['venta_id'] ?? null;
$detalles = $data['detalles'] ?? [];
$total = $data['total'] ?? 0;

if (!$venta_id || empty($detalles)) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit();
}

$conexion->begin_transaction();

try {
    // Actualizar el total de la venta
    $query_venta = "UPDATE ventas SET total = ? WHERE id = ?";
    $stmt_venta = $conexion->prepare($query_venta);
    $stmt_venta->bind_param('di', $total, $venta_id);
    $stmt_venta->execute();
    $stmt_venta->close();

    // Actualizar detalles de la venta
    foreach ($detalles as $detalle) {
        $producto_id = $detalle['producto_id'];
        $cantidad = $detalle['cantidad'];

        $query_detalle = "UPDATE detalles_ventas SET cantidad = ? WHERE venta_id = ? AND producto_id = ?";
        $stmt_detalle = $conexion->prepare($query_detalle);
        $stmt_detalle->bind_param('iii', $cantidad, $venta_id, $producto_id);
        $stmt_detalle->execute();
        $stmt_detalle->close();
    }

    $conexion->commit();
    echo json_encode(['resultado' => 'Éxito', 'mensaje' => 'Venta actualizada correctamente']);
} catch (Exception $e) {
    $conexion->rollback();
    echo json_encode(['error' => 'Error al actualizar la venta: ' . $e->getMessage()]);
}

$conexion->close();
?>
