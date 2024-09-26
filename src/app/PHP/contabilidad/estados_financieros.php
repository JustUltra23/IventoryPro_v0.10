<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php"); // Asegúrate de que la ruta es correcta

$sql = "SELECT ef.id, ef.tipo_estado, ef.fecha_generacion, ef.fecha_inicio_periodo, ef.fecha_fin_periodo, ef.tienda_id, ef.ingresos, ef.egresos, ef.utilidad_neta, ef.saldo_final, ef.usuario_id, t.nombre AS tienda_nombre 
        FROM estados_financieros ef 
        JOIN tiendas t ON ef.tienda_id = t.id";

$result = mysqli_query($conexion, $sql);

if ($result) {
    $estados_financieros = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $estados_financieros[] = $row;
    }
    echo json_encode($estados_financieros);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(array("message" => "Error: " . mysqli_error($conexion)));
}

mysqli_close($conexion);

?>
