import { css } from 'lit';

export default css`
  /* --- 🔵 BBVA DESIGN TOKENS (Simulados) --- */
  :host {
    --bbva-navy: #072146;         /* Azul Corporativo Oscuro (Core) */
    --bbva-medium-blue: #1973B8;  /* Azul Medio (Enlaces/Secundario) */
    --bbva-aqua: #2DCCCD;         /* Aqua (Interacción/Focus) */
    --bbva-white: #FFFFFF;
    --bbva-sky: #E9F2F8;          /* Fondos sutiles */
    --bbva-navy-light: #043263;   /* Variación para degradados */
    
    --text-primary: #121212;
    --text-secondary: #666666;
    
    --radius-card: 8px;           /* Bordes suaves */
    --radius-pill: 50px;          /* Botones redondeados */
    
    display: block;
    font-family: 'Benton Sans', 'Helvetica Neue', Arial, sans-serif; /* Fallback seguro */
    background-color: #F4F4F4;
    color: var(--text-primary);
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  /* --- 📱 CONTENEDOR TIPO "SHEET" --- */
  .container {
    max-width: 900px;
    margin: 0 auto;
    background: var(--bbva-white);
    padding: 0; /* Quitamos padding para que el header toque bordes */
    border-radius: var(--radius-card);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    overflow: hidden; /* Para que el header respete el borde */
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* --- HEADER AZUL (Look App) --- */
  h1 {
    background: linear-gradient(180deg, var(--bbva-navy) 0%, var(--bbva-navy-light) 100%);
    color: var(--bbva-white);
    margin: 0;
    padding: 30px 24px;
    font-size: 1.8rem;
    font-weight: 300; /* Tipografía Light característica */
    letter-spacing: -0.5px;
  }

  /* --- 🎛️ CONTROLES (CHIPS / TABS) --- */
  .simulation-controls {
    padding: 24px;
    background: var(--bbva-white);
    border-bottom: 1px solid #eee;
  }
  
  .simulation-controls strong {
    display: block;
    color: var(--bbva-navy);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 12px;
    letter-spacing: 1px;
  }

  .control-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  /* Botones estilo "Chip" o "Píldora" */
  button {
    background: transparent;
    border: 1px solid #D4D4D4;
    color: var(--bbva-navy);
    padding: 8px 20px;
    border-radius: var(--radius-pill); /* Spherica total */
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  button:hover {
    border-color: var(--bbva-medium-blue);
    background-color: var(--bbva-sky);
  }

  /* Efecto de "Seleccionado" (Simulado) */
  button:active, button:focus {
    background-color: var(--bbva-navy);
    color: var(--bbva-white);
    border-color: var(--bbva-navy);
    box-shadow: 0 4px 10px rgba(7, 33, 70, 0.2);
  }

  /* --- 🤖 CANVAS DINÁMICO --- */
  .canvas {
    margin: 24px;
    border-radius: var(--radius-card);
    transition: all 0.3s ease;
  }

  .canvas.dense {
    background-color: var(--bbva-white);
    border: 1px solid #E5E5E5;
  }

  .canvas.spacious {
    background-color: #F8FDFE; /* Aqua muy muy suave */
    border: 1px dashed var(--bbva-aqua);
    padding: 30px;
  }

  /* --- 📊 KPIS Y DATOS --- */
  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    padding: 0 24px 24px 24px;
  }

  .kpi-card {
    background: var(--bbva-white);
    border: 1px solid #EAEAEA;
    border-radius: var(--radius-card);
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  /* La tarjeta principal se viste de Aqua o Navy */
  .kpi-card[variant="primary"], .summary-cards .kpi-card:first-child {
    background: var(--bbva-navy);
    color: var(--bbva-white);
    border: none;
  }
  
  /* Decoración Spherica: Círculo sutil */
  .kpi-card[variant="primary"]::after {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    background: var(--bbva-aqua);
    opacity: 0.2;
    border-radius: 50%;
  }

  .kpi-card h3 {
    font-size: 0.75rem;
    text-transform: uppercase;
    margin: 0 0 8px 0;
    opacity: 0.8;
  }

  .kpi-card p {
    font-size: 1.75rem;
    font-weight: 300; /* Light font para números grandes */
    margin: 0;
    letter-spacing: -1px;
  }

  /* --- 📉 TABLA ESTILO APP --- */
  .table-container {
    margin: 0 24px 40px 24px;
  }

  table {
    width: 100%;
    border-collapse: separate; 
    border-spacing: 0;
  }

  th {
    text-align: right;
    color: var(--text-secondary);
    font-size: 0.8rem;
    text-transform: uppercase;
    padding: 10px;
    border-bottom: 2px solid var(--bbva-navy);
  }

  td {
    text-align: right;
    padding: 14px 10px;
    border-bottom: 1px solid #F0F0F0;
    color: var(--bbva-navy);
    font-variant-numeric: tabular-nums;
  }

  /* --- ⚠️ ALERTAS --- */
  .alert {
    background: #FEF9E6;
    color: #121212;
    border-left: 4px solid #F8CD51;
    padding: 16px;
    border-radius: 4px;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  /* --- 💫 ANIMACIONES --- */
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .loading-state {
    text-align: center;
    padding: 60px;
    color: var(--bbva-medium-blue);
  }
`;