document.addEventListener('DOMContentLoaded', () => {
    
    // 1. URL de tu Backend .NET (Basado en tu captura de Sincronia.http)
    const API_URL = "http://localhost:5222/api/planner/organize-day";

    // 2. Elementos del DOM
    const timeSlider = document.getElementById('timeSlider');
    const timeValue = document.getElementById('timeValue');
    const form = document.getElementById('sincroniaForm');
    
    // Paneles de estado
    const stateEmpty = document.getElementById('stateEmpty');
    const stateLoading = document.getElementById('stateLoading');
    const stateResult = document.getElementById('stateResult');

    // 3. Actualizar el texto del slider en tiempo real
    timeSlider.addEventListener('input', (e) => {
        timeValue.textContent = `${e.target.value} min`;
    });

    // 4. Manejar el envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener valores
        const diet = document.getElementById('dietType').value;
        const maxTime = parseInt(document.getElementById('timeSlider').value);
        const tasksRaw = document.getElementById('tasksInput').value;
        const tasks = tasksRaw.split('\n').map(t => t.trim()).filter(t => t !== '');

        if (tasks.length === 0) {
            alert("Por favor, ingresa al menos una tarea.");
            return;
        }

        // Mostrar "Cargando"
        stateEmpty.classList.add('hidden');
        stateResult.classList.add('hidden');
        stateLoading.classList.remove('hidden');

        // Construir cuerpo de la petición (Igual a tu PlannerRequest.cs)
        const requestBody = {
            dietType: diet,
            maxReadyTime: maxTime,
            tasks: tasks
        };

        try {
            // Llamar al Backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) throw new Error("Error en la respuesta del servidor");

            const data = await response.json();

            // Mostrar Resultados
            stateLoading.classList.add('hidden');
            stateResult.classList.remove('hidden');

            // Inyectar la respuesta del backend
            document.getElementById('recipeResult').textContent = data.sugerenciaAlimentacion;
            document.getElementById('aiResult').textContent = data.planMaestro;

            // Dibujar el gráfico (Donut)
            drawChart(maxTime);

        } catch (error) {
            console.error(error);
            alert("No se pudo conectar con el servidor. ¿Está el backend corriendo en el puerto 5222?");
            stateLoading.classList.add('hidden');
            stateEmpty.classList.remove('hidden');
        }
    });

    // 5. Función para dibujar el gráfico con Chart.js
    let myChart = null;
    function drawChart(cookingTime) {
        const ctx = document.getElementById('timeChart').getContext('2d');
        const workTime = 480; // Suponiendo una jornada de 8 hrs (480 min)

        if (myChart) myChart.destroy(); // Borrar gráfico anterior si existe

        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Cocina', 'Enfoque Productivo'],
                datasets: [{
                    data: [cookingTime, workTime - cookingTime],
                    backgroundColor: ['#10B981', '#E5E7EB'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '75%',
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
});