"use client";

import {
  CommandDialog as CommandDialogPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@components/ui/command";
import { useEffect, useState } from "react";
import { SIDEBAR } from "../../../sidebar";
import { useSnapshot } from "valtio";
import { server } from "@states/app";

export function CommandDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialogPrimitive
        open={open}
        onOpenChange={setOpen}
        onCommandKeyDownCapture={() => {
          setOpen(false);
        }}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Pages">
            {SIDEBAR.map((item) => (
              <>
                {item.map((item) => (
                  <>
                    <CommandItem value={item.path} key={item.title}>
                      <span>
                        {item.title}{" "}
                        <code className="text-gray-400">{item.path}</code>
                      </span>
                    </CommandItem>
                    {item.subItems?.map((item) => (
                      <CommandItem value={item.path} key={item.title}>
                        <span>
                          {item.title}{" "}
                          <code className="text-gray-400">{item.path}</code>
                        </span>
                      </CommandItem>
                    ))}
                  </>
                ))}
              </>
            ))}
          </CommandGroup>
          <CommandGroup heading="Category">
            {server.categories.map((category, index) => (
              <>
                <CommandItem 
                value={"/categories"}
                key={index}>
                  <span
                    onClick={() => {
                      console.log(category);
                    }}
                  >
                    {category.name}{" "}
                    <code className="text-gray-400">{category.slug}</code>
                  </span>
                </CommandItem>
              </>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialogPrimitive>
    </>
  );
}
