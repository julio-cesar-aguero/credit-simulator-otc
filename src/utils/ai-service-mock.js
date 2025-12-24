/**
 * 🔌 BBVA GenUI Service (Production Client)
 * Conecta con el Backend Local para obtener la UI.
 */
export class AiServiceMock {

  static async getSchemaForUser(userProfile, intent) {
    console.log(`🌐 Llamando al Backend para perfil: ${userProfile}...`);

    try {
      // 🚀 LLAMADA REAL HTTP
      const response = await fetch('http://localhost:3000/api/generate-ui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          userProfile: userProfile,
          intent: intent // (Opcional, si el back lo usa)
        })
      });

      if (!response.ok) throw new Error('Error en el servidor');

      const data = await response.json();
      console.log("✅ Configuración recibida del servidor.");
      return data;

    } catch (error) {
      console.error("❌ Error de conexión con Backend:", error);
      throw error; // Esto disparará tu Resiliencia en el DMS
    }
  }
}