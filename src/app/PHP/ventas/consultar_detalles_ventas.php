<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

// Incluir la conexión a la base de datos
require("../conexion.php");

// Obtener el ID de la venta desde la solicitud
$venta_id = $_GET['venta_id'];

// Verificar que se haya recibido el ID de la venta
if (!$venta_id) {
    echo json_encode(["error" => "ID de venta no proporcionado"]);
    exit();
}

// Consultar los detalles de la venta incluyendo el código EAN
$sql = "SELECT dv.cantidad, p.nombre, p.precio, p.codigo_ean
        FROM detalles_ventas dv
        JOIN productos p ON dv.producto_id = p.id
        WHERE dv.venta_id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $venta_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontraron resultados
if ($result->num_rows > 0) {
    $detalles = [];
    while ($row = $result->fetch_assoc()) {
        // Calcular subtotal por cada producto (cantidad * precio)
        $row['subtotal'] = $row['cantidad'] * $row['precio'];
        $detalles[] = $row;
    }
    // Devolver los detalles de la venta en formato JSON
    echo json_encode($detalles);
} else {
    echo json_encode(["error" => "No se encontraron detalles para esta venta"]);
}

// Cerrar conexión
$conexion->close();
?>

