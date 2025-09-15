"use client";

import React, { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const DateInput = forwardRef(
  ({ selected, setSelected, placeholder, disabled, name }, ref) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "flex h-12 w-full items-center justify-between rounded-[6px] border p-3 text-sm text-left",
                !selected && "text-muted-foreground"
              )}
              disabled={disabled}
            >
              {selected
                ? format(new Date(selected), "dd/MM/yyyy")
                : placeholder || "Pick a date"}
              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={selected ? new Date(selected) : undefined}
              onSelect={(date) => {
                if (!date) return;
                setSelected(date.toISOString());
                setOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input type="hidden" name={name} value={selected} ref={ref} readOnly />
      </>
    );
  }
);

DateInput.displayName = "DateInput";
export default DateInput;
