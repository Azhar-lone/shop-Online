import React from 'react'
import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider
} from "@/components/ui/tooltip"

interface HintPropsTypes {
  children: React.ReactNode;
  label: String;
  asChild?: boolean;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end"
}

const Hint: React.FC<HintPropsTypes> = (
  props
) => {
  return (
    <TooltipProvider>
      <Tooltip
        delayDuration={100}
      >
        <TooltipTrigger asChild={props.asChild}>
          {props.children}
        </TooltipTrigger>

        <TooltipContent
          side={props.side}
          align={props.align}
          className='p-2'
        >
          {props.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint