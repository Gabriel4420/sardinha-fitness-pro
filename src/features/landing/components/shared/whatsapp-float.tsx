import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "../../helpers/landing-links";
export function WhatsFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
      <span className="relative grid place-items-center w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:scale-110 transition-transform">
        <MessageCircle className="w-6 h-6" />
      </span>
    </a>
  );
}
