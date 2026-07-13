import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/features/landing/landing-page";

export { Footer, Nav } from "@/features/landing/landing-page";
export const Route = createFileRoute("/")({ component: LandingPage });
