import { css } from 'lit';

export default css`
  :host {
    display: block;
    font-family: 'Segoe UI', sans-serif;
    color: #333;
    padding: 20px;
    background-color: #f8f9fa;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }

  h1 { margin-top: 0; color: #004481; } /* Azul Corporativo */

  /* --- INPUTS --- */
  .controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
    background: #f0f4f8;
    padding: 20px;
    border-radius: 8px;
  }

  .control-group { display: flex; flex-direction: column; gap: 8px; }
  .control-group label { font-weight: 600; font-size: 0.9rem; }
  .control-group input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  /* --- KPIS (Resumen) --- */
  .summary-cards {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  .kpi-card {
    flex: 1;
    background: #004481;
    color: white;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
  }
  .kpi-card h3 { margin: 0; font-size: 0.8rem; opacity: 0.8; }
  .kpi-card p { margin: 5px 0 0 0; font-size: 1.5rem; font-weight: bold; }

  /* --- TABLA --- */
  .table-container { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th { background: #004481; color: white; padding: 12px; text-align: right; }
  td { padding: 10px; border-bottom: 1px solid #eee; text-align: right; }
  tr:hover { background-color: #f1f1f1; }
`;