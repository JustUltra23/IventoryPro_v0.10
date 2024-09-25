<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents('php://input'));

if (isset($data->identificacion)) {
    $identificacion = $data->identificacion;

    // Consulta para obtener el ID del vendedor basado en su identificación
    $query = "SELECT id FROM usuarios WHERE identificacion = '$identificacion'";
    $result = mysqli_query($conexion, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $vendedor = mysqli_fetch_assoc($result);
        echo json_encode($vendedor);
    } else {
        echo json_encode(['resultado' => 'Error', 'mensaje' => 'Vendedor no encontrado']);
    }
} else {
    echo json_encode(['resultado' => 'Error', 'mensaje' => 'Identificación no proporcionada']);
}

// Cerrar conexión
mysqli_close($conexion);

?>
