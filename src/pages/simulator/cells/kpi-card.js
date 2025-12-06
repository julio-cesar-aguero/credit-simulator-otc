import { LitElement, html, css } from 'lit';

export class KpiCard extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      value: { type: String },
      variant: { type: String } // 'primary' | 'secondary'
    };
  }

  static get styles() {
    return css`
      :host { 
        display: block; 
        background: white; 
        padding: 20px; 
        border-radius: 8px; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        text-align: center;
      }
      :host([variant="primary"]) { background: #004481; color: white; }
      
      h3 { margin: 0 0 10px 0; font-size: 0.9rem; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px; }
      .value { font-size: 1.8rem; font-weight: 700; margin: 0; }
    `;
  }

  render() {
    return html`
      <h3>${this.title}</h3>
      <p class="value">${this.value}</p>
    `;
  }
}

customElements.define('kpi-card', KpiCard);