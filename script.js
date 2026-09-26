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

  agregarHistorial(nombre, montoInput, plazoMeses, acumuladoPagos.toFixed(2));
}

function agregarHistorial(nombre, monto, plazo, total) {
  const tabla = document.querySelector('#historial tbody');
  const fila = document.createElement('tr');
  fila.innerHTML = `<td>${nombre}</td><td>$${monto}</td><td>${plazo} meses</td><td>$${total}</td>`;
  tabla.appendChild(fila);
}
