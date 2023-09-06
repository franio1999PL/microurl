import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import LoginDiscordButton from './LoginDiscordButton'

export default function LoginModal () {
  return (
    <Dialog>
      <DialogTrigger className='bg-black text-slate-50 py-2 px-4 rounded-md hover:opacity-80'>
        Zaloguj
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='p-4 flex flex-col items-center justify-center'>
            Wybierz opcje logowania
          </DialogTitle>
          <DialogDescription className='p-4 flex flex-col items-center justify-center'>
            <LoginDiscordButton />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
