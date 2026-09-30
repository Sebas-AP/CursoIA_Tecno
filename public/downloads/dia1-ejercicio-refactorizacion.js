/**
 * EJERCICIO PRÁCTICO DÍA 1: CÓDIGO LEGACY PARA REFACTORIZAR
 * 
 * Este módulo contiene lógica de facturación y cálculo de comisiones.
 * Tiene alta complejidad ciclomática, variables confusas, mutaciones de estado
 * y ausencia de pruebas.
 * 
 * RETO: Utiliza tu agente de código con un prompt estructurado de 4 capas
 * para refactorizarlo a código limpio, modular, tipado y con pruebas unitarias.
 */

function processOrders(data, flag, userType) {
  var res = [];
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (item.active == true && item.price > 0) {
      var d = 0;
      if (userType == "VIP") {
        if (item.price > 1000) {
          d = item.price * 0.20;
        } else {
          d = item.price * 0.15;
        }
      } else if (userType == "PREMIUM") {
        d = item.price * 0.10;
      } else {
        if (item.price > 500) {
          d = item.price * 0.05;
        }
      }

      var finalPrice = item.price - d;

      // Impuesto
      var tax = 0;
      if (flag == "IVA_MX") {
        tax = finalPrice * 0.16;
      } else if (flag == "TAX_US") {
        tax = finalPrice * 0.0825;
      }

      var grand = finalPrice + tax;
      total += grand;

      res.push({
        id: item.id,
        orig: item.price,
        disc: d,
        net: finalPrice,
        tax: tax,
        total: grand
      });
    }
  }

  return {
    items: res,
    grandTotal: total,
    count: res.length
  };
}

module.exports = { processOrders };
