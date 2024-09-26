<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['fecha'], $data['cuenta_bancaria'], $data['saldo_libros'], $data['saldo_banco'], $data['estado'])) {

    $id = $data['id'];
    $fecha = $data['fecha'];
    $cuentaBancaria = $data['cuenta_bancaria'];
    $saldoLibros = $data['saldo_libros'];
    $saldoBanco = $data['saldo_banco'];
    $estado = $data['estado'];

    // Actualizar la conciliación en la base de datos
    $query = "UPDATE conciliaciones_bancarias 
              SET fecha = '$fecha', cuenta_bancaria = '$cuentaBancaria', saldo_libros = $saldoLibros, saldo_banco = $saldoBanco, estado = '$estado'
              WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Conciliación actualizada correctamente."));
    } else {
        echo json_encode(array("message" => "Error al actualizar la conciliación.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>
