<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['fecha'], $data['cuenta_bancaria'], $data['saldo_libros'], $data['saldo_banco'], $data['estado'], $data['usuario_id'])) {

    $fecha = $data['fecha'];
    $cuentaBancaria = $data['cuenta_bancaria'];
    $saldoLibros = $data['saldo_libros'];
    $saldoBanco = $data['saldo_banco'];
    $estado = $data['estado'];
    $usuarioId = $data['usuario_id'];

    // Calcular la diferencia entre saldo_banco y saldo_libros
    $diferencia = $saldoBanco - $saldoLibros;

    // Insertar la nueva conciliación en la base de datos
    $query = "INSERT INTO conciliaciones_bancarias (fecha, cuenta_bancaria, saldo_libros, saldo_banco, diferencia, estado, usuario_id) 
              VALUES ('$fecha', '$cuentaBancaria', $saldoLibros, $saldoBanco, $diferencia, '$estado', $usuarioId)";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Conciliación insertada correctamente."));
    } else {
        echo json_encode(array("message" => "Error al insertar la conciliación.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>

