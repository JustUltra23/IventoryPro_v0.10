<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Obtener el ID de la venta desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$venta_id = isset($data['venta_id']) ? $data['venta_id'] : null;

if (!$venta_id) {
    echo json_encode(['error' => 'ID de venta no proporcionado']);
    exit();
}

// Consultar la venta por ID
$query_venta = "SELECT id, fecha, ident_cliente, total FROM ventas WHERE id = ?";
$stmt_venta = $conexion->prepare($query_venta);
$stmt_venta->bind_param('i', $venta_id);
$stmt_venta->execute();
$result_venta = $stmt_venta->get_result();

if ($result_venta->num_rows > 0) {
    $venta = $result_venta->fetch_assoc();

    // Consultar los detalles de la venta
    $query_detalles = "SELECT dv.producto_id, p.codigo_ean, p.nombre, dv.cantidad 
                       FROM detalles_ventas dv 
                       JOIN productos p ON dv.producto_id = p.id 
                       WHERE dv.venta_id = ?";
    $stmt_detalles = $conexion->prepare($query_detalles);
    $stmt_detalles->bind_param('i', $venta_id);
    $stmt_detalles->execute();
    $result_detalles = $stmt_detalles->get_result();

    $detalles = [];
    while ($detalle = $result_detalles->fetch_assoc()) {
        $detalles[] = $detalle;
    }

    // Respuesta con la venta y sus detalles
    echo json_encode([
        'venta' => $venta,
        'detalles' => $detalles
    ]);

    $stmt_detalles->close();
} else {
    echo json_encode(['error' => 'Venta no encontrada']);
}

$stmt_venta->close();
$conexion->close();
?>
