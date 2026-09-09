export interface Lead {
  /** Obligatoriska: det enda som krävs för att boka. */
  webbplats: string;
  namn: string;
  epost: string;
  /** Frivilliga: hjälper oss förbereda mötet, blockerar aldrig bokningen. */
  bransch: string;
  /** Flerval — vad besökaren vill uppnå. Kan vara tom. */
  mal: string[];
  beskrivning: string;
}

/**
 * ─────────────────────────────────────────────────────────────
 * TODO: KOPPLA IN BACKEND HÄR
 * ─────────────────────────────────────────────────────────────
 * Detta är den enda plats i kodbasen som behöver ändras när ni
 * bestämt var leads ska landa. Formuläret (LeadForm.astro) gör
 * inget annat än att anropa den här funktionen.
 *
 * Alternativ 0 — Bokningsverktyg (Cal.com, Calendly, Tally):
 *   Formuläret bokar ett möte. Vill ni att besökaren väljer tid direkt
 *   i stället för att vi återkommer med förslag, är det här den enda
 *   plats som behöver bytas — antingen POSTa hit och boka via API, eller
 *   ersätt formuläret med verktygets inbäddning.
 *
 * Alternativ 1 — Formspree / Tally / Web3Forms (ingen backend):
 *   const res = await fetch("https://formspree.io/f/DITT_ID", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json", Accept: "application/json" },
 *     body: JSON.stringify(lead),
 *   });
 *   if (!res.ok) throw new Error("Formspree svarade " + res.status);
 *
 * Alternativ 2 — Astro API-route + Resend:
 *   Lägg till en SSR-adapter (npx astro add vercel), skapa
 *   src/pages/api/lead.ts som mejlar leaden, och POSTa hit:
 *   const res = await fetch("/api/lead", { ... });
 *
 * Tills dess: funktionen låtsas lyckas efter en kort fördröjning
 * så att hela UI-flödet går att testa.
 */
export async function submitLead(lead: Lead): Promise<void> {
  if (import.meta.env.DEV) {
    console.info("[submitLead] Ingen backend inkopplad ännu. Lead:", lead);
  }

  await new Promise((resolve) => setTimeout(resolve, 700));

  // Kasta ett fel här för att testa felläget i UI:t:
  // throw new Error("Testfel");
}
