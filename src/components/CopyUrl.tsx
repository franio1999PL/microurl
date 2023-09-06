'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

type Props = {
  url: string
  long?: boolean
}

export default function CopyUrl ({ url, long }: Props) {
  function shortString (text: string, maksymalnaDlugosc: number) {
    if (text.length <= maksymalnaDlugosc) {
      return text
    } else {
      return text.slice(0, maksymalnaDlugosc) + '...'
    }
  }

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
          {long ? shortString(url, 32) : 'Kliknij aby skopiować'}
        </TooltipTrigger>
        <TooltipContent>
          <p>{url}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
