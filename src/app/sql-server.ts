import { dataSQLServer } from './constants';

const sql = require('mssql')
let Request = require('tedious').Request
let TYPES = require('tedious').TYPES
let Connection = require('tedious').Connection

let connection = new Connection(dataSQLServer)

async function executeSQL(sql, onExecute = false){
	return await connection.on('connect', function(){
		executeStatement(sql, onExecute)
	})
}

function executeStatement(sql, onExecute){
	let result = ''
	let request = new Request(sql)
	return onExecute ? connection.execSql(request) : request
}

export default executeSQL
/*
function insertData(table, args, value){
	return executeSQL(`insert into ${table}(${args}) values(${value})`)
}

function getData(table, args){
	return executeSQL(`select * from ${table} where ${args}`).then(result => result)
}

function updateData(table, conditions, args){
	return executeSQL(`update ${table} set ${conditions} where ${args}`)
}
*/
