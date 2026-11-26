import { ExternalLink } from "lucide-react"

import type { CertificationItem } from "@/lib/certifications-data"

interface CertificateCredentialLinkProps {
  certificate: Pick<CertificationItem, "title" | "credentialUrl">
  lang: "id" | "en"
}

export function CertificateCredentialLink({
  certificate,
  lang,
}: CertificateCredentialLinkProps) {
  if (!certificate.credentialUrl) return null

  const label = lang === "id" ? "Lihat sertifikat" : "Show credential"
  const newTabLabel = lang === "id" ? "buka di tab baru" : "opens in a new tab"

  return (
    <a
      href={certificate.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${certificate.title} (${newTabLabel})`}
      className="inline-flex w-fit items-center gap-2 rounded-lg border border-border/60 bg-primary/10 px-3 py-2 font-mono text-xs font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {label}
      <ExternalLink aria-hidden="true" className="size-3.5 shrink-0" />
    </a>
  )
}
