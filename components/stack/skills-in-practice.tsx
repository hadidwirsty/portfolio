"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import { LetterRoll } from "@/components/ui/letter-roll"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  focusContextualTarget,
  replaceContextualFragment,
  useContextualFragment,
} from "@/hooks/use-contextual-fragment"
import { useLanguage } from "@/lib/language-context"
import type { PublicSkillsInPractice } from "@/lib/skills-in-practice-data"
import {
  getProjectFragment,
  getSkillFragment,
  readSkillFragment,
  rememberSkillForProjectReturn,
  SKILL_FRAGMENT_PREFIX,
  takeSkillForProjectReturn,
} from "@/lib/skills-portfolio-navigation"

const copy = {
  id: {
    title: "Teknologi dalam Praktik",
    label: "Teknologi",
    placeholder: "Pilih teknologi",
    clear: "Hapus pilihan",
    empty: "Pilih teknologi untuk melihat proyek terkait.",
    related: (name: string) => `Proyek terkait ${name}`,
    count: (count: number) => `${count} proyek`,
  },
  en: {
    title: "Skills in Practice",
    label: "Technology",
    placeholder: "Choose a technology",
    clear: "Clear selection",
    empty: "Choose a technology to see its projects.",
    related: (name: string) => `Projects using ${name}`,
    count: (count: number) =>
      `${count} ${count === 1 ? "project" : "projects"}`,
  },
}

export function SkillsInPractice({
  categories,
}: {
  categories: PublicSkillsInPractice
}) {
  const { lang } = useLanguage()
  const reduceMotion = useReducedMotion()
  const labels = copy[lang]
  const skills = React.useMemo(
    () => categories.flatMap(({ skills }) => skills),
    [categories]
  )
  const techIds = React.useMemo(
    () => new Set(skills.map(({ id }) => id)),
    [skills]
  )
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [focusRequest, setFocusRequest] = React.useState<{ id: string } | null>(
    null
  )
  const headingRef = React.useRef<HTMLHeadingElement>(null)
  const selected = skills.find(({ id }) => id === selectedId)

  useContextualFragment("/stack", (fragment) => {
    const hasSkillFragment = fragment.startsWith(SKILL_FRAGMENT_PREFIX)
    const id = hasSkillFragment
      ? readSkillFragment(fragment, techIds)
      : takeSkillForProjectReturn(window.history)
    const validId = id !== null && techIds.has(id) ? id : null
    setSelectedId(validId)
    setFocusRequest(validId ? { id: validId } : null)
    if (hasSkillFragment) {
      // A Portfolio badge can select a skill for this visit without persisting it on reload.
      replaceContextualFragment("")
    }
  })

  React.useEffect(() => {
    if (!focusRequest || focusRequest.id !== selectedId || !headingRef.current)
      return
    focusContextualTarget(headingRef.current)
  }, [focusRequest, selectedId])

  const selectTechnology = (id: string | null) => {
    setSelectedId(id !== null && techIds.has(id) ? id : null)
    setFocusRequest(null)
  }

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      id="skills-in-practice"
      aria-labelledby="skills-in-practice-heading"
      className="relative isolate grid scroll-mt-20 gap-6 rounded-3xl border border-border/50 bg-linear-to-br from-card via-card/50 to-background p-6 shadow-xs sm:scroll-mt-24 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-2 -z-10 rounded-[inherit] border border-dashed border-border/50 sm:inset-3"
      />

      <div className="space-y-5">
        <h2
          id="skills-in-practice-heading"
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {labels.title}
        </h2>

        <div className="flex max-w-xs flex-col gap-2">
          <label
            id="skills-in-practice-technology-label"
            htmlFor="skills-in-practice-technology"
            className="font-mono text-xs font-medium"
          >
            {labels.label}
          </label>
          <Select
            items={[
              { value: "", label: labels.clear },
              ...skills.map(({ id, name }) => ({ value: id, label: name })),
            ]}
            value={selectedId}
            onValueChange={selectTechnology}
          >
            <SelectTrigger
              id="skills-in-practice-technology"
              aria-labelledby="skills-in-practice-technology-label"
              className="min-h-11 w-full bg-background px-3"
            >
              <SelectValue placeholder={labels.placeholder} />
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              {selected && (
                <SelectGroup>
                  <SelectItem value="">{labels.clear}</SelectItem>
                </SelectGroup>
              )}
              {categories.map(({ id, title, skills }, index) => (
                <React.Fragment key={id}>
                  {(selected || index > 0) && <SelectSeparator />}
                  <SelectGroup>
                    <SelectLabel>{title[lang]}</SelectLabel>
                    {skills.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="max-w-2xl min-w-0 xl:max-w-none">
        <div role="status" aria-atomic="true" className="sr-only">
          {selected &&
            `${selected.name}: ${labels.count(selected.projects.length)}`}
        </div>
        {selected ? (
          <motion.div
            key={selected.id}
            initial={
              reduceMotion || focusRequest ? false : { opacity: 0, y: 6 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3
                ref={headingRef}
                id={getSkillFragment(selected.id).slice(1)}
                tabIndex={-1}
                className="scroll-mt-20 rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:scroll-mt-24"
              >
                {labels.related(selected.name)}
              </h3>
              <span
                aria-hidden="true"
                className="font-mono text-xs text-muted-foreground"
              >
                {labels.count(selected.projects.length)}
              </span>
            </div>
            <ul className="xl:grid xl:grid-cols-2 xl:gap-x-6">
              {selected.projects.map(({ ref, name }) => (
                <li key={ref}>
                  <Link
                    href={`/portfolio${getProjectFragment(ref)}`}
                    scroll={false}
                    data-skip-page-transition=""
                    onNavigate={() =>
                      rememberSkillForProjectReturn(window.history, selected.id)
                    }
                    className="group flex min-h-11 w-fit max-w-full items-center gap-2 rounded-sm py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {reduceMotion ? (
                      <span className="min-w-0 wrap-break-word">{name}</span>
                    ) : (
                      <LetterRoll
                        text={name}
                        hoverTarget="parent"
                        stagger={0.65}
                        duration={0.4}
                        className="min-w-0"
                        style={{ width: "100%" }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <p className="text-sm text-muted-foreground">{labels.empty}</p>
        )}
      </div>
    </motion.section>
  )
}
