---
title: Resumen de Mongodb
description: "Resumen completo de MongoDB: comandos CRUD, índices, agregaciones, operadores y administración de base de datos"
date: 2024-05-02
mod: 2025-10-25
published: true
tags: [database, mongodb, nosql]
---

# Resumen de Mongodb

## Conectar MongoDB Shell

```shell
mongo # nos conectamos to mongodb://127.0.0.1:27017 por defecto
mongo --host <host> --port <port> -u <user> -p <pwd> # omitir la contraseña si se desea un aviso
mongo "mongodb://192.168.1.1:27017"
mongo "mongodb+srv://cluster-name.abcde.mongodb.net/<dbname>" --username <username> # MongoDB Atlas
```

## Helpers

### Mostrar bases de datos

```shell
show dbs
db // imprime la actual base de datos
```

### Cambiar de base de datos

```shell
use <database_name>
```

### Mostrar colecciones

```shell
show collections
```

### Ejectuar un archivo `.js`

```shell
load("myScript.js")
```

## CRUD

### Crear

```shell
db.coll.insertOne({name: "Max"})
db.coll.insert([{name: "Max"}, {name:"Alex"}])
db.coll.insert([{name: "Max"}, {name:"Alex"}], {ordered: false})
db.coll.insert({date: ISODate()})
db.coll.insert({name: "Max"}, {"writeConcern": {"w": "majority", "wtimeout": 5000}})
```

### Leer

```shell
db.coll.findOne() // devuelve un único documento
db.coll.find()    // devuelve un cursor - muestra 20 resultados - "it" para mostrar más
db.coll.find().pretty()
db.coll.find({name: "Max", age: 32}) // operador 'AND' implícito.
db.coll.find({date: ISODate("2020-09-25T13:57:17.180Z")})
db.coll.find({name: "Max", age: 32}).explain("executionStats") // o "queryPlanner" o "allPlansExecution"
db.coll.distinct("name")

# Contar
db.coll.count({age: 32}) // estimación basada en los metadatos de la colección
db.coll.estimatedDocumentCount() // estimación basada en los metadatos de la colección
db.coll.countDocuments({age: 32}) // alias para un proceso de agregación - recuento preciso

# Comparar
db.coll.find({"year": {$gt: 1970}})
db.coll.find({"year": {$gte: 1970}})
db.coll.find({"year": {$lt: 1970}})
db.coll.find({"year": {$lte: 1970}})
db.coll.find({"year": {$ne: 1970}})
db.coll.find({"year": {$in: [1958, 1959]}})
db.coll.find({"year": {$nin: [1958, 1959]}})

# Operador lógico
db.coll.find({name:{$not: {$eq: "Max"}}})
db.coll.find({$or: [{"year" : 1958}, {"year" : 1959}]})
db.coll.find({$nor: [{price: 1.99}, {sale: true}]})
db.coll.find({
  $and: [
    {$or: [{qty: {$lt :10}}, {qty :{$gt: 50}}]},
    {$or: [{sale: true}, {price: {$lt: 5 }}]}
  ]
})

# Elemento
db.coll.find({name: {$exists: true}})
db.coll.find({"zipCode": {$type: 2 }})
db.coll.find({"zipCode": {$type: "string"}})

# Agregación Pipeline
db.coll.aggregate([
  {$match: {status: "A"}},
  {$group: {_id: "$cust_id", total: {$sum: "$amount"}}},
  {$sort: {total: -1}}
])

# Búsqueda de texto con un índice "text"
db.coll.find({$text: {$search: "cake"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})

# Regex
db.coll.find({name: /^Max/})   // regex: starts by letter "M"
db.coll.find({name: /^Max$/i}) // regex case insensitive

# Array
db.coll.find({tags: {$all: ["Realm", "Charts"]}})
db.coll.find({field: {$size: 2}}) // imposible de indexar - mejor almacenar el tamaño del array y actualizarlo
db.coll.find({results: {$elemMatch: {product: "xyz", score: {$gte: 8}}}})

# Projections
db.coll.find({"x": 1}, {"actors": 1})               // actors + _id
db.coll.find({"x": 1}, {"actors": 1, "_id": 0})     // actors
db.coll.find({"x": 1}, {"actors": 0, "description": 0}) // all but "actors" and "description"

# Sort, skip, limit
db.coll.find({}).sort({"year": 1, "rating": -1}).skip(10).limit(3)

# Read Concern
db.coll.find().readConcern("majority")
```

### Actualizar

```shell
db.coll.update({"_id": 1}, {"year": 2016}) // ADVERTENCIA Sustituye a todo el documento
db.coll.update({"_id": 1}, {$set: {"year": 2016, name: "Max"}})
db.coll.update({"_id": 1}, {$unset: {"year": 1}})
db.coll.update({"_id": 1}, {$rename: {"year": "date"} })
db.coll.update({"_id": 1}, {$inc: {"year": 5}})
db.coll.update({"_id": 1}, {$mul: {price: NumberDecimal("1.25"), qty: 2}})
db.coll.update({"_id": 1}, {$min: {"imdb": 5}})
db.coll.update({"_id": 1}, {$max: {"imdb": 8}})
db.coll.update({"_id": 1}, {$currentDate: {"lastModified": true}})
db.coll.update({"_id": 1}, {$currentDate: {"lastModified": {$type: "timestamp"}}})

# Array
db.coll.update({"_id": 1}, {$push :{"array": 1}})
db.coll.update({"_id": 1}, {$pull :{"array": 1}})
db.coll.update({"_id": 1}, {$addToSet :{"array": 2}})
db.coll.update({"_id": 1}, {$pop: {"array": 1}})  // last element
db.coll.update({"_id": 1}, {$pop: {"array": -1}}) // first element
db.coll.update({"_id": 1}, {$pullAll: {"array" :[3, 4, 5]}})
db.coll.update({"_id": 1}, {$push: {scores: {$each: [90, 92, 85]}}})
db.coll.updateOne({"_id": 1, "grades": 80}, {$set: {"grades.$": 82}})
db.coll.updateMany({}, {$inc: {"grades.$[]": 10}})
db.coll.update({}, {$set: {"grades.$[element]": 100}}, {multi: true, arrayFilters: [{"element": {$gte: 100}}]})

# Actualizar muchos
db.coll.update({"year": 1999}, {$set: {"decade": "90's"}}, {"multi":true})
db.coll.updateMany({"year": 1999}, {$set: {"decade": "90's"}})

# Encontrar uno y actualizarlo
db.coll.findOneAndUpdate({"name": "Max"}, {$inc: {"points": 5}}, {returnNewDocument: true})

# Actualizar
db.coll.update({"_id": 1}, {$set: {item: "apple"}, $setOnInsert: {defaultQty: 100}}, {upsert: true})

# Reemplazar
db.coll.replaceOne({"name": "Max"}, {"firstname": "Maxime", "surname": "Beugnet"})

# Guardar
db.coll.save({"item": "book", "qty": 40})

# Write concern
db.coll.update({}, {$set: {"x": 1}}, {"writeConcern": {"w": "majority", "wtimeout": 5000}})
```

### Eliminar

```bash
db.coll.remove({name: "Max"})
db.coll.remove({name: "Max"}, {justOne: true})
db.coll.remove({}) // ADVERTENCIA Elimina todos los documentos, pero no la propia colección y sus definiciones de índice
db.coll.remove({name: "Max"}, {"writeConcern": {"w": "majority", "wtimeout": 5000}})
db.coll.findOneAndDelete({"name": "Max"})
```

## Bases de datos y colecciones

### Eliminar colección y base de datos

```shell
db.coll.drop()    # elimina la colección y sus definiciones de índice
db.dropDatabase() # comprueba que no estás en el clúster de PROD... 😄
```

### Crear colección

```shell
# Crear colección con un $jsonschema
db.createCollection("contacts", {
   validator: {$jsonSchema: {
      bsonType: "object",
      required: ["phone"],
      properties: {
         phone: {
            bsonType: "string",
            description: "must be a string and is required"
         },
         email: {
            bsonType: "string",
            pattern: "@mongodb\.com$",
            description: "must be a string and match the regular expression pattern"
         },
         status: {
            enum: [ "Unknown", "Incomplete" ],
            description: "can only be one of the enum values"
         }
      }
   }}
})
```

### Otras funciones para colecciones

```shell
db.coll.stats()
db.coll.storageSize()
db.coll.totalIndexSize()
db.coll.totalSize()
db.coll.validate({full: true})
db.coll.renameCollection("new_coll", true) // Segundo parámetro para eliminar la colección de destino si existe
```

## Índices

### Listar índices

```shell
db.coll.getIndexes()
db.coll.getIndexKeys()
```

### Crear índices

```shell
# Index Types
db.coll.createIndex({"name": 1})                // índice de campo único
db.coll.createIndex({"name": 1, "date": 1})     // índice compuesto
db.coll.createIndex({foo: "text", bar: "text"}) // índice de texto
db.coll.createIndex({"$**": "text"})            // índice de texto comodín
db.coll.createIndex({"userMetadata.$**": 1})    // índice comodín
db.coll.createIndex({"loc": "2d"})              // índice 2d
db.coll.createIndex({"loc": "2dsphere"})        // índice 2d
db.coll.createIndex({"_id": "hashed"})          // índice hash

# Index Options
db.coll.createIndex({"lastModifiedDate": 1}, {expireAfterSeconds: 3600})      // TTL index
db.coll.createIndex({"name": 1}, {unique: true})
db.coll.createIndex({"name": 1}, {partialFilterExpression: {age: {$gt: 18}}}) // partial index
db.coll.createIndex({"name": 1}, {collation: {locale: 'en', strength: 1}})    // case insensitive index with strength = 1 or 2
db.coll.createIndex({"name": 1 }, {sparse: true})
```

### Eliminar índices

```shell
db.coll.dropIndex("name_1")
```

### Ocultar/mostrar Índices

```shell
db.coll.hideIndex("name_1")
db.coll.unhideIndex("name_1")
```

## Commandos prácticos

```shell
use admin
db.createUser({"user": "root", "pwd": passwordPrompt(), "roles": ["root"]})
db.dropUser("root")
db.auth( "user", passwordPrompt() )

use test
db.getSiblingDB("dbname")
db.currentOp()
db.killOp(123) // opid

db.fsyncLock()
db.fsyncUnlock()

db.getCollectionNames()
db.getCollectionInfos()
db.printCollectionStats()
db.stats()

db.getReplicationInfo()
db.printReplicationInfo()
db.isMaster()
db.hostInfo()
db.printShardingStatus()
db.shutdownServer()
db.serverStatus()

db.setSlaveOk()
db.getSlaveOk()

db.getProfilingLevel()
db.getProfilingStatus()
db.setProfilingLevel(1, 200) // 0 == OFF, 1 == ON with slowms, 2 == ON

db.enableFreeMonitoring()
db.disableFreeMonitoring()
db.getFreeMonitoringStatus()

db.createView("viewName", "sourceColl", [{$project:{department: 1}}])
```
