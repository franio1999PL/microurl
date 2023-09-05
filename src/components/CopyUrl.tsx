'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

type Props = {
  url: string
}

export default function CopyUrl ({ url }: Props) {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('Tekst został skopiowany do schowka: ', url)
        // Tutaj możesz dodać powiadomienie lub inne działania po skopiowaniu
      })
      .catch(err => {
        console.error('Błąd podczas kopiowania do schowka: ', err)
      })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={copyToClipboard}>
          Kliknij aby skopiować
        </TooltipTrigger>
        <TooltipContent>
          <p>{url}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
