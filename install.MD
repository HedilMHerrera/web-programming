# INSTALACIÓN — web-programming

Guía paso a paso para clonar, instalar y ejecutar localmente el proyecto "web-programming".

## Requisitos previos

- Git
- Node.js (recomendado v14, v16 o superior)
- npm
- Cuenta en Atlas MongoDB

Comprobar versiones:
```bash
git --version
node --version
npm --version 
```

## 1) Clonar el repositorio
Situaute en la carpeta donde deseas clonar el repositorio y abre git Bash
```bash
git clone https://github.com/HedilMHerrera/web-programming.git
```

## 2) Instalar dependencias
Situate en el directorio del proyecto:
```
cd ./web-programming/Backend/
```
ejecuta el siguiente comando para instalar las dependencias
```bash
npm install
```

## 3) Configurar variables de entorno
PARA PROBAR DIRECTAMENTE CON NUESTRA BASE DE DATOS LE COMPARTIMOS EL ARCHIVO .env EN EL SIGUIENTE DOCUMENTO GOOGLE DOCS: https://docs.google.com/document/d/1yD7jShwZoYPURjyREo3Q5KYMHTzqefux0fwBksx77PM/edit?usp=sharing  CON PERMISO DE ACCESO PARA SU CORREO:
v.costas@umss.edu, vladimircostas.j@fcyt.umss.edu.bo

En caso de utilizar su propia base de datos
En el directorio: cd Backend crea el archvio .env
cd Backend:
```bash
touch .env
```

Ejemplo de variables:
```env
PORT=4000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>/<database>?retryWrites=true&w=majority&appName=ClusterX
NODE_ENV=development

# JWT secrets
JWT_ACCESS_SECRET=llave_de_acceso_secreto

# Seeder behavior
SEED_FORCE=false
```
Para obtener su propio MONGO_URI [Configuration MongoDB →](./configuration_mongoDB.md)

Para generar la llave_de_acceso_secreto ejecuta el siguiente comando:
cd Backend:
```bash
openssl rand -base64 48
```
ejemplo de llave generada: GxZtdFhGJQHRRob0S5rJ/iSSwffujFM5ryf/IVD03JPAgSnMPjnYT1P+FSgoXcve

copia esta llave en variables de entorno .env de esta forma:
JWT_ACCESS_SECRET=GxZtdFhGJQHRRob0S5rJ/iSSwffujFM5ryf/IVD03JPAgSnMPjnYT1P+FSgoXcve



## 4) Preparar la base de datos
En caso de utilizar nuestra base de datos que se le compartio en el documento google docs, ya no sera necesario poblar nuevamente la base de datos.

El proyecto tiene datos de prueba definidos, en caso de usar su propia base de datos, ejecuta el siguiente script para poblar su base de datos:
```bash
node populatedb.js
```


## 5) Ejecutar en modo desarrollo
Normalmente hay un script `dev`:
```bash
node src/server.js
npm run dev
```
Observa la consola para ver en qué puerto se levanta la aplicación (ej. http://localhost:4000).

## 6) Construir y ejecutar en producción
Comandos típicos:
```bash
npm start
```
Asegúrate de configurar las variables de entorno de producción antes de iniciar.

## 8) Comprobación
Abre en el navegador:
http://localhost:4000


## 9) Configuracion para https y http2
Situate en la carpeta cert del Backend:
```bash
cd cert
```
crea los siguientes archivos con los nombres:


- server.cert
```bash
touch server.cert
```
- server.key
```bash
touch server.key
```
## 10) Generar Certificado y Llave privada

Vuelve a la carpeta Backend
```bash
 cd ..
```
ejecuta el siguiente comando:

```bash
npm run generate-cert
```
revisa los archivos server.cert y server.key y verifica que realmente se generaron el certificado y la llave
ejemplo:

server.cert:
```
-----BEGIN CERTIFICATE-----
aqui el certificado
-----END CERTIFICATE-----
```
server.key:
```
-----BEGIN PRIVATE KEY-----
aqui la llave
-----END PRIVATE KEY-----
```

## 11) Levantar el servidor https y http2

para levantar el servidor con http
cd Backend
```bash
SSL=false node src/server.js
```
Observa la consola:
Servidor corriendo en http://localhost:4000
Protocolo: HTTP/1.1

para levantar el servidor con https/2
cd Backend
```bash
SSL=true node src/server.js
```
Observa la consola:
Servidor corriendo en https://localhost:4000
Protocolo: HTTP/2 (spdy)


```
(node:XXXX) [DEP0111] DeprecationWarning: Access to process.binding('http_parser') is deprecated.
```
En caso de que salga esta advertencia se debe a dependencias internas que utilizan APIs obsoletas de Node.js.

Sin embargo no afecta el funcionamiento de la aplicación ni la conexión a la base de datos.


## 10) Solución de problemas comunes

- Error al instalar dependencias:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Variables de entorno faltantes: revisa logs y añade variables necesarias en `.env`.
- Error de conexión a BD: verifica credenciales, host, puerto y que el servicio esté en ejecución.
- Permisos en puertos (Linux/macOS): evita puertos <1024 o ejecuta con permisos adecuados.
