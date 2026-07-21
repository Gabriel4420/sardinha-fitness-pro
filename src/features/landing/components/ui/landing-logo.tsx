import { default as logoDarkImg, default as logoImg } from "@/assets/Logo.png";
export function LandingLogo({ className }: { className: string }) {
  const alt = "Antônio Sardinha - Consultor de Equipamentos Fitness";

  return (
    <>
      <img src={logoImg} alt={alt} className={`${className} rounded-full dark:hidden`} />
      <img src={logoDarkImg} alt={alt} className={`${className} rounded-full hidden dark:block`} />
    </>
  );
}
