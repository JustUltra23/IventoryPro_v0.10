<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Consultar todas las conciliaciones
$query = "SELECT id, fecha, cuenta_bancaria, saldo_libros, saldo_banco, (saldo_banco - saldo_libros) AS diferencia, estado FROM conciliaciones_bancarias";
$result = mysqli_query($conexion, $query);

if (mysqli_num_rows($result) > 0) {
    $conciliaciones = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $conciliaciones[] = $row;
    }
    echo json_encode($conciliaciones);
} else {
    echo json_encode(array("message" => "No se encontraron conciliaciones."));
}

mysqli_close($conexion);

?>
