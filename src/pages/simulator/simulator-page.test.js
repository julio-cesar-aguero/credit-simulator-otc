import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import { stub } from 'sinon';
import './simulator-page.js';
import { AiServiceMock } from '../../utils/ai-service-mock.js';

describe('SimulatorPage Logic & Architecture', () => {
  let el;
  let aiStub;

  // 🛠️ SETUP: Aislamiento del entorno (Mocking)
  beforeEach(async () => {
    // Simulamos la respuesta de la IA para tener control total de la prueba
    // Esto cumple con la definición de prueba unitaria de usar "dobles de pruebas" 
    aiStub = stub(AiServiceMock, 'getSchemaForUser');
    
    // Configuración por defecto del Mock
    aiStub.resolves({
      pageTitle: 'Test Mode',
      layout: 'test-layout',
      sections: [{
        id: 'sec1',
        widgets: [
          { type: 'credit-input', props: { fieldId: 'amount', label: 'Monto', min: 0, max: 100 } }
        ]
      }]
    });

    el = await fixture(html`<simulator-page></simulator-page>`);
  });

  // 🧹 TEARDOWN: Limpieza
  afterEach(() => {
    aiStub.restore();
  });

  // ✅ TEST 1: Lógica de Negocio (DMS)
  // Cumple: "Validación de requerimientos funcionales" 
  it('debe calcular la tabla de amortización correctamente al iniciar', () => {
    // Verificamos que se ejecutó el cálculo inicial
    expect(el.amortizationTable).to.be.an('array');
    // Verificamos que el resumen se generó (Lógica de _calculateSimulation)
    expect(el.summary.monthlyPayment).to.not.equal('$0.00'); 
  });

  // ✅ TEST 2: Server-Driven UI (Integración Lógica)
  // Cumple: "Pruebas unitarias obligatorias" 
  it('debe adaptar el estado interno basándose en la respuesta de la IA (Schema is Law)', async () => {
    // El componente llama a la IA en firstUpdated
    // Verificamos que el estado local "uiSchema" coincida con lo que devolvió el stub
    expect(el.uiSchema.pageTitle).to.equal('Test Mode');
    expect(el.uiSchema.layout).to.equal('test-layout');
  });

  // ✅ TEST 3: Factory Pattern (TPLS)
  // Cumple: Verificación de que el JSON se convierte en HTML correcto
  it('debe renderizar el componente correcto según el "type" del JSON', async () => {
    // Esperamos a que el ciclo de renderizado termine
    await el.updateComplete;
    
    // Buscamos el componente genérico en el Shadow DOM
    const inputEl = el.shadowRoot.querySelector('credit-input');
    
    // Validamos que existe y tiene las props correctas
    expect(inputEl).to.exist;
    expect(inputEl.getAttribute('label')).to.equal('Monto');
  });

  // ✅ TEST 4: Resiliencia y Manejo de Errores (Fallback)
  // Cumple: Gestión de errores para evitar puesta en producción de fallos 
  it('debe manejar errores de la IA sin romper la UI (Safety Net)', async () => {
    // Forzamos un error en el servicio
    aiStub.rejects(new Error('AI Down'));
    
    // Re-creamos el componente para que dispare el error al nacer
    const elError = await fixture(html`<simulator-page></simulator-page>`);
    
    // Verificamos que no explotó y tiene un estado seguro (sections vacío o null)
    // Según tu lógica en el DMS catch block:
    expect(elError.uiSchema).to.deep.equal({ sections: [] }); // O null, según tu implementación exacta
  });

  // ✅ TEST 5: Accesibilidad
  // Cumple: Requisito de prioridad A y AA de norma UNE 139803 [cite: 236]
  it('debe ser accesible (A11y Check)', async () => {
    await expect(el).to.be.accessible();
  });

  // simulator-page.test.js

it('debe activar el modo de resiliencia ante un error de backend (Monto 1M)', async () => {
  // 1. Forzamos el disparador de error en el componente
  el.amount = 1000000;
  el._calculateSimulation(); // Ejecutamos la lógica que tiene el try-catch
  
  // 2. Esperamos a que Lit termine de actualizar la UI
  await el.updateComplete;

  // 3. VALIDACIONES DE LA NORMA:
  // Verificamos que el título cambió (Gestión del error [cite: 119])
  expect(el.uiSchema.pageTitle).to.equal('Asistente de Continuidad Operativa');
  
  // Verificamos que el widget de alerta de riesgo esté presente
  const alert = el.shadowRoot.querySelector('.alert');
  expect(alert).to.exist;
  expect(alert.textContent).to.contain('ERR_BACKEND_TIMEOUT');

  // Verificamos que el botón de feedback se renderizó [cite: 406]
  const feedbackBtn = el.shadowRoot.querySelector('.feedback-container button');
  expect(feedbackBtn).to.exist;
});

it('debe cumplir con la accesibilidad en el modo de contingencia', async () => {
  el.amount = 1000000;
  el._calculateSimulation();
  await el.updateComplete;

  // Validación de prioridad A y AA de la norma UNE 139803 [cite: 236]
  await expect(el).to.be.accessible();
});
});