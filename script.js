document.getElementById('btn-calcular').addEventListener('click', procesarSimulacion);
document.getElementById('btn-limpiar').addEventListener('click', limpiarCampos);

function procesarSimulacion() {
  const montoInput = parseFloat(document.getElementById('monto').value);
  const tasaAnualInput = parseFloat(document.getElementById('tasa').value) / 100;
  const plazoMeses = parseInt(document.getElementById('plazo').value);
  const IVA_VALOR = 0.16;

  if (isNaN(montoInput) || isNaN(tasaAnualInput) || montoInput <= 0) {
    alert("Ingrese parámetros válidos.");
    return;
  }

  const amortizacionCapital = montoInput / plazoMeses;
  const tasaMensualEquivalente = tasaAnualInput / 12;
  let saldoInsoluto = montoInput;
  let totalIntereses = 0;
  let totalIVA = 0;
  let totalPagos = 0;

  const tablaBody = document.querySelector('#tabla-amortizacion tbody');
  tablaBody.innerHTML = '';

  for (let periodo = 1; periodo <= plazoMeses; periodo++) {
    const interesDelPeriodo = saldoInsoluto * tasaMensualEquivalente;
    const ivaSobreInteres = interesDelPeriodo * IVA_VALOR;
    const pagoMensualTotal = amortizacionCapital + interesDelPeriodo + ivaSobreInteres;

    totalIntereses += interesDelPeriodo;
    totalIVA += ivaSobreInteres;
    totalPagos += pagoMensualTotal;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${periodo}</td>
      <td>$${saldoInsoluto.toFixed(2)}</td>
      <td>$${amortizacionCapital.toFixed(2)}</td>
      <td>$${interesDelPeriodo.toFixed(2)}</td>
      <td>$${ivaSobreInteres.toFixed(2)}</td>
      <td>$${pagoMensualTotal.toFixed(2)}</td>
    `;
    tablaBody.appendChild(fila);

    saldoInsoluto -= amortizacionCapital;
  }

  mostrarResultado(amortizacionCapital, totalIntereses, totalIVA, totalPagos);
}

function mostrarResultado(primerPago, totalIntereses, totalIVA, totalPagos) {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    <div>
      <h3>Primer pago</h3>
      <p>$${primerPago.toFixed(2)}</p>
    </div>
    <div>
      <h3>Total de intereses</h3>
      <p>$${totalIntereses.toFixed(2)}</p>
    </div>
    <div>
      <h3>Total de IVA</h3>
      <p>$${totalIVA.toFixed(2)}</p>
    </div>
    <div>
      <h3>Total a pagar</h3>
      <p>$${totalPagos.toFixed(2)}</p>
    </div>
  `;
}

function limpiarCampos() {
  document.getElementById('nombre').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('ingreso').value = '';
  document.getElementById('monto').value = '';
  document.getElementById('tasa').value = '';
  document.getElementById('plazo').selectedIndex = 0;

  document.getElementById('resultado').innerHTML = '';
  document.querySelector('#tabla-amortizacion tbody').innerHTML = '';
}

