<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Captura el cuerpo de la solicitud como JSON
$data = json_decode(file_get_contents('php://input'));

if (isset($data->tienda_id) && isset($data->fecha_inicio) && isset($data->fecha_fin)) {
    $tienda_id = $data->tienda_id;
    $fecha_inicio = $data->fecha_inicio;
    $fecha_fin = $data->fecha_fin;
    $vendedor_id = isset($data->vendedor_id) ? $data->vendedor_id : null;
    
    // Lógica de consulta aquí...
} else {
    echo json_encode([
        'resultado' => 'Error',
        'mensaje' => 'Faltan parámetros obligatorios'
    ]);
}


// Formatear las fechas para asegurarnos que están en 'YYYY-MM-DD'
$fecha_inicio = date('Y-m-d', strtotime($fecha_inicio));
$fecha_fin = date('Y-m-d', strtotime($fecha_fin));

// Preparar la consulta con validación de tienda y fechas
$query = "SELECT * FROM ventas WHERE tienda_id = '$tienda_id' AND fecha BETWEEN '$fecha_inicio' AND '$fecha_fin'";

// Añadir filtro opcional por vendedor si se proporciona
if ($vendedor_id) {
    $query .= " AND fo_vendedor = '$vendedor_id'";
}

// Ejecutar la consulta
$result = mysqli_query($conexion, $query);

// Inicializar array de ventas
$ventas = [];

// Verificar si la consulta tuvo éxito
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $ventas[] = $row;
    }

    // Verificar si el array de ventas está vacío
    if (empty($ventas)) {
        echo json_encode(["resultado" => "Sin resultados", "mensaje" => "No se encontraron ventas para los filtros proporcionados"]);
    } else {
        // Devolver las ventas en formato JSON
        echo json_encode($ventas);
    }
} else {
    // Si la consulta falla, enviar mensaje de error
    echo json_encode(["resultado" => "Error", "mensaje" => "Error en la consulta de la base de datos"]);
}

// Cerrar conexión
mysqli_close($conexion);
?>




