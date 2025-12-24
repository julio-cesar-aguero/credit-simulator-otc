import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js'; // Útil para clases dinámicas
// Importamos componentes (Side Effects)
import './cells/credit-input.js'; 
import './cells/kpi-card.js';

export const SimulatorPageTpls = (SuperClass) => class extends SuperClass {
  
  render() {
    // 🛡️ CLÁUSULA DE GUARDIA ACTUALIZADA
  // Verificamos uiSchema, structure Y TAMBIÉN a11y
  if (!this.uiSchema || !this.uiSchema.structure ) {
    return html`
      <div class="container loading-state">
        <h2>⏳ Consultando al Arquitecto IA...</h2>
        <p>Generando contrato de interfaz normalizado...</p>
      </div>
    `;
  }

    const { structure, theme } = this.uiSchema;
    
    // Clases dinámicas basadas en el tema del JSON
    const containerClasses = {
      'container': true,
      [`density-${theme.layoutDensity}`]: true, // 'density-spacious' o 'density-dense'
      'theme-loaded': true
    };

    return html`
      <div class="${classMap(containerClasses)}">
        
        ${this._renderDemoControls()}

        <header role="banner">
           <h1 id="page-title">${structure.title}</h1>
           
           <span class="sr-only">
             ${structure.a11y?.pageTitle || structure.title}
           </span>
        </header>

        <main id="main-content" role="main">
          ${structure.regions.map(region => html`
            <section 
              id="${region.id}" 
              role="${region.role || 'region'}" 
              class="region-wrapper"
              aria-labelledby="page-title">
              
              ${region.components.map(compRef => this._renderComponentById(compRef.id))}
              
            </section>
          `)}
        </main>

        ${this._renderTable()}
      </div>
    `;
  }

  /**
   * 🧠 EL BUSCADOR (Lookup Engine)
   * Transforma un ID ("loan-amount-input") en HTML usando el diccionario "components"
   */
  _renderComponentById(componentId) {
    // 1. Buscamos la definición real en el diccionario
    const def = this.uiSchema.components[componentId];
    
    if (!def) {
      console.warn(`⚠️ Componente [${componentId}] referenciado pero no definido.`);
      return html``;
    }

    // 2. Switch por tipo de componente
    switch (def.type) {
      case 'credit-input':
        return this._tplCreditInput(def);
      
      case 'kpi-card':
        return this._tplKpiCard(def);

      case 'risk-alert':
        return this._tplRiskAlert(def);
        
      case 'feedback-action':
        return this._tplFeedbackAction(def);

      default:
        console.warn(`Tipo desconocido: ${def.type}`);
        return html``;
    }
  }

  /* ===========================================================
     🎨 TEMPLATES ESPECÍFICOS (Binding de Props + A11y)
     =========================================================== */

  _tplCreditInput(def) {
    // Detectamos si es el campo principal para bindear el valor del modelo
    // En un caso real, esto sería un mapa dinámico de valores.
    const currentValue = def.id === 'loan-amount-input' ? this.amount : 0;

    return html`
      <div class="field-wrapper" style="margin-bottom: 20px;">
        <credit-input 
          .label="${def.props.label}" 
          .fieldId="${def.id}" 
          .value="${currentValue}" 
          .min="${def.props.min}" 
          .max="${def.props.max}"
          .helperText="${def.props.helperText}"
          
          /* ♿️ ACCESIBILIDAD IMPLÍCITA (Del Schema) */
          aria-label="${def.a11y.ariaLabel}"
          aria-required="${def.a11y.ariaRequired}"
          
          @credit-input-change="${(e) => this._onInputChange(e, def.id)}"
        ></credit-input>

        ${this.errors && this.errors[def.id] ? html`
          <div class="error-message" role="alert" style="color: #b92a2a; font-size: 0.875rem; margin-top: 4px;">
            🚫 ${this.errors[def.id]}
          </div>
        ` : ''}
      </div>
    `;
  }

  _tplKpiCard(def) {
    // Si es la preview, inyectamos el valor calculado en tiempo real
    const displayValue = def.id === 'simulation-preview' 
      ? this.summary.monthlyPayment 
      : def.props.value;

    return html`
      <kpi-card 
        .title="${def.props.title}" 
        .value="${displayValue}"
        .caption="${def.props.caption}"
        .variant="${def.props.trend === 'positive' ? 'primary' : 'neutral'}"
        title="${def.props.tooltip}" 
        
        /* ♿️ A11y */
        role="${def.a11y.role}"
        aria-label="${def.a11y.ariaLabel}"
      ></kpi-card>
    `;
  }

  _tplRiskAlert(def) {
    return html`
      <div class="alert-box ${def.props.variant}" role="${def.a11y.role}" aria-live="${def.a11y.liveRegion}" 
           style="background: #e8f4fd; padding: 16px; border-left: 4px solid #004481; margin-bottom: 24px; border-radius: 4px;">
        <strong>${def.props.title}</strong>
        <p style="margin: 4px 0 0 0;">${def.props.message}</p>
      </div>
    `;
  }

  _tplFeedbackAction(def) {
    return html`
      <div style="margin-top: 24px;">
        <button 
          class="bbva-btn-primary"
          aria-label="${def.a11y.ariaLabel}"
          style="width: ${def.props.fullWidth ? '100%' : 'auto'}; padding: 12px; background: #1973B8; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;"
          @click="${() => alert('Navegando al paso 2 (Simulado)')}">
          ${def.props.label}
        </button>
      </div>
    `;
  }

  // --- Mantenemos tus controles de Demo y Tabla igual ---
  _renderDemoControls() {
    return html`
        <div class="simulation-controls" style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #ddd;">
          <div style="margin-bottom: 10px;">
            <strong>👤 Perfil:</strong>
            <button @click="${() => this.switchUserProfile('NOVICE')}">Novato</button>
            <button @click="${() => this.switchUserProfile('EXPERT_CFO')}">Experto</button>
          </div>
        </div>
    `;
  }

  _renderTable() {
    if (!this.amortizationTable || this.amortizationTable.length === 0) return html``;
    return html`
       <div class="table-container" style="margin-top: 40px;">
         <h3>Tabla de Amortización (Proyección)</h3>
         <table style="width: 100%; border-collapse: collapse;">
            <thead style="background: #072146; color: white;">
              <tr><th>Mes</th><th>Cuota</th><th>Interés</th><th>Capital</th><th>Pendiente</th></tr>
            </thead>
            <tbody>${this.amortizationTable.map(row => this._tplRow(row))}</tbody>
         </table>
       </div>
    `;
  }

  _tplRow(row) {
    return html`
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px;">${row.period}</td>
        <td>${row.paymentFormatted}</td>
        <td>${row.interestFormatted}</td>
        <td>${row.capitalFormatted}</td>
        <td><strong>${row.balanceFormatted}</strong></td>
      </tr>
    `;
  }
};