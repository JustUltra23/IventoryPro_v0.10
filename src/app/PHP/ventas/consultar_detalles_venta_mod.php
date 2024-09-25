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

// Consultar los detalles de la venta
$query = "SELECT dv.producto_id, dv.cantidad, p.nombre, p.codigo_ean FROM detalles_ventas dv JOIN productos p ON dv.producto_id = p.id WHERE dv.venta_id = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param('i', $venta_id);
$stmt->execute();
$result = $stmt->get_result();

$detalles = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $detalles[] = $row;
    }
    echo json_encode($detalles);
} else {
    echo json_encode(['error' => 'No se encontraron detalles para esta venta']);
}

$stmt->close();
$conexion->close();
?>
