import { html } from 'lit';
// Importamos los archivos para que se registren los componentes (side-effects)
import './cells/credit-input.js'; 
import './cells/kpi-card.js';

export const SimulatorPageTpls = (SuperClass) => class extends SuperClass {
  render() {
    // 🛡️ CLÁUSULA DE GUARDIA (Safety First)
    // Si la IA aún no responde (es null o undefined), mostramos un Spinner
    if (!this.uiSchema) {
      return html`
        <div class="container" style="text-align: center; padding: 50px;">
          <h2>⏳ Consultando al Oráculo Financiero...</h2>
          <p>La IA está analizando tu perfil...</p>
        </div>
      `;
    }

    // Si llegamos aquí, es que this.uiSchema YA tiene datos
    return html`
      <div class="container">
        <div style="margin-bottom: 20px; padding: 10px; background: #e0e0e0; border-radius: 8px;">
          <small>👮‍♂️ Simular Contexto de Usuario (AI Trigger):</small><br>
          <button @click="${() => this.switchUserProfile('NOVICE')}">Soy PyME Nueva</button>
          <button @click="${() => this.switchUserProfile('EXPERT_CFO')}">Soy CFO Experto</button>
        </div>

        <h1>🏦 ${this.uiSchema.pageTitle}</h1> 
        ${this.uiSchema.sections.map(section => html`
            <div class="controls">
              ${section.widgets.map(widget => this._renderDynamicWidget(widget))}
            </div>
        `)}

        <div class="summary-cards">
           ${this._tplKpi('Cuota Mensual', this.summary.monthlyPayment, 'primary')}
           ${this._tplKpi('Total Intereses', this.summary.totalInterest)}
           ${this._tplKpi('Total a Pagar', this.summary.totalPayment)}
        </div>
        
        ${this._renderTable()}
      </div>
    `;
  }

  /**
   * EL INTERPRETE (Component Registry)
   * Decide qué pintar según el "type" del JSON
   */
  _renderDynamicWidget(widgetDef) {
    switch (widgetDef.type) {
      case 'credit-input':
        return html`
          <credit-input 
            .label="${widgetDef.props.label}" 
            .fieldId="${widgetDef.props.fieldId}" 
            .value="${this[widgetDef.props.fieldId]}" 
            .min="${widgetDef.props.min}" 
            .max="${widgetDef.props.max}"
            @credit-input-change="${this._onInputChange}"
          ></credit-input>
        `;
      
      case 'risk-alert': 
        // Aquí podrías agregar más tipos de componentes en el futuro
        return html`<div class="alert">⚠️ ${widgetDef.props.message}</div>`;

      default:
        console.warn('Componente desconocido:', widgetDef.type);
        return html``;
    }
  }

  _renderTable() {
     // ... tu código de tabla anterior ...
     return html`
        <h3>Tabla de Amortización</h3>
        <div class="table-container">
          <table>
             <tbody>${this.amortizationTable.map(row => this._tplRow(row))}</tbody>
          </table>
        </div>
     `;
  }

  _tplInput(label, fieldId, value, min, max) {
    return html`
      <credit-input 
        .label="${label}" 
        .fieldId="${fieldId}" 
        .value="${value}" 
        .min="${min}" 
        .max="${max}"
        @credit-input-change="${this._onInputChange}"
      ></credit-input>
    `;
  }

  _tplKpi(title, value, variant = 'secondary') {
    return html`
      <kpi-card 
        .title="${title}" 
        .value="${value}"
        .variant="${variant}"
      ></kpi-card>
    `;
  }

  _tplRow(row) {
    return html`
      <tr>
        <td>${row.period}</td>
        <td>${row.paymentFormatted}</td>
        <td>${row.interestFormatted}</td>
        <td>${row.capitalFormatted}</td>
        <td><strong>${row.balanceFormatted}</strong></td>
      </tr>
    `;
  }
};