"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Square from "../ui/square";

type OptionType = {
  id: string | number;
  image_url: string | null;
  name: string | null;
};

type DropdownSelectType = {
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name: string;
};

const DropdownSelect: React.FC<DropdownSelectType> = ({
  options,
  value,
  onChange,
  placeholder,
  name,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const selectedOption = options?.find(
    (option) => option.id.toString() === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
        >
          {value ? (
            <span className="flex min-w-0 items-center gap-2">
              <Square className="bg-indigo-400/20 text-indigo-500">
                {selectedOption?.image_url ? (
                  <img
                    className="object-cover size-full"
                    src={selectedOption.image_url}
                  />
                ) : (
                  selectedOption?.name?.slice(0, 2)
                )}
              </Square>
              <span className="truncate">{selectedOption?.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown
            size={16}
            strokeWidth={2}
            className="shrink-0 text-muted-foreground/80"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder={`Search ${name}...`} />
          <CommandList>
            <CommandEmpty>No {name} found.</CommandEmpty>
            {options &&
              options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id.toString()}
                  keywords={[option.name!]}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Square className="bg-indigo-400/20 text-indigo-500">
                    {option.image_url ? (
                      <img
                        className="object-cover size-full"
                        src={option.image_url}
                      />
                    ) : (
                      option.name?.slice(0, 2)
                    )}
                  </Square>
                  {option.name}
                  {value === option.id.toString() && (
                    <Check size={16} strokeWidth={2} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DropdownSelect;
