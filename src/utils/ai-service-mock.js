/**
 * Simula el Backend Inteligente (BFF + AI)
 * Devuelve diferentes esquemas de UI según el perfil del usuario.
 */
export class AiServiceMock {

  static async getSchemaForUser(userProfile) {
    // Simulamos latencia de red (pensamiento de la IA)
    await new Promise(r => setTimeout(r, 800));

    console.log(`🧠 AI Analizando perfil: ${userProfile}...`);

    if (userProfile === 'EXPERT_CFO') {
      return this._getExpertSchema();
    } else {
      return this._getNoviceSchema(); // Por defecto
    }
  }

  // Esquema A: Para Directores Financieros (Denso, datos duros primero)
  static _getExpertSchema() {
    return {
      pageTitle: "Panel de Análisis Financiero (Modo Experto)",
      layout: "dense",
      sections: [
        {
          id: "kpis_top",
          widgets: [
             // El experto quiere ver el ROI y Costo Total primero
            { type: "kpi-card", props: { title: "Costo Financiero Total", value: "$0.00", variant: "primary" } },
            { type: "kpi-card", props: { title: "Tasa Efectiva Anual", value: "0%", variant: "secondary" } }
          ]
        },
        {
          id: "inputs_compact",
          widgets: [
            { type: "credit-input", props: { label: "Principal", fieldId: "amount", min: 100000, max: 5000000, defaultValue: 2000000 } },
            { type: "credit-input", props: { label: "Plazo (Meses)", fieldId: "months", min: 12, max: 84, defaultValue: 48 } }
            // Al experto no le mostramos la tasa (es fija por contrato) para limpiar ruido
          ]
        }
      ]
    };
  }

  // Esquema B: Para Dueños de PyME primerizos (Guiado, amigable)
  static _getNoviceSchema() {
    return {
      pageTitle: "Simula tu Crédito Fácil",
      layout: "spacious",
      sections: [
        {
          id: "intro_inputs",
          widgets: [
            { type: "risk-alert", props: { message: "👋 ¡Hola! Empieza seleccionando cuánto necesitas." } },
            { type: "credit-input", props: { label: "¿Cuánto dinero necesitas?", fieldId: "amount", min: 5000, max: 100000, defaultValue: 20000 } },
            { type: "credit-input", props: { label: "¿En cuánto tiempo puedes pagar?", fieldId: "months", min: 6, max: 36, defaultValue: 12 } }
          ]
        }
      ]
    };
  }
}