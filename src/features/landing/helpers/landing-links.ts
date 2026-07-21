export const WHATSAPP_URL = `https://wa.me/5517988311000?text=${encodeURIComponent("Olá! Gostaria de conhecer os equipamentos disponíveis.")}`;
export const INSTAGRAM_URL = "https://www.instagram.com/consultorasfitness";
export const EMAIL = "ajsardinhaf@gmail.com";
export const productWhatsappUrl = (name: string, category: string) =>
  `https://wa.me/5517988311000?text=${encodeURIComponent(`Olá Antônio, gostaria de saber se ${name} da categoria ${category} está disponivel!`)}`;
