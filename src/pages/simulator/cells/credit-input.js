import { LitElement, html, css } from 'lit';

export class CreditInput extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      value: { type: Number },
      min: { type: Number },
      max: { type: Number },
      fieldId: { type: String } // Para identificar qué campo es (monto, plazo)
    };
  }

  static get styles() {
    return css`
      :host { display: block; margin-bottom: 16px; }
      label { display: block; font-weight: 600; margin-bottom: 8px; color: #333; }
      .input-wrapper { display: flex; align-items: center; gap: 10px; }
      input[type="number"] {
        width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem;
      }
      input[type="range"] { flex: 1; }
    `;
  }

  render() {
    return html`
      <label>${this.label}</label>
      <div class="input-wrapper">
        <input 
          type="range" 
          .min="${this.min}" 
          .max="${this.max}" 
          .value="${this.value}" 
          @input="${this._handleInput}"
        >
        <input 
          type="number" 
          .min="${this.min}" 
          .max="${this.max}" 
          .value="${this.value}" 
          @input="${this._handleInput}"
        >
      </div>
    `;
  }

  _handleInput(e) {
    const val = parseFloat(e.target.value);
    this.value = val;
    // Emitimos un evento personalizado burbujeante
    this.dispatchEvent(new CustomEvent('credit-input-change', {
      detail: { field: this.fieldId, value: val },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('credit-input', CreditInput);