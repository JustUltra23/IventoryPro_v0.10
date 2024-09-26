<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

// Comprobar que todos los datos necesarios estén presentes
if (isset($data['tipo_estado'], $data['fecha_generacion'], $data['fecha_inicio_periodo'], $data['fecha_fin_periodo'], $data['tienda_id'], $data['ingresos'], $data['egresos'], $data['utilidad_neta'], $data['saldo_final'], $data['usuario_id'])) {
    $tipo_estado = $data['tipo_estado'];
    $fecha_generacion = $data['fecha_generacion'];
    $fecha_inicio_periodo = $data['fecha_inicio_periodo'];
    $fecha_fin_periodo = $data['fecha_fin_periodo'];
    $tienda_id = $data['tienda_id'];
    $ingresos = $data['ingresos'];
    $egresos = $data['egresos'];
    $utilidad_neta = $data['utilidad_neta'];
    $saldo_final = $data['saldo_final'];
    $usuario_id = $data['usuario_id'];

    // Insertar el estado financiero en la base de datos
    $query = "INSERT INTO estados_financieros (tipo_estado, fecha_generacion, fecha_inicio_periodo, fecha_fin_periodo, tienda_id, ingresos, egresos, utilidad_neta, saldo_final, usuario_id) 
              VALUES ('$tipo_estado', '$fecha_generacion', '$fecha_inicio_periodo', '$fecha_fin_periodo', $tienda_id, $ingresos, $egresos, $utilidad_neta, $saldo_final, $usuario_id)";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Estado financiero creado correctamente."));
    } else {
        echo json_encode(array("message" => "Error al crear el estado financiero.", "error" => mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>

