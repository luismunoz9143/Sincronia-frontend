#  Sincronía - Frontend UI

## 1. Descripción general del proyecto
Sincronía es una plataforma inteligente diseñada para optimizar la gestión del tiempo mediante la sincronización de la planificación alimenticia y las tareas diarias del usuario. 

Dentro de la arquitectura general del sistema, este repositorio contiene la capa de presentación (Frontend). Su rol principal es capturar las preferencias y restricciones del usuario, enviar estos parámetros al núcleo lógico (Backend) y renderizar dinámicamente los planes de alimentación estructurados generados por Inteligencia Artificial. La aplicación está diseñada bajo el concepto de una Single Page Application (SPA) parcial, permitiendo transiciones de estado fluidas sin necesidad de recargar la página completa.

------------------------------------------------------------------------

## 2. Arquitectura del frontend
El proyecto se ha construido evitando el acoplamiento excesivo, aplicando el principio de Separación de Responsabilidades (Separation of Concerns).

* **Estructura de carpetas:**
  * `/css`: Contiene las hojas de estilo modulares que definen la presentación visual.
  * `/js`: Aloja los scripts de lógica de negocio del cliente, controladores del DOM y llamadas de red.
  * `index.html`: Punto de entrada principal de la aplicación.

* **Patrón utilizado:** Se implementa un patrón modular basado en componentes lógicos en JavaScript Vanilla, separando las funciones de manipulación del DOM de las funciones encargadas de las peticiones HTTP.
* **Flujo general de navegación:** La navegación se gestiona dinámicamente manipulando la visibilidad de los contenedores en el DOM (DOM scripting). El usuario avanza por las distintas etapas del proceso (formulario, estado de carga, visualización de resultados) dentro del mismo documento HTML.

------------------------------------------------------------------------

## 3. Tecnologías utilizadas
El desarrollo se realizó utilizando tecnologías nativas de la web para garantizar un rendimiento óptimo y máxima compatibilidad:
* **HTML5:** Implementación de maquetado semántico (`<header>`, `<main>`, `<section>`, `<article>`) para favorecer la accesibilidad y correcta indexación.
* **CSS3:** Diseño responsivo construido con metodologías modernas de maquetación visual (Flexbox y CSS Grid). El diseño se rige por el principio "Mobile First".
* **JavaScript (ES6+):** Uso de características modernas del lenguaje, incluyendo `async/await` para el manejo de asincronía, desestructuración de objetos, literales de plantilla y la API nativa `Fetch` para el consumo de servicios web.

------------------------------------------------------------------------

## 4. Configuración y ejecución

### Requisitos previos
* Navegador web moderno (Chrome, Edge, Firefox, Safari).
* El repositorio del **Backend de Sincronía** descargado y en ejecución local.

### Conexión con el Backend
Para que el cliente funcione correctamente, el servidor Backend (desarrollado en .NET 8) debe estar activo. Por defecto, en entornos de desarrollo local, el backend se ejecuta en el puerto **5222** o **5000/5001**. 
* **URL Base de la API:** `http://localhost:5222/api` (Verificar el puerto exacto en la terminal al ejecutar el backend).

### Ejecución del proyecto
1. Clonar el repositorio en la máquina local.
2. Abrir el proyecto en el editor de código (ej. Visual Studio Code).
3. Verificar la configuración de red en el archivo principal de JavaScript (ej. `js/script.js`), asegurando que la constante `BASE_URL` apunte al puerto correcto del backend local:
   ```javascript
   const BASE_URL = 'http://localhost:5222/api';
Iniciar el proyecto abriendo directamente el archivo index.html en el navegador, o utilizando una extensión de servidor local como Live Server para habilitar la recarga en caliente (Hot Reload).

Ejemplo de consumo
El frontend se comunica de manera primaria con el endpoint de generación. Ejemplo de ruta consumida:
POST http://localhost:5222/api/planificador/generar

------------------------------------------------------------------------

 ## 5. Comunicación con el Backend
La integración con el servidor se realiza exclusivamente a través del protocolo HTTP.

Flujo Request/Response: El cliente recopila los datos del formulario, los serializa y los transmite al API Gateway. Mientras espera la respuesta de la red, la interfaz muestra indicadores de carga.

Métodos HTTP: Se emplea principalmente el verbo POST para el envío de parámetros complejos de generación y GET para la consulta de información estática si fuese necesario.

Formato de datos: Todo el intercambio de información se realiza utilizando la notación application/json.

Manejo de errores: Las peticiones de red están envueltas en bloques try...catch. Si el servidor retorna un código de estado fuera del rango de éxito (ej. 400 Bad Request o 500 Internal Server Error), el frontend intercepta el fallo y renderiza mensajes de error amigables para el usuario, evitando bloqueos silenciosos.

------------------------------------------------------------------------

## 6. Variables importantes del proyecto
BASE_URL: Constante definida en la capa de red del JavaScript. Debe coincidir estrictamente con la URL de exposición del entorno de desarrollo o producción del Backend para evitar errores de conexión (CORS o net::ERR_CONNECTION_REFUSED).

------------------------------------------------------------------------

## 7. Buenas prácticas implementadas
Código Limpio (Clean Code): Nomenclatura descriptiva en variables y funciones (en inglés o español estandarizado).

Modularidad sin dependencias: El uso de JavaScript Vanilla elimina la necesidad de descargar módulos de Node (node_modules), garantizando un despliegue ultra rápido y una auditoría de seguridad simplificada.

Separación de capas: Ausencia de estilos en línea o scripts embebidos en el documento HTML.

Escalabilidad: Estructura de carpetas y código preparada para crecer de manera ordenada o ser migrada a un framework reactivo en etapas posteriores.

------------------------------------------------------------------------

## 8. Posibles mejoras futuras
En el marco de escalar el proyecto para fases posteriores de inversión o producción masiva, se proponen las siguientes mejoras:

Migración a Framework Reactivo: Refactorizar la interfaz utilizando bibliotecas como React, Vue.js o Angular para un manejo de estados más robusto y renderizado virtual del DOM.

Gestor de Estados Globales: Implementación de herramientas como Redux o Context API para manejar sesiones de usuario y persistencia de datos complejos.

Testing E2E: Incorporación de pruebas de extremo a extremo (End-to-End) utilizando herramientas como Cypress o Playwright.

Progressive Web App (PWA): Configuración de Service Workers y un manifest.json para permitir la instalación de la aplicación y la navegación offline parcial.

------------------------------------------------------------------------

## 9. Trabajo Colaborativo y Gestión del Proyecto

El desarrollo de Sincronía fue realizado bajo un enfoque colaborativo por un equipo de tres integrantes, aplicando principios de organización ágil y gestión visual del flujo de trabajo.

### Equipo de Desarrollo
- Steven Maldonado
- Maria Perez
- Luis Muñoz

### Metodología de Trabajo
Se utilizó Trello como herramienta de gestión de tareas para:

- Planificación de sprint académico
- Asignación de responsabilidades
- Seguimiento de avances
- Control de entregables
- Priorización de funcionalidades (MVP → mejoras)

### Tablero Oficial del Proyecto
https://trello.com/b/4Mw4xVMq/sincronia-ia

El tablero documenta:
- Backlog inicial
- División Frontend / Backend
- Integración con IA
- Fases de pruebas
- Preparación de entrega final

Este enfoque permitió mantener trazabilidad, transparencia en responsabilidades y control del alcance del proyecto.

------------------------------------------------------------------------

## 10. Autores 
* `Steven Maldonado`
* `Maria Perez`
* `Luis Muñoz`

------------------------------------------------------------------------

## 11. Licencia

Proyecto académico con fines educativos.
