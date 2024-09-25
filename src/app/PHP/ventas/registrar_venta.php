<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->cliente->identificacion) && isset($data->productos) && isset($data->tienda_id) && isset($data->fecha)) {
    
    $identificacion = $data->cliente->identificacion;
    $nombre = $data->cliente->nombre;
    $celular = $data->cliente->celular;
    $email = $data->cliente->email;
    $ciudad_id = 107;  // Ciudad predeterminada Bogotá D.C.

    // Verificar si el cliente ya existe
    $query_cliente = "SELECT id_cliente FROM clientes WHERE num_identificacion = '$identificacion'";
    $resultado_cliente = mysqli_query($conexion, $query_cliente);

    if (mysqli_num_rows($resultado_cliente) > 0) {
        // Si el cliente ya existe, obtener el ID
        $fila_cliente = mysqli_fetch_assoc($resultado_cliente);
        $cliente_id = $fila_cliente['id_cliente'];
    } else {
        // Si el cliente no existe, insertar uno nuevo
        $query_insert_cliente = "INSERT INTO clientes (num_identificacion, nombre, celular, email, ciudad_id)
                                 VALUES ('$identificacion', '$nombre', '$celular', '$email', '$ciudad_id')";
        
        if (mysqli_query($conexion, $query_insert_cliente)) {
            $cliente_id = mysqli_insert_id($conexion);  // Obtener el ID del cliente recién creado
        } else {
            echo json_encode(array("message" => "No se pudo insertar el cliente."));
            mysqli_close($conexion);
            exit();
        }
    }

    // Calcular el total de la venta
    $total = 0;
    $iva_rate = 0.19;  // Asumimos un IVA del 19%

    foreach ($data->productos as $producto) {
        $total += $producto->precio * $producto->cantidad;
    }

    $total_iva = $total + ($total * $iva_rate);

    // Insertar la venta en la tabla `ventas`
    $vendedor_id = isset($data->vendedor_id) ? $data->vendedor_id : null;
    $fecha = date('Y-m-d', strtotime($data->fecha));  // Solo la fecha
    $tienda_id = $data->tienda_id;

    $query_venta = "INSERT INTO ventas (ident_cliente, fo_vendedor, tienda_id, fecha, total, total_iva)
                    VALUES ('$cliente_id', '$vendedor_id', '$tienda_id', '$fecha', '$total', '$total_iva')";
    
    if (mysqli_query($conexion, $query_venta)) {
        $venta_id = mysqli_insert_id($conexion);  // Obtener el ID de la venta recién creada

        // Insertar los productos en la tabla `detalles_ventas`
        foreach ($data->productos as $producto) {
            $producto_id = $producto->producto_id; // Debe coincidir con la propiedad del objeto en el frontend
            $cantidad = $producto->cantidad;
        
            if (!isset($producto_id)) {
                echo json_encode(array("message" => "Producto sin ID."));
                mysqli_close($conexion);
                exit();
            }
        
            $query_detalle = "INSERT INTO detalles_ventas (venta_id, producto_id, cantidad)
                              VALUES ('$venta_id', '$producto_id', '$cantidad')";
            if (!mysqli_query($conexion, $query_detalle)) {
                echo json_encode(array("message" => "Error al registrar los detalles de la venta."));
                mysqli_close($conexion);
                exit();
            }
        }

        // Si todo fue exitoso
        echo json_encode(array("message" => "Venta registrada correctamente."));
    } else {
        echo json_encode(array("message" => "No se pudo registrar la venta."));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>





