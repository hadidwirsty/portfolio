"use client"

import { useRef, type PointerEvent } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { X } from "lucide-react"

import { CertificateCredentialLink } from "@/components/stack/certificate-credential-link"
import {
  CertificateSticker,
  type CertificateRecord,
} from "@/components/stack/certificate-sticker"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CERTIFICATION_ISSUERS,
  formatCourseDuration,
  getCategoryById,
  getCertificateId,
} from "@/lib/certifications-data"
import { useLanguage } from "@/lib/language-context"

function CertificatePaper({ certificate }: { certificate: CertificateRecord }) {
  const reduceMotion = useReducedMotion()
  const tiltX = useSpring(0, { stiffness: 260, damping: 26 })
  const tiltY = useSpring(0, { stiffness: 260, damping: 26 })
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(50)
  const lightOpacity = useSpring(0, { stiffness: 260, damping: 26 })
  const light = useMotionTemplate`radial-gradient(ellipse at ${lightX}% ${lightY}%, rgba(255,255,255,0.65), transparent 62%)`

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - left) / width))
    const y = Math.min(1, Math.max(0, (event.clientY - top) / height))

    tiltX.set((0.5 - y) * 16)
    tiltY.set((x - 0.5) * 18)
    lightX.set(x * 100)
    lightY.set(y * 100)
    lightOpacity.set(1)
  }

  function resetPaper() {
    tiltX.set(0)
    tiltY.set(0)
    lightOpacity.set(0)
  }

  return (
    <div
      aria-hidden="true"
      className="flex w-full min-w-0 items-center px-4 py-6 perspective-distant sm:px-8 sm:py-8"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPaper}
      onPointerCancel={resetPaper}
    >
      <motion.div
        className="mx-auto w-full max-w-[min(35rem,85dvh)] transform-3d"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.div
          className="transform-3d"
          animate={
            reduceMotion
              ? { y: 0, rotateY: 0, rotateZ: 0 }
              : {
                  y: [0, -9, 0, 6, 0],
                  rotateY: [-4, 1, 4, -1, -4],
                  rotateZ: [-1, 0, 1, 0, -1],
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 7,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="relative drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]"
            style={
              reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY }
            }
          >
            <CertificateSticker certificate={certificate} preview />
            {!reduceMotion && (
              <motion.span
                className="certificate-sticker-edge pointer-events-none absolute inset-1"
                style={{ background: light, opacity: lightOpacity }}
              />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function CertificateDetail({
  certificate,
}: {
  certificate: CertificateRecord
}) {
  const { lang } = useLanguage()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const isCourse = "issuerId" in certificate
  const certificateId = isCourse
    ? getCertificateId(certificate)
    : certificate.certificateId
  const completion = isCourse ? certificate.completion : undefined
  const issuerName = isCourse
    ? CERTIFICATION_ISSUERS[certificate.issuerId].name
    : certificate.issuer
  const category = isCourse
    ? getCategoryById(certificate.categoryId)?.title[lang]
    : undefined

  return (
    <DialogContent
      hideCloseButton
      initialFocus={titleRef}
      finalFocus
      backdropClassName="bg-black/90 backdrop-blur-sm motion-reduce:transition-none"
      className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto overscroll-contain rounded-none border-0 bg-transparent px-1 py-3 text-center text-white shadow-none motion-reduce:transition-none sm:max-w-3xl"
    >
      <DialogHeader className="relative px-12 pt-2 text-center sm:px-14">
        <p className="font-mono text-xs font-semibold tracking-wider text-zinc-300 uppercase">
          {issuerName}
        </p>
        <DialogTitle
          ref={titleRef}
          tabIndex={-1}
          className="font-bold wrap-anywhere text-white outline-none"
        >
          {certificate.title}
        </DialogTitle>
        <DialogDescription className={category ? "text-zinc-300" : "sr-only"}>
          {category ??
            (lang === "id" ? "Detail kredensial" : "Credential details")}
        </DialogDescription>
        <DialogClose
          aria-label={lang === "id" ? "Tutup detail" : "Close details"}
          className="absolute top-0 right-0 grid size-11 cursor-pointer place-items-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <X aria-hidden="true" className="size-5" />
        </DialogClose>
      </DialogHeader>

      <CertificatePaper certificate={certificate} />

      <div className="flex min-w-0 flex-col items-center gap-5 px-2 pb-2 sm:px-6">
        <dl className="flex max-w-full flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {certificateId && (
            <div>
              <dt className="text-zinc-300">
                {lang === "id" ? "ID sertifikat" : "Certificate ID"}
              </dt>
              <dd className="font-mono wrap-anywhere">{certificateId}</dd>
            </div>
          )}
          {certificate.issuedAt && (
            <div>
              <dt className="text-zinc-300">
                {lang === "id" ? "Diterbitkan" : "Issued"}
              </dt>
              <dd>
                <time dateTime={certificate.issuedAt}>
                  {certificate.issuedAt}
                </time>
                {completion && (
                  <span className="sr-only"> · {completion.timeUtc} UTC</span>
                )}
              </dd>
            </div>
          )}
          {completion && (
            <>
              <div className="sr-only">
                <dt>{lang === "id" ? "Durasi kursus" : "Course duration"}</dt>
                <dd>
                  {formatCourseDuration(completion.durationMinutes, lang)}
                </dd>
              </div>
              <div className="sr-only">
                <dt>
                  {lang === "id" ? "Keahlian utama" : "Top skills covered"}
                </dt>
                <dd>{completion.skills.join(", ")}</dd>
              </div>
            </>
          )}
          {isCourse && certificate.expiresAt && (
            <div>
              <dt className="text-zinc-300">
                {lang === "id" ? "Berlaku hingga" : "Valid until"}
              </dt>
              <dd>
                <time dateTime={certificate.expiresAt}>
                  {certificate.expiresAt}
                </time>
              </dd>
            </div>
          )}
          {!isCourse && !certificate.issuedAt && (
            <div>
              <dt className="text-zinc-300">
                {lang === "id" ? "Periode" : "Period"}
              </dt>
              <dd>{certificate.period[lang]}</dd>
            </div>
          )}
          {!isCourse && certificate.assessment && (
            <div className="min-w-0">
              <dt className="text-zinc-300">
                {lang === "id" ? "Hasil tes" : "Test result"}
              </dt>
              <dd>
                {certificate.assessment.score} ·{" "}
                {certificate.assessment.level[lang]}
              </dd>
              <dd className="text-xs text-zinc-300">
                {certificate.assessment.skills
                  .map((skill) => skill[lang])
                  .join(" · ")}
              </dd>
            </div>
          )}
          {!isCourse && certificate.internship && (
            <>
              <div className="sr-only">
                <dt>{lang === "id" ? "Posisi magang" : "Internship role"}</dt>
                <dd>
                  {certificate.internship.role} ·{" "}
                  {certificate.internship.organization}
                </dd>
              </div>
              <div className="sr-only">
                <dt>
                  {lang === "id" ? "Periode magang" : "Internship period"}
                </dt>
                <dd>
                  <time dateTime={certificate.internship.startedAt}>
                    {certificate.internship.startedAt}
                  </time>
                  {" – "}
                  <time dateTime={certificate.internship.endedAt}>
                    {certificate.internship.endedAt}
                  </time>
                </dd>
              </div>
              <div className="sr-only">
                <dt>{lang === "id" ? "Hasil magang" : "Internship grade"}</dt>
                <dd>{certificate.internship.grade}</dd>
              </div>
            </>
          )}
        </dl>
        {certificate.credentialUrl ? (
          <CertificateCredentialLink
            certificate={certificate}
            lang={lang}
            className="min-h-11 border-white/20 bg-white/10 text-white hover:border-white/50 hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-black"
          />
        ) : (
          <p className="text-xs text-zinc-300">
            {lang === "id"
              ? "Tautan kredensial belum tersedia"
              : "Credential link unavailable"}
          </p>
        )}
      </div>
    </DialogContent>
  )
}
