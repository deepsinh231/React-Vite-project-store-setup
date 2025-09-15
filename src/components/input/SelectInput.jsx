"use client";

import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectInput = forwardRef(
  (
    { selected, setSelected, options, placeholder, label, disabled, name },
    ref
  ) => {
    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="flex h-12 w-full justify-between rounded-[6px] border p-3 text-sm text-left"
              disabled={disabled}
            >
              {selected
                ? options.find((o) => o.value === selected)?.label
                : placeholder || "Select option..."}
              <ChevronsUpDown className="ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput
                placeholder={`Search ${label?.toLowerCase() || "options"}...`}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No option found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => setSelected(option.value)}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          selected === option.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <input type="hidden" name={name} value={selected} ref={ref} readOnly />
      </>
    );
  }
);

SelectInput.displayName = "SelectInput";
export default SelectInput;
