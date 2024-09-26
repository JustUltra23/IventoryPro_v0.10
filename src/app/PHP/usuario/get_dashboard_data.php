<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

require("../conexion.php");

$queryClientes = "SELECT COUNT(*) as total_clientes FROM clientes";
$queryTiendas = "SELECT COUNT(*) as total_tiendas FROM tiendas";
$queryRoles = "SELECT COUNT(*) as total_roles FROM roles";
$queryProveedores = "SELECT COUNT(*) as total_proveedores FROM proveedores";
$queryProductos = "SELECT COUNT(*) as total_productos FROM productos";
$queryUsuarios = "SELECT COUNT(*) as total_usuarios FROM usuarios";

$resultClientes = mysqli_query($conexion, $queryClientes);
$resultTiendas = mysqli_query($conexion, $queryTiendas);
$resultRoles = mysqli_query($conexion, $queryRoles);
$resultProveedores = mysqli_query($conexion, $queryProveedores);
$resultProductos = mysqli_query($conexion, $queryProductos);
$resultUsuarios = mysqli_query($conexion, $queryUsuarios);

if ($resultClientes && $resultTiendas && $resultRoles && $resultProveedores && $resultProductos && $resultUsuarios) {
    $data = array(
        'total_clientes' => mysqli_fetch_assoc($resultClientes)['total_clientes'],
        'total_tiendas' => mysqli_fetch_assoc($resultTiendas)['total_tiendas'],
        'total_roles' => mysqli_fetch_assoc($resultRoles)['total_roles'],
        'total_proveedores' => mysqli_fetch_assoc($resultProveedores)['total_proveedores'],
        'total_productos' => mysqli_fetch_assoc($resultProductos)['total_productos'],
        'total_usuarios' => mysqli_fetch_assoc($resultUsuarios)['total_usuarios']
    );

    echo json_encode($data);
} else {
    $response = new stdClass();
    $response->resultado = 'Error';
    $response->mensaje = 'Error al obtener los datos';
    echo json_encode($response);
}

// Cierra la conexión a la base de datos
mysqli_close($conexion);

?>
