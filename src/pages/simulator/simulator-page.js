import { CellsPage } from '../../cells-page-mock.js';
import styles from './simulator-page-styles.js';
import { SimulatorPageDms } from './simulator-page-dms.js';
import { SimulatorPageTpls } from './simulator-page-tpls.js';

export class SimulatorPage extends SimulatorPageTpls(
  SimulatorPageDms(CellsPage)
) {
  static get is() { return 'simulator-page'; }
  static get styles() { return [ styles ]; }

  static get properties() {
    return {
      amount: { type: Number },
      rate: { type: Number },
      months: { type: Number },
      amortizationTable: { type: Array },
      summary: { type: Object },
      // Definimos uiSchema como Object
      uiSchema: { type: Object }
    };
  }

  constructor() {
    super();
    this.amount = 50000;
    this.rate = 14.5;
    this.months = 12;
    this.amortizationTable = [];
    this.summary = { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    
    // 🔧 CAMBIO CLAVE: Inicializar en null para disparar el loading
    this.uiSchema = null; 
  }

  firstUpdated() {
    this._loadInterfaceConfig(); 
    // Nota: Movemos el _calculateSimulation dentro de _loadInterfaceConfig (en el DMS)
    // para esperar a tener los valores por defecto del JSON antes de calcular.
  }
}

customElements.define(SimulatorPage.is, SimulatorPage);