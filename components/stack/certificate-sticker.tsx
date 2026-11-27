"use client"

import { motion, useReducedMotion } from "framer-motion"

import { DialogTrigger } from "@/components/ui/dialog"
import {
  CERTIFICATION_ISSUERS,
  formatCourseDuration,
  getCategoryById,
  getCertificateId,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"
import { profile } from "@/lib/cv-data"

import type { Lang } from "@/lib/language-context"

import type {
  CertificationItem,
  OtherCredentialItem,
} from "@/lib/certifications-data"

export type CertificateRecord = CertificationItem | OtherCredentialItem

interface CertificateStickerProps {
  certificate: CertificateRecord
  preview?: boolean
  disabled?: boolean
}

function DicodingCertificateArtwork({
  certificate,
  lang,
}: {
  certificate: CertificationItem
  lang: Lang
}) {
  const { certificateId, credentialUrl, issuedAt, expiresAt } = certificate
  const dateFormatter = new Intl.DateTimeFormat(
    lang === "id" ? "id-ID" : "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  )

  return (
    <>
      <span className="sr-only">{CERTIFICATION_ISSUERS.dicoding.name}</span>
      <span className="certificate-miniature-dicoding-body">
        {certificateId && (
          <span className="certificate-miniature-id">{certificateId}</span>
        )}
        <span>{lang === "id" ? "Diberikan kepada" : "Awarded to"}</span>
        <span className="certificate-miniature-recipient">{profile.name}</span>
        <span className="certificate-miniature-dicoding-course-label">
          {lang === "id"
            ? "Atas kelulusannya pada kelas"
            : "For completing the course"}
        </span>
        <span className="certificate-miniature-title">{certificate.title}</span>
      </span>
      {issuedAt && (
        <time
          className="certificate-miniature-dicoding-date"
          dateTime={issuedAt}
        >
          {dateFormatter.format(new Date(issuedAt))}
        </time>
      )}
      {(credentialUrl || expiresAt) && (
        <span className="certificate-miniature-dicoding-verification">
          {credentialUrl && (
            <>
              {certificateId && (
                <span
                  aria-hidden="true"
                  className="certificate-miniature-dicoding-qr"
                  style={{
                    backgroundImage: `url("/images/sertifikat/dicoding-qr/${encodeURIComponent(certificateId)}.webp")`,
                  }}
                />
              )}
              <strong>
                {lang === "id" ? "Verifikasi Sertifikat" : "Verify Certificate"}
              </strong>
              <span>{credentialUrl.replace(/^https:\/\/www\./, "")}</span>
            </>
          )}
          {expiresAt && (
            <span>
              {lang === "id" ? "Berlaku hingga" : "Valid until"}{" "}
              <time dateTime={expiresAt}>
                {dateFormatter.format(new Date(expiresAt))}
              </time>
            </span>
          )}
        </span>
      )}
    </>
  )
}

function LinkedInCertificateArtwork({
  certificate,
  issueDate,
  lang,
}: {
  certificate: CertificationItem
  issueDate: string | null
  lang: Lang
}) {
  const { completion, issuedAt } = certificate
  const certificateId = getCertificateId(certificate)
  const category = getCategoryById(certificate.categoryId)?.title[lang]

  return (
    <>
      <span
        className="certificate-miniature-linkedin-wordmark"
        role="img"
        aria-label={CERTIFICATION_ISSUERS.linkedin.name}
      />
      <span className="certificate-miniature-title">{certificate.title}</span>
      <span className="certificate-miniature-linkedin-completion">
        <span>
          {lang === "id" ? "Kursus diselesaikan oleh" : "Course completed by"}{" "}
          {profile.name}
        </span>
        {issuedAt && (
          <span>
            <time
              dateTime={
                completion ? `${issuedAt}T${completion.timeUtc}:00Z` : issuedAt
              }
            >
              {issueDate}
              {completion && ` · ${completion.timeUtc} UTC`}
            </time>
            {completion &&
              ` · ${formatCourseDuration(completion.durationMinutes, lang)}`}
          </span>
        )}
      </span>
      {completion ? (
        <span className="certificate-miniature-linkedin-topics">
          <span>{lang === "id" ? "Keahlian utama" : "Top skills covered"}</span>
          <span className="certificate-miniature-linkedin-tags">
            {completion.skills.map((skill) => (
              <span key={skill} className="certificate-miniature-category">
                {skill}
              </span>
            ))}
          </span>
        </span>
      ) : (
        category && (
          <span className="certificate-miniature-category">{category}</span>
        )
      )}
      <span className="certificate-miniature-footer">
        <span className="certificate-miniature-linkedin-signer">
          <span
            aria-hidden="true"
            className="certificate-miniature-linkedin-signature"
          />
          <span>Head of Global Content, Learning</span>
        </span>
        <span aria-hidden="true" className="certificate-miniature-seal" />
        {certificateId && (
          <span className="certificate-miniature-linkedin-id">
            {lang === "id" ? "ID sertifikat" : "Certificate ID"}:{" "}
            {certificateId}
          </span>
        )}
      </span>
    </>
  )
}

function EfSetCertificateArtwork({
  assessment,
  issuedAt,
  issueDate,
  lang,
}: {
  assessment: NonNullable<OtherCredentialItem["assessment"]>
  issuedAt?: string
  issueDate: string | null
  lang: Lang
}) {
  return (
    <>
      <span className="certificate-miniature-efset-header">
        <span
          className="certificate-miniature-efset-wordmark"
          role="img"
          aria-label="EF SET"
        />
        <span className="certificate-miniature-title">
          {lang === "id" ? "Sertifikat Bahasa Inggris" : "English Certificate"}
        </span>
      </span>
      <span className="certificate-miniature-recipient">{profile.name}</span>
      <span className="certificate-miniature-efset-statement">
        <span>
          {lang === "id"
            ? "Telah menyelesaikan tes EF SET"
            : "has successfully completed the EF SET Certificate"}
        </span>
        <span>
          {lang === "id"
            ? "dan mencapai tingkat bahasa Inggris:"
            : "and has earned level:"}
        </span>
      </span>
      <span
        className="certificate-miniature-efset-badge"
        role="img"
        aria-label={`${assessment.score} · ${assessment.level[lang]}`}
      />
      <span className="certificate-miniature-efset-skills">
        {assessment.skills.map((skill) => (
          <span key={skill.en}>
            <span
              className="certificate-miniature-efset-check"
              aria-hidden="true"
            >
              ✓
            </span>
            {skill[lang]}
          </span>
        ))}
      </span>
      {issuedAt && (
        <span className="certificate-miniature-footer">
          <strong>{lang === "id" ? "Diterbitkan pada" : "Awarded on"} </strong>
          <time dateTime={issuedAt}>{issueDate}</time>
        </span>
      )}
    </>
  )
}

function MagentaCertificateArtwork({
  certificate,
  internship,
  lang,
}: {
  certificate: OtherCredentialItem
  internship: NonNullable<OtherCredentialItem["internship"]>
  lang: Lang
}) {
  const dateFormatter = new Intl.DateTimeFormat(
    lang === "id" ? "id-ID" : "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  )
  const startDate = (
    <time dateTime={internship.startedAt}>
      {dateFormatter.format(new Date(internship.startedAt))}
    </time>
  )
  const endDate = (
    <time dateTime={internship.endedAt}>
      {dateFormatter.format(new Date(internship.endedAt))}
    </time>
  )
  const organization = <strong>{internship.organization}</strong>
  const role = <strong>{internship.role}</strong>
  const grade = <strong>{internship.grade}</strong>

  return (
    <>
      <span
        className="certificate-miniature-magenta-logos"
        role="img"
        aria-label="BUMN untuk Indonesia, FHCI, Kementerian BUMN, MAGENTA, Telkom Indonesia"
      />
      <span className="certificate-miniature-magenta-heading">
        <span className="certificate-miniature-diploma">
          {lang === "id" ? "Sertifikat" : "Certificate"}
        </span>
        {certificate.certificateId && (
          <span>
            {lang === "id" ? "Nomor" : "No."} {certificate.certificateId}
          </span>
        )}
      </span>
      <span className="certificate-miniature-magenta-recipient">
        <span>{lang === "id" ? "Diberikan kepada" : "Awarded to"}</span>
        <span className="certificate-miniature-recipient">{profile.name}</span>
      </span>
      <span className="certificate-miniature-magenta-description">
        <span>{lang === "id" ? "Telah melaksanakan" : "Has completed"}</span>
        <span>
          {lang === "id" ? (
            <>
              MAGANG GENERASI BERTALENTA BUMN (MAGENTA BUMN) di {organization}{" "}
              pada posisi {role}, mulai dari tanggal {startDate} sampai dengan
              tanggal {endDate} dengan hasil {grade}
            </>
          ) : (
            <>
              The MAGENTA BUMN internship program at {organization} as a {role},
              from {startDate} to {endDate}, with a grade of {grade}
            </>
          )}
        </span>
      </span>
      <span className="certificate-miniature-footer">
        <span className="certificate-miniature-magenta-signoff">
          {certificate.issuedAt && (
            <span className="certificate-miniature-magenta-issued">
              Jakarta,{" "}
              <time dateTime={certificate.issuedAt}>
                {dateFormatter.format(new Date(certificate.issuedAt))}
              </time>
            </span>
          )}
          <span>
            {lang === "id"
              ? "Kementerian BUMN"
              : "Ministry of State-Owned Enterprises"}
          </span>
          <span
            aria-hidden="true"
            className="certificate-miniature-magenta-signature"
          />
          <strong>Erick Thohir</strong>
          <span>
            {lang === "id"
              ? "Menteri BUMN"
              : "Minister of State-Owned Enterprises"}
          </span>
        </span>
        {certificate.credentialUrl && (
          <span className="certificate-miniature-magenta-verification">
            <span>
              {lang === "id"
                ? "QR Verifikasi Sertifikat"
                : "Certificate Verification QR"}
            </span>
            <span
              aria-hidden="true"
              className="certificate-miniature-magenta-qr"
            />
          </span>
        )}
      </span>
    </>
  )
}

export function CertificateSticker({
  certificate,
  preview = false,
  disabled = false,
}: CertificateStickerProps) {
  const { lang } = useLanguage()
  const reduceMotion = useReducedMotion()
  const canAnimate = !disabled && !reduceMotion
  const isCourse = "issuerId" in certificate
  const variant = isCourse ? certificate.issuerId : certificate.id
  const issuedAt = certificate.issuedAt
  const dateLocale =
    lang === "id" ? "id-ID" : variant === "other-ef-set" ? "en-GB" : "en-US"
  const issueDate = issuedAt
    ? new Intl.DateTimeFormat(dateLocale, {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(issuedAt))
    : null

  const artwork = isCourse ? (
    certificate.issuerId === "dicoding" ? (
      <DicodingCertificateArtwork certificate={certificate} lang={lang} />
    ) : (
      <LinkedInCertificateArtwork
        certificate={certificate}
        issueDate={issueDate}
        lang={lang}
      />
    )
  ) : variant === "other-ef-set" && certificate.assessment ? (
    <EfSetCertificateArtwork
      assessment={certificate.assessment}
      issuedAt={issuedAt}
      issueDate={issueDate}
      lang={lang}
    />
  ) : variant === "other-fhci-magenta" && certificate.internship ? (
    <MagentaCertificateArtwork
      certificate={certificate}
      internship={certificate.internship}
      lang={lang}
    />
  ) : (
    <>
      <span className="certificate-miniature-brand">{certificate.issuer}</span>
      <span className="certificate-miniature-title">{certificate.title}</span>
      <span className="certificate-miniature-recipient">
        <span className="block font-mono text-[0.7em] font-normal text-slate-600">
          {lang === "id" ? "Diberikan kepada" : "Awarded to"}
        </span>
        {profile.name}
      </span>
      <span className="certificate-miniature-footer">
        {issuedAt ? (
          <time dateTime={issuedAt}>{issueDate}</time>
        ) : (
          <span>{certificate.period[lang]}</span>
        )}
      </span>
    </>
  )

  const paper = (
    <span className="certificate-sticker-edge certificate-miniature-trim">
      <span className="certificate-sticker-edge certificate-miniature-frame">
        <span className="certificate-sticker-edge certificate-miniature-paper">
          {artwork}
        </span>
      </span>
    </span>
  )

  if (preview) {
    return (
      <span
        data-certificate-sticker={variant}
        className="certificate-miniature"
      >
        {paper}
      </span>
    )
  }

  return (
    <DialogTrigger
      payload={certificate}
      data-certificate-sticker={variant}
      aria-label={certificate.title}
      disabled={disabled}
      className="certificate-miniature text-left outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring enabled:cursor-pointer"
      render={
        <motion.button
          whileHover={canAnimate ? { y: -4 } : undefined}
          whileTap={canAnimate ? { y: 0, scale: 0.97 } : undefined}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        />
      }
    >
      {paper}
    </DialogTrigger>
  )
}
