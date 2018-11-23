import { Component } from '@angular/core';
import executeSQL from './sql-server';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	cliente:any = {};
	title = 'ChallengeMadecentro';
	onSubmit(){
		const clienteData = this.cliente
		executeSQL(`insert into clientes(
			numero_cedula,
			nombre,
			apellido,
			direccion_residencia,
			numero_telefonico,
			numero_celular,
			email,
			puntos
		) values(
			'${clienteData.numero_cedula}'
			'${clienteData.nombre}',
			'${clienteData.apellido}',
			'${clienteData.direccion_residencia}',
			'${clienteData.numero_telefono}',
			'${clienteData.numero_celular}',
			'${clienteData.email}',
			0
		)`)
		executeSQL(`select count(cliente_cedula) from tmp_ventas_cliente where cliente_cedula = '${clienteData.numero_cedula}'`, false).on('row', function(columns){
			if(Object.keys(columns).length > 0){
				executeSQL(`update clientes set puntos = ${Object.keys(columns).length * 1000} where numero_cedula = ${clienteData.numero_cedula}`)
			}
		})
		alert('Cliente guardado con éxito!')
		this.cliente = {}
	}
}
