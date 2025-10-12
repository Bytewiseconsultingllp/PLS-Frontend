"use client"
import { Button } from "@/components/ui/button"
import type { MenuItemType } from "@/types/menu"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { type JSX, useState } from "react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuData: MenuItemType[]
}

export function MobileMenu({ isOpen, onClose, menuData }: MobileMenuProps): JSX.Element {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])

  const toggleItem = (id: number): void => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleCategory = (id: number): void => {
    setExpandedCategories((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Recursive function to render menu items
  const renderMenuItem = (item: MenuItemType, depth = 0): JSX.Element => {
    const isExpanded = expandedItems.includes(item.id)
    const hasChildren = Boolean(item.children && item.children.length > 0)

    return (
      <li key={item.id} className={cn("w-full", depth > 0 ? "ml-4" : "")}>
        <div className="flex items-center justify-between">
          {item.href !== undefined && item.href !== null && !hasChildren ? (
            <Link href={item.href} className="py-3 text-lg w-full text-white" onClick={onClose}>
              {item.title}
            </Link>
          ) : (
            <button
              type="button"
              className="flex items-center justify-between w-full py-3 text-lg text-white"
              onClick={() => hasChildren && toggleItem(item.id)}
            >
              {item.title}
              {hasChildren && (
                <ChevronDown className={cn("h-5 w-5 transition-transform", isExpanded ? "transform rotate-180" : "")} />
              )}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && item.children && (
          <ul className="border-l-2 border-gray-200 mt-1 mb-2">
            {item.children.map((child) => {
              const isCategoryExpanded = expandedCategories.includes(child.id)
              const hasSubChildren = Boolean(child.children && child.children.length > 0)

              return (
                <li key={child.id} className="ml-4 w-full">
                  <div className="flex items-center justify-between">
                    {child.href !== undefined && child.href !== null && !hasSubChildren ? (
                      <Link href={child.href} className="py-2 text-base w-full text-white" onClick={onClose}>
                        {child.title}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="flex items-center justify-between w-full py-2 text-base text-white"
                        onClick={() => hasSubChildren && toggleCategory(child.id)}
                      >
                        {child.title}
                        {hasSubChildren && (
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isCategoryExpanded ? "transform rotate-180" : "",
                            )}
                          />
                        )}
                      </button>
                    )}
                  </div>

                  {hasSubChildren && isCategoryExpanded && child.children && (
                    <ul className="mt-1 mb-2 ml-4">
                      {child.children.map((subItem) => (
                        <li key={subItem.id} className="w-full">
                          <Link
                            href={subItem.href !== undefined ? subItem.href : "#"}
                            className="py-2 text-sm w-full text-white block"
                            onClick={onClose}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </li>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-primary shadow-xl z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-white">
              <Link href="/" onClick={onClose}>
                <Image src="/assets/plogic.png" alt="PLogic Logo" width={120} height={40} className="h-20 w-auto" />
              </Link>
              <button type="button" className="p-2 rounded-md hover:bg-white/10" onClick={onClose}>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            <nav className="p-4 text-white">
              <ul className="space-y-1 text-white">{menuData.map((item) => renderMenuItem(item))}</ul>

              <div className="mt-8 space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-white hover:bg-white/20 text-white"
                  onClick={onClose}
                  asChild
                >
                  <Link href="/get-started">GET STARTED</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white/10"
                  onClick={onClose}
                  asChild
                >
                  <Link href="./getQuote">GET QUOTE</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
