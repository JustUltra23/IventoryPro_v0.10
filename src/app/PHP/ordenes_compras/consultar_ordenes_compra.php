<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query = "
    SELECT oc.*, p.nombre AS producto_nombre, pr.nombre AS proveedor_nombre
    FROM ordenes_compra oc
    JOIN productos p ON oc.articulo = p.codigo_ean
    JOIN proveedores pr ON p.proveedor_id = pr.id
";

$result = mysqli_query($conexion, $query);

$ordenes_compra = [];

while ($row = mysqli_fetch_assoc($result)) {
    $ordenes_compra[] = $row;
}

echo json_encode($ordenes_compra);

mysqli_close($conexion);
?>


