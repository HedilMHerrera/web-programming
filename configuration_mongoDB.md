# 🛠️ Guía de Configuración de MongoDB Atlas para el Proyecto

Esta guía explica paso a paso cómo **crear y configurar** una base de datos en **MongoDB Atlas**, incluyendo la creación de una cuenta, cluster, usuario de base de datos y el acceso a la red.

---

## Paso 1: Crear Cuenta y Cluster en MongoDB Atlas


1. Accede a:  
   👉 [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Regístrate usando **Google** o **GitHub**.
3. Crea un **cluster gratuito (M0 Sandbox)** para pruebas.
4. Configura las opciones del cluster:
   - **Proveedor:** AWS  
   - **Región:** Elige la más cercana a Bolivia (por ejemplo, **São Paulo**)
   - **Nombre del cluster:** `Cluster0`

---

## Paso 2: Configurar Acceso a la Red


1. En el panel de **MongoDB Atlas**, ve a **Database & Network Access**.
2. En la sección **IP Access List**, haz click en **Add IP Address**.
3. Selecciona **Allow Access from Anywhere (0.0.0.0/0)**  
   ⚠️ *Solo recomendado para desarrollo. En producción usa una IP específica para mayor seguridad.*
4. Haz click en **Confirm**.

---

## Paso 3: Crear un Usuario para la Base de Datos


1. En el panel de **MongoDB Atlas**, selecciona **Database Access**.
2. Ve a **Database Users** y haz click en **Add New Database User**.
3. Elige el tipo de autenticación:
   - **Password** (sin SCRAM)
4. Completa los campos:
   - **Usuario:** `miusuario`
   - **Contraseña:** `contraseña_segura`  
     ⚠️ **¡GUARDAR ESTA CONTRASEÑA!** La necesitarás más tarde en el archivo `.env`.
5. En **Database User Privileges**, selecciona el rol:
   - **Atlas admin**
6. Haz click en **Add User** para crear el usuario.

---

## Paso 4: Crear la Base de Datos


1. Dirígete a **Clusters**.
2. Haz click en **Browse Collections**.
3. Selecciona **Create Database**.
4. Ingresa el nombre de la base de datos, por ejemplo: `progra_web`.
5. Añade una colección (puede ser **collection1**).
6. Haz click en **Create Database**.
7. Guarda el nombre de la base de datos para usarlo en el archivo `.env`.

---

## Paso 5: Obtener el String de Conexión


1. En el panel de **MongoDB Atlas**, ve a **Database**.
2. Haz click en **Connect** para tu cluster.
3. Selecciona **Connect your application**.
4. Elige **Driver:** Node.js y **Versión:** 4.1 o superior.
5. Copia el string de conexión que aparece:

```text
mongodb+srv://miusuario:<password>@cluster0.xxxxx.mongodb.net/<nombre_base_de_datos>?retryWrites=true&w=majority
```
7. Reemplazar <password> con tu password del PASO 3
8. Reemplazar el nombre de la base de datos
9. En ambos quitar los simbolos <>

   EJEMPLO FINAL:
   mongodb+srv://miuusario:Q8LccDDllMMVIS0g@cluster0.v48usxa.mongodb.net/progra_web?retryWrites=true&w=majority

Asegurate de reemplazar los campos indicados.
