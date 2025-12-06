import { FinancialCalculator } from '../../utils/financial-calculator.js';
import { AiServiceMock } from '../../utils/ai-service-mock.js';
export const SimulatorPageDms = (SuperClass) => class extends SuperClass {

  /**
   * Célula de Acción: Ejecuta el cálculo financiero.
   * Se llama al iniciar y cada vez que el usuario cambia un input.
   */
  _calculateSimulation() {
    // 1. Llamamos al Smart DM
    const table = FinancialCalculator.calculateAmortizationTable(
      this.amount,
      this.rate,
      this.months
    );

    // 2. Calculamos Resúmenes (KPIs) para el Dashboard
    const totalInterest = table.reduce((acc, row) => acc + row.interest, 0);
    const totalPayment = table.reduce((acc, row) => acc + (row.capital + row.interest), 0);

    // 3. Actualizamos el Estado del Órgano
    this.amortizationTable = table;
    
    this.summary = {
      totalInterest: FinancialCalculator._formatCurrency(totalInterest),
      totalPayment: FinancialCalculator._formatCurrency(totalPayment),
      // Tomamos la cuota del primer mes (es fija)
      monthlyPayment: table.length > 0 ? table[0].paymentFormatted : '$0.00'
    };
  }

  // Ciclo de vida: Al cargar el componente
  async firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    await this._loadInterfaceConfig();
    this._calculateSimulation();
  }

  /**
   * Célula de Acción: Carga la configuración (Simulando Backend/IA)
   */
  async _loadInterfaceConfig(userProfile = 'NOVICE') {
    this.uiSchema = null; // Ponemos null para mostrar "Cargando..." si quieres manejar ese estado
    this.requestUpdate();
    
    try {
      // 🧠 Llamamos a la IA en lugar del fetch estático
      const config = await AiServiceMock.getSchemaForUser(userProfile);
      
      this.uiSchema = config;
      
      // Reiniciamos valores por defecto según lo que diga la IA
      if(config.sections) {
          config.sections.forEach(sec => {
              sec.widgets.forEach(widget => {
                  if (widget.props.defaultValue) {
                      this[widget.props.fieldId] = widget.props.defaultValue;
                  }
              });
          });
      }
      
      this._calculateSimulation(); // Recalcular con nuevos valores
    } catch (error) {
      console.error('Error IA:', error);
    }
  }

  // Agregamos una función para que el usuario cambie su rol (Simulación)
  switchUserProfile(profile) {
    this._loadInterfaceConfig(profile);
  }

  /**
   * Célula de Evento: Maneja los Inputs
   */
  _onInputChange(e) {
  
    // Desestructuramos lo que viene en el evento personalizado
    const { field, value } = e.detail; 
    if (field && !isNaN(value)) {
      this[field] = value; // Actualiza: this.amount = 50000
      this._calculateSimulation(); // Recalcula
    }
  }
};