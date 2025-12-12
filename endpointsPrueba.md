# GUÍA DE PRUEBAS - API REST

## NOTAS

1. *Tokens JWT*: Después de hacer login con admin, guarda el token para hacer pruebas que requieran el accessToken de admin. Ademas el token expira en 1h
2. *Reemplazar IDs*: En los endpoints que aparece id, reemplaza con el ID de la lista correspondiente.
3. *Admin*: Solo el Admin puede:
   - Registrar, Actualizar y Eliminar usuarios
   - Ver Lista de usaurios
4. *endpoints publicos*: /quest
   - ageRanges
   - categories
   - subcategories
   - difficulties

## DATOS DE LOS USUARIOS DE PRUEBA

```
Admin:      admin@example.com       / admin123

Editor:     editor@example.com      / editor123

Gestor:     gestor@example.com      / gestor123

Estudiante: estudiante@example.com  / estudiante123
```

---

## ENDPOINTS

##  AUTENTICACIÓN

### 1. Login - admin
*POST* http://localhost:4000/auth/login

```json
{
    "email": "admin@example.com",
    "password": "admin123"
}
```

ejemplo de respuesta:
```json
{
    "success": true,
    "data": {
        "user": {
            "_id": "693bad9a6bfca37d7d8fa9a3",
            "name": "Admin",
            "email": "admin@example.com",
            "roles": [
                "admin"
            ],
            "createdAt": "2025-12-12T05:52:26.614Z",
            "updatedAt": "2025-12-12T05:52:26.614Z",
            "__v": 0
        },
        "tokens": {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2JhZDlhNmJmY2EzN2Q3ZDhmYTlhMyIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTc2NTU2NDc1NSwiZXhwIjoxNzY1NTY4MzU1fQ.IaAtU0Nukoj-UyfB0QR4m7E7N9WPzbl4pd3e6L9XF_g"
        }
    }
}
```


### 2. Login - Editor
*POST* http://localhost:4000/auth/login
```json
{
    "email": "editor@example.com",
    "password": "editor123"
}
```


### 3. Login - Gestor
*POST* http://localhost:4000/auth/login
```json
{
    "email": "gestor@example.com",
    "password": "gestor123"
}
```


### 4. Login - Estudiante
*POST* http://localhost:4000/auth/login
```json
{
    "email": "estudiante@example.com",
    "password": "estudiante123"
}
```


### 5. Obtener Mi Perfil
*GET* http://localhost:4000/auth/me
*Authorization:* Type Auth: Bearer {accessToken}


### 6. Registrar Usuario - Solo admin
*POST* http://localhost:4000/auth/register
*Authorization:* Type Auth: Bearer {accessToken de admin}
```json
{
    "name": "Nuevo Usuario",
    "email": "nuevo3@example.com",
    "password": "password3123",
    "roles": ["gestor", "editor"]
}
```
### 7. Cerrar Sesion
*POST* http://localhost:4000/auth/logout
*Authorization:* Type Auth: Bearer {accessToken}
```json
{
    "name": "Nuevo Usuario",
    "email": "nuevo3@example.com",
    "password": "password3123",
    "roles": ["gestor", "editor"]
}
```


##  USUARIOS (Solo admin)

### 1. LISTAR USUARIOS
*GET* http://localhost:4000/users
*Authorization:* Type Auth: Bearer {accessToken del Admin}

### 2. ACTUALIZAR USUARIOS por ID(copiar ID de algun usuario de la lista anterior)
*PUT* http://localhost:4000/users/id
*Authorization:* Type Auth: Bearer {accessToken del Admin}
```json
{
    "name": "Nuevo Usuario (actualizado)"
}
```

### 3. ELIMINAR USUARIOS por ID(copiar ID de algun usuario de la lista de usuarios)
*POST* http://localhost:4000/users/id
*Authorization:* Type Auth: Bearer {accessToken del Admin}
```json
{
    "name": "Nuevo Usuario (actualizado)"
}
```

## ENDPOINTS PUBLICOS

## RANGOS DE EDAD

### 1. Listar Rangos de Edad
*GET* http://localhost:4000/quest/ageranges

### 2. Obtener Rango por ID
*GET* http://localhost:4000/quest/ageranges/id

### 3. Crear Rango de Edad
*POST* http://localhost:4000/quest/ageranges
```json
{
    "minAge": 51,
    "maxAge": 60,
    "description": "Adultos, contenidos avanzados."
}
```

### 4. Actualizar Rango de Edad (copiar id de la lista ageranges)
*PUT* http://localhost:4000/quest/ageranges/id
```json
{
    "minAge": 41,
    "maxAge": 42,
    "description": "Adultos mayores, enfoque práctico y claro (actualizado)."
}
```

### 5. Eliminar Rango de Edad (copiar id de la lista ageranges)
*DELETE* http://localhost:4000/quest/ageranges/id

---

## CATEGORÍAS

### 1. Listar Categorías
*GET* http://localhost:4000/quest/categories

### 2. Obtener Categoría por ID
*GET* http://localhost:4000/quest/categories/id

### 3. Crear Categoría
*POST* http://localhost:4000/quest/categories
```json
{
    "name": "Ciencias Graficas nuevo",
    "description": "Comprende biología, física, química, astronomía, ecología y el estudio de fenómenos naturales mediante el método científico."
}
```

### 4. Actualizar Categoría
*PUT* http://localhost:4000/quest/categories/id
```json
{
    "name": "Ciencias Graficas",
    "description": "Comprende biología (actualizado)."
}
```

### 5. Eliminar Categoría
*DELETE* http://localhost:4000/quest/categories/id

---

## SUBCATEGORÍAS

### 1. Listar Subcategorías
*GET* http://localhost:4000/quest/subcategories

### 2. Obtener Subcategoria por ID
*GET* http://localhost:4000/quest/subcategories/id

### 3. Crear Subcategoría ("categoryId" obtener de la lista de categorias)
*POST* http://localhost:4000/quest/subcategories
```json
{
    "name": "Problemas Logicos",
    "description": "Resoluciooon Logica",
    "categoryId": "693bad9a6bfca37d7d8fa990"
}
```

### 4. Actualizar Subcategoría
*PUT* http://localhost:4000/quest/subcategories/id
```json
{
    "name": "Acertijos y Problemas Logicos",
    "description": "Resoluciooooon de problemas (actualizado)"
}
```

### 5. Eliminar Subcategoría
*DELETE* http://localhost:4000/quest/subcategories/id

---

##  NIVELES DE DIFICULTAD

### 1. Listar Niveles de Dificultad
*GET* http://localhost:4000/quest/difficulties

### 2. Obtener Nivel por ID (copiar id de la lista de niveles de dificultad)
*GET* http://localhost:4000/quest/difficulties/id

### 3. Crear Nivel de Dificultad
*POST* http://localhost:4000/quest/difficulties
```json
{
    "level": "Dificil y medio experto",
    "description": "Requiere razonamiento avanzado y experiencia."
}
```

### 4. Actualizar Nivel de Dificultad
*PUT* http://localhost:4000/quest/difficulties/id
```json
{
    "level": "Dificil",
    "description": "Requiere razonamiento avanzado y experiencia. (actualizado)"
}
```

### 5. Eliminar Nivel de Dificultad
*DELETE* http://localhost:4000/quest/difficulties/id

---