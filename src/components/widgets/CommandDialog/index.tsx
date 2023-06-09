"use client"

import {
  CommandDialog as CommandDialogPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@components/ui/command"
import { useEffect, useState } from "react"
import { SIDEBAR } from "../../../sidebar"
import { useSnapshot } from "valtio"
import { server } from "@states/app"

export function CommandDialog() {
  const [open, setOpen] = useState(false)
  const serverSnapshot = useSnapshot(server)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <CommandDialogPrimitive open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {
              SIDEBAR.map((item) => (
                <>
                  {item.map((item) => (
                    <>
                      <CommandItem key={item.title}>
                        <span>{item.title} <code className="text-gray-400">{item.path}</code></span>
                      </CommandItem>
                      {
                        item.subItems?.map((item) => (
                          <CommandItem key={item.title}>
                            <span>{item.title} <code className="text-gray-400">{item.path}</code></span>
                          </CommandItem>
                        ))
                      }
                    </>
                  ))}
                </>
              ))
            }
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Category">
            {
              server.categories.map((category) => (
                <>
                  <CommandItem key={category.name}>
                    <span>{category.name} <code className="text-gray-400">{category.slug}</code></span>
                  </CommandItem>
                </>
              ))
            }
          </CommandGroup>
        </CommandList>
      </CommandDialogPrimitive>
    </>
  )
}
