/**
 * Smart DM: FinancialCalculator
 * Responsabilidad: Motor de cálculo financiero de alta precisión.
 * Sistema de Amortización Francés (Cuotas Fijas).
 */
export class FinancialCalculator {

  /**
   * Genera la tabla de amortización.
   * @param {number} amount - Monto del préstamo (Principal)
   * @param {number} annualRate - Tasa de interés anual (%)
   * @param {number} months - Plazo en meses
   * @returns {Array} Tabla detallada mes a mes
   */
  static calculateAmortizationTable(amount, annualRate, months) {
    // 1. Validaciones de seguridad (Fail Fast)
    if (!amount || amount <= 0 || !months || months <= 0) return [];

    // 2. Conversión de tasas
    // Tasa Mensual = Tasa Anual / 12 / 100
    const monthlyRate = (annualRate / 12) / 100;

    // 3. Cálculo de la Cuota Fija (Fórmula de Anualidad)
    // PMT = (P * i) / (1 - (1 + i)^-n)
    const pmt = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    let currentBalance = amount;
    const amortizationTable = [];

    // 4. Bucle Algorítmico (La lógica pura)
    for (let i = 1; i <= months; i++) {
      // Interés del mes = Saldo pendiente * Tasa mensual
      const interest = currentBalance * monthlyRate;
      
      // Capital amortizado = Cuota fija - Interés
      const capital = pmt - interest;
      
      // Nuevo saldo
      currentBalance -= capital;

      // Corrección de precisión para el último mes (evitar -0.00)
      if (i === months && Math.abs(currentBalance) < 1) {
        currentBalance = 0;
      }

      // Agregamos la fila (Célula de Datos)
      amortizationTable.push({
        period: i,
        // Formateamos para vista humana
        paymentFormatted: this._formatCurrency(pmt),
        interestFormatted: this._formatCurrency(interest),
        capitalFormatted: this._formatCurrency(capital),
        balanceFormatted: this._formatCurrency(Math.max(0, currentBalance)),
        // Mantenemos valores numéricos crudos para gráficas
        payment: pmt,
        interest: interest,
        capital: capital,
        balance: Math.max(0, currentBalance)
      });
    }

    return amortizationTable;
  }

  /**
   * Helper para formato moneda (USD)
   */
  static _formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
}