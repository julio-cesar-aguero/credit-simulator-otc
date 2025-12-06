import { CellsPage } from '../../cells-page-mock.js';
import styles from './simulator-page-styles.js'; // Importamos objeto

// Importamos los Tejidos (Mixins)
import { SimulatorPageDms } from './simulator-page-dms.js';
import { SimulatorPageTpls } from './simulator-page-tpls.js';


export class SimulatorPage extends SimulatorPageTpls(
  SimulatorPageDms(CellsPage)
) {
  static get is() { return 'simulator-page'; }

  static get styles() {
    return [ styles ];
  }

  static get properties() {
    return {
      // Estado del simulador
      amount: { type: Number },
      rate: { type: Number },
      months: { type: Number },
      
      // Resultados calculados
      amortizationTable: { type: Array },
      summary: { type: Object },

      uiSchema: { type: Object }
    };
  }

  constructor() {
    super();
    // Valores por defecto
    this.amount = 50000;
    this.rate = 14.5;
    this.months = 12;
    this.amortizationTable = [];
    this.summary = { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    this.uiSchema = { sections: [] };
  }

  firstUpdated() {
    // 1. Primero cargamos la configuración (el JSON)
    this._loadInterfaceConfig(); 
    
    // 2. Luego calculamos los números iniciales
    this._calculateSimulation();
  }
}

customElements.define(SimulatorPage.is, SimulatorPage);