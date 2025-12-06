import { LitElement } from 'lit';

/**
 * Mock de CellsPage para entorno público.
 * Permite usar la arquitectura corporativa sin dependencias privadas.
 */
export class CellsPage extends LitElement {
  // Simulación del canal de comunicación (Publish/Subscribe)
  subscribe(channel, event, callback) {
    console.log(`📡 [Mock] Suscrito a ${channel}:${event}`);
  }

  publish(channel, event, payload) {
    console.log(`📣 [Mock] Publicando en ${channel}:${event}`, payload);
  }

  // IMPORTANTE: No implementamos createRenderRoot para mantener el Shadow DOM activo
}