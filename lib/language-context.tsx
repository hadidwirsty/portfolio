"use client"

import * as React from "react"

type Lang = "id" | "en"

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "cv-lang"

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("id")

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "id" || stored === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored)
      return
    }
    const browserLang = window.navigator.language?.toLowerCase() ?? ""
    if (!browserLang.startsWith("id")) {
      setLangState("en")
    }
  }, [])

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleLang = React.useCallback(() => {
    setLangState((prev) => {
      const next = prev === "id" ? "en" : "id"
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const value = React.useMemo(
    () => ({ lang, setLang, toggleLang }),
    [lang, setLang, toggleLang]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

function useT<T>(entry?: Record<Lang, T> | null): T {
  const { lang } = useLanguage()
  if (!entry) return "" as unknown as T
  return entry[lang]
}

export { LanguageProvider, useLanguage, useT }
export type { Lang }
