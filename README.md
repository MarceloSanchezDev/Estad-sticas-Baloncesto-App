# 📊 Aplicación de Estadísticas de Baloncesto

Una aplicación web para visualizar y analizar estadísticas de lanzamientos de baloncesto, incluyendo tiros libres, tiros de dos puntos y tiros de tres puntos.

## 🚀 Tecnologías Utilizadas

### **Frontend:**
- React.js
- React Router
- Bootstrap
- Chart.js (react-chartjs-2) para gráficos

### **Backend:**
- Node.js con Express
- MySQL (Turso)
- JWT y Bcrypt para autenticación
- Zod para validación

### **Despliegue:**
- Vercel (Frontend y API)
- Render (posiblemente para el backend)

----

## 🛠 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```sh
 git clone https://github.com/tu-usuario/tu-repo.git
 cd tu-repo
```

### 2️⃣ Instalar dependencias
Ejecuta en la carpeta **raíz** del proyecto:
```sh
npm install
```
Si estás usando workspaces para frontend y backend:
```sh
npm run install:all
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` en la raíz con las siguientes variables:
```
# Base de datos
DATABASE_URL=mysql://usuario:password@host/db_name

# Autenticación
JWT_SECRET=tu_secreto
```

### 4️⃣ Iniciar el proyecto
Ejecuta:
```sh
npm run dev
```
Esto iniciará tanto el **frontend** como el **backend**.

---

## 📊 Uso de la Aplicación
1. **Registro/Login:** Permite a los usuarios autenticarse.
2. **Visualización de Estadísticas:** Muestra gráficos de tiros encestados y fallados.
3. **Filtrado por Fechas:** Permite ver el rendimiento en un rango de tiempo específico.

---

## 🤝 Contribuir
Si quieres contribuir, sigue estos pasos:
1. Haz un fork del repo.
2. Crea una rama nueva (`git checkout -b nueva-feature`).
3. Haz tus cambios y confirma (`git commit -m "Agrega nueva feature"`).
4. Sube tu rama (`git push origin nueva-feature`).
5. Abre un Pull Request 🚀.

---

## 📩 Contacto
Si tienes dudas o sugerencias, contáctame:
📧 Email: marcedgardosanchez@gmail.com

¡Gracias por tu interés en el proyecto! 🎉

