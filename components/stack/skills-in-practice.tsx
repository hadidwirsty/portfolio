"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { FeaturePanelBackground } from "@/components/ui/feature-panel-background"
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
    projects: "Proyek terkait",
    related: (name: string) => `Proyek terkait ${name}`,
    count: (count: number) => `${count} proyek`,
  },
  en: {
    title: "Skills in Practice",
    label: "Technology",
    placeholder: "Choose a technology",
    clear: "Clear selection",
    empty: "Choose a technology to see its projects.",
    projects: "Related projects",
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
  const projectsHeadingId = selected
    ? getSkillFragment(selected.id).slice(1)
    : "skills-in-practice-projects"

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
      className="feature-panel grid scroll-mt-20 gap-6 p-6 sm:scroll-mt-24 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
    >
      <FeaturePanelBackground />
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
              <SelectValue className="min-w-0" placeholder={labels.placeholder}>
                <LetterRoll
                  text={selected?.name ?? labels.placeholder}
                  hoverTarget="parent"
                  className="max-w-full truncate"
                />
              </SelectValue>
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
      <section
        aria-labelledby={projectsHeadingId}
        className="flex min-w-0 flex-col rounded-2xl border border-border/50 bg-card/60 p-3 shadow-sm sm:p-4"
      >
        <div role="status" aria-atomic="true" className="sr-only">
          {selected &&
            `${selected.name}: ${labels.count(selected.projects.length)}`}
        </div>
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border/50 pb-2.5">
          <h3
            ref={headingRef}
            id={projectsHeadingId}
            tabIndex={selected ? -1 : undefined}
            className="scroll-mt-20 rounded-sm text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:scroll-mt-24"
          >
            {selected ? labels.related(selected.name) : labels.projects}
          </h3>
          {selected && (
            <span
              aria-hidden="true"
              className="font-mono text-xs text-muted-foreground"
            >
              {labels.count(selected.projects.length)}
            </span>
          )}
        </div>
        <div className="skills-project-mat relative min-h-24 flex-1 rounded-xl border border-border/50 bg-background/50 p-4 sm:p-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 rounded-tl-sm border-t border-l border-border/50"
          />
          {selected ? (
            <motion.ul
              key={selected.id}
              initial={
                reduceMotion || focusRequest ? false : { opacity: 0, y: 6 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative grid gap-2 xl:grid-cols-2"
            >
              {selected.projects.map(({ ref, name }) => (
                <li key={ref} className="min-w-0">
                  <Link
                    href={`/portfolio${getProjectFragment(ref)}`}
                    scroll={false}
                    data-skip-page-transition=""
                    onNavigate={() =>
                      rememberSkillForProjectReturn(window.history, selected.id)
                    }
                    className="group flex h-full min-h-11 items-center justify-between gap-2 rounded-lg border border-border/50 bg-card/90 px-3 py-2 text-sm text-foreground transition-colors hover:border-foreground/30 hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
                  >
                    <span className="min-w-0 flex-1 wrap-break-word">
                      {reduceMotion ? (
                        name
                      ) : (
                        <LetterRoll
                          text={name}
                          hoverTarget="parent"
                          stagger={0.65}
                          duration={0.4}
                          style={{ width: "100%" }}
                        />
                      )}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground"
                    />
                  </Link>
                </li>
              ))}
            </motion.ul>
          ) : (
            <p className="relative w-fit rounded-md bg-background/90 px-2 py-1 text-sm text-muted-foreground">
              {labels.empty}
            </p>
          )}
        </div>
      </section>
    </motion.section>
  )
}
