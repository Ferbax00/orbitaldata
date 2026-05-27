# Contracts - ORBITALDATA Landing Page

## API Endpoints

### 1. POST /api/contact-requests
**Propósito**: Crear nueva solicitud de cotización

**Request Body**:
```json
{
  "name": "string (requerido)",
  "email": "string (requerido, formato email)",
  "message": "string (requerido)"
}
```

**Response Success (201)**:
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "message": "string",
  "createdAt": "ISO datetime string"
}
```

**Response Error (400)**:
```json
{
  "detail": "Validation error message"
}
```

### 2. GET /api/contact-requests
**Propósito**: Obtener todas las solicitudes de cotización

**Response Success (200)**:
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "message": "string",
    "createdAt": "ISO datetime string"
  }
]
```

## MongoDB Collection

**Collection Name**: `contact_requests`

**Schema**:
```python
{
  "_id": ObjectId,
  "id": str (UUID),
  "name": str,
  "email": str,
  "message": str,
  "created_at": datetime
}
```

## Frontend Integration

### Datos MOCK a Reemplazar
**Archivo**: `/app/frontend/src/services/mock.js`
- Función `submitContactForm()` - Reemplazar con llamada a POST /api/contact-requests
- Función `getContactSubmissions()` - Reemplazar con llamada a GET /api/contact-requests (si se necesita)

### Cambios en Frontend
1. Crear `/app/frontend/src/services/api.js` con funciones para llamar al backend
2. Actualizar `/app/frontend/src/pages/Home.jsx`:
   - Importar funciones de api.js en lugar de mock.js
   - Mantener la misma lógica de manejo de formulario
3. Agregar nueva sección "Socios Tecnológicos" con:
   - Logos de Hikvision y Syscom Colombia
   - Diseño consistente con el resto de la página

## Backend Implementation Tasks
1. Crear modelo Pydantic para ContactRequest
2. Crear endpoints en server.py
3. Validación de datos con Pydantic
4. Manejo de errores (email inválido, campos faltantes)
5. CORS ya configurado correctamente

## Testing Checklist
- [ ] Backend: POST crea registro en MongoDB
- [ ] Backend: GET retorna todos los registros
- [ ] Frontend: Formulario envía datos al backend
- [ ] Frontend: Toast de éxito/error funciona
- [ ] Frontend: Formulario se limpia después de envío exitoso
- [ ] Sección de socios tecnológicos se muestra correctamente
