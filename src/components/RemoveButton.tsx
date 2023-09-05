'use client'

import { handleRemove } from '@/actions/RemoveLink'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

type RemoveButtonTypes = {
  linkId: string
}

export default function RemoveButton ({ linkId }: RemoveButtonTypes) {
  const removeEvent = () => {
    handleRemove(String(linkId))
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className='bg-red-400 text-white px-4 py-2 rounded-md hover:opacity-80'>
            Usuń
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy jesteś tego pewny?</AlertDialogTitle>
            <AlertDialogDescription>
              Nie można cofnąć usunięcia linku. Link zostanie utracony wraz z
              jego analityką!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-400 hover:bg-red-500'
              onClick={removeEvent}
            >
              Kontynuuj
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
