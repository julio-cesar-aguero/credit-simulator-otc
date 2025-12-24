import { FinancialCalculator } from '../../utils/financial-calculator.js';
import { AiServiceMock } from '../../utils/ai-service-mock.js';

export const SimulatorPageDms = (SuperClass) => class extends SuperClass {

  constructor() {
    super();
    // Estado interno para errores (Si 'errors' no está en properties, aquí sí usaremos requestUpdate)
    this.errors = {}; 
  }

  /**
   * Célula de Acción: Ejecuta el cálculo financiero.
   */
  _calculateSimulation() {
    try {
      // 🛡️ Disparador del Demo: Error de Backend simulado
      if (this.amount === 1000000) {
        throw new Error('ERR_BACKEND_TIMEOUT');
      }

      // 1. Lógica Financiera
      const table = FinancialCalculator.calculateAmortizationTable(
        this.amount, this.rate, this.months
      );

      // 2. Resúmenes
      const totalInterest = table.reduce((acc, row) => acc + row.interest, 0);
      const totalPayment = table.reduce((acc, row) => acc + (row.capital + row.interest), 0);

      // 3. Actualización de Estado (Lit detecta esto automáticamente)
      this.amortizationTable = table;
      this.summary = {
        totalInterest: FinancialCalculator._formatCurrency(totalInterest),
        totalPayment: FinancialCalculator._formatCurrency(totalPayment),
        monthlyPayment: table.length > 0 ? table[0].paymentFormatted : '$0.00'
      };

    } catch (error) {
      this._triggerResilienceFactory(error.message);
    }
  }

  /**
   * 🛡️ Célula de Resiliencia
   */
  _triggerResilienceFactory(code) {
    // ✅ CORRECCIÓN: Al asignar un nuevo objeto a uiSchema, Lit dispara el render solo.
    // Borramos el requestUpdate() que había aquí.
    this.uiSchema = {
      theme: { layoutDensity: "spacious" },
      structure: {
        title: "Asistente de Continuidad Operativa",
        a11y: { pageTitle: "Modo de recuperación de errores." },
        regions: [{
          id: "mitigation-region",
          role: "alert",
          components: [
            { id: "alert-component", type: "risk-alert" },
            { id: "feedback-component", type: "feedback-action" }
          ]
        }]
      },
      components: {
        "alert-component": {
          type: "risk-alert",
          props: { 
            title: "Servicio Interrumpido",
            message: `Detectado error (${code}). Hemos activado el estimador local seguro.`,
            variant: "warning" 
          },
          a11y: { role: "alert", liveRegion: "assertive" }
        },
        "feedback-component": {
          type: "feedback-action",
          props: { label: "¿Te sirve esta solución temporal?", fullWidth: true },
          a11y: { ariaLabel: "Enviar feedback sobre el error" }
        }
      }
    };
  }

  _onFeedbackSubmit(option) {
    console.info(`📊 Feedback de Contingencia: ${option}`);
    alert(`Gracias. Tu feedback ayuda a entrenar la resiliencia del sistema.`);
  }

  // Ciclo de vida
  async firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    await this._loadInterfaceConfig();
    // Nota: _calculateSimulation ya se llama dentro de _loadInterfaceConfig, no hace falta llamarlo aquí de nuevo
  }

  /**
   * Célula de Acción: Carga la configuración
   */
  async _loadInterfaceConfig(userProfile = 'NOVICE', intent = 'LOAN') {
    
    // ✅ OPTIMIZACIÓN: Solo ponemos null si no lo es ya, para evitar ciclos vacíos.
    // Y borramos el requestUpdate() explícito.
    if (this.uiSchema !== null) {
      this.uiSchema = null; 
    }
    
    try {
      // 🧠 Llamada a la IA
      const config = await AiServiceMock.getSchemaForUser(userProfile, intent);
      
      // ✅ Lit detecta este cambio y pinta la UI nueva
      this.uiSchema = config;
      
      // 🔄 Inicialización de Valores por Defecto
      if (config.components) {
        Object.values(config.components).forEach(def => {
          if (def.props && def.props.defaultValue && def.id) {
             if (def.type === 'credit-input') {
                if (def.id.includes('amount')) this.amount = def.props.defaultValue;
                if (def.id.includes('months')) this.months = def.props.defaultValue;
             }
          }
        });
      }
      
      this._calculateSimulation(); 

    } catch (error) {
      console.error('❌ Error crítico en IA:', error);
      this._triggerResilienceFactory("AI_CONNECTION_LOST");
    }
  }

  changeProductMode(mode) {
    this._loadInterfaceConfig(this.currentUserProfile || 'NOVICE', mode);
  }

  switchUserProfile(profile) {
    this._loadInterfaceConfig(profile);
  }

  _onInputChange(e, componentId) {
    const value = e.detail.value;

    // 1. Buscamos definición para validar
    if (this.uiSchema && this.uiSchema.components && componentId) {
      const def = this.uiSchema.components[componentId];
      
      if (def && def.validation) {
        const errorMsg = this._validateField(value, def.validation.rules);
        
        this.errors = { ...this.errors, [componentId]: errorMsg };
        
        // AQUÍ SÍ DEJAMOS requestUpdate:
        // Como 'this.errors' probablemente no está definido en 'static properties',
        // necesitamos forzar el repintado para que salga el mensaje de error rojo.
        if (errorMsg) {
          this.requestUpdate(); 
          return;
        }
      }
    }

    // 2. Si es válido, actualizamos modelo
    if (componentId === 'loan-amount-input') this.amount = value;
    
    // 3. Recalculamos
    this._calculateSimulation();
  }

  _validateField(value, rules) {
    if (!rules) return null;

    for (const rule of rules) {
      if (rule.type === 'range') {
        if (value < rule.min || value > rule.max) return rule.errorMessage;
      }
      if (rule.type === 'format') {
        const regex = new RegExp(rule.pattern);
        if (!regex.test(value.toString())) return rule.errorMessage;
      }
    }
    return null;
  }
};