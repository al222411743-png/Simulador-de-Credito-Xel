document.getElementById('btn-calcular').addEventListener('click', procesarSimulacion);

function procesarSimulacion() {
  const nombre = document.getElementById('nombre').value;
  const edad = parseInt(document.getElementById('edad').value);
  const ingreso = parseFloat(document.getElementById('ingreso').value);
  const montoInput = parseFloat(document.getElementById('monto').value);
  const tasaAnualInput = parseFloat(document.getElementById('tasa').value) / 100;
  const plazoMeses = parseInt(document.getElementById('plazo').value);
  const IVA_VALOR = 0.16;

  if (!nombre || isNaN(edad) || isNaN(ingreso) || isNaN(montoInput)) {
    alert("Por favor, completa todos los campos correctamente.");
    return;
  }

  const amortizacionCapital = montoInput / plazoMeses;
  const tasaMensualEquivalente = tasaAnualInput / 12;
  let saldoInsoluto = montoInput;
  let acumuladoPagos = 0;

  for (let periodo = 1; periodo <= plazoMeses; periodo++) {
    const interesDelPeriodo = saldoInsoluto * tasaMensualEquivalente;
    const ivaSobreInteres = interesDelPeriodo * IVA_VALOR;
    const pagoMensualTotal = amortizacionCapital + interesDelPeriodo + ivaSobreInteres;
    acumuladoPagos += pagoMensualTotal;
    saldoInsoluto -= amortizacionCapital;
  }

  // Evaluar condiciones de aprobación
  const pagoMensualPromedio = acumuladoPagos / plazoMeses;
  const porcentajeIngreso = (pagoMensualPromedio / ingreso) * 100;
  let califica;

  if (edad < 18 || edad > 65) {
    califica = "❌ No califica (edad fuera de rango)";
  } else if (porcentajeIngreso > 40) {
    califica = "❌ No califica (pago mensual supera 40% del ingreso)";
  } else {
    califica = "✅ Sí califica";
  }

  mostrarResultado(acumuladoPagos.toFixed(2), pagoMensualPromedio.toFixed(2), califica);
  agregarHistorial(nombre, montoInput, plazoMeses, acumuladoPagos.toFixed(2), califica);
  guardarHistorialLocal(nombre, montoInput, plazoMeses, acumuladoPagos.toFixed(2), califica);
}

function mostrarResultado(total, mensual, califica) {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    Total a pagar durante el crédito: <strong>$${total}</strong><br>
    Pago mensual promedio: <strong>$${mensual}</strong><br>
    Estado del crédito: <strong>${califica}</strong>
  `;
}

function agregarHistorial(nombre, monto, plazo, total, califica) {
  const tabla = document.querySelector('#historial tbody');
  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${nombre}</td><td>$${monto}</td><td>${plazo} meses</td><td>$${total}</td><td>${califica}</td>`;
  tabla.appendChild(fila);
}

function guardarHistorialLocal(nombre, monto, plazo, total, califica) {
  const simulaciones = JSON.parse(localStorage.getItem('historialSimulaciones')) || [];
  simulaciones.push({ nombre, monto, plazo, total, califica });
  localStorage.setItem('historialSimulaciones', JSON.stringify(simulaciones));
}

function cargarHistorialLocal() {
  const simulaciones = JSON.parse(localStorage.getItem('historialSimulaciones')) || [];
  simulaciones.forEach(sim => agregarHistorial(sim.nombre, sim.monto, sim.plazo, sim.total, sim.califica));
}

window.onload = cargarHistorialLocal;
