import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import LoginDiscordButton from './LoginDiscordButton'
import { Button } from './ui/button'

export default function LoginModal () {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Zaloguj</Button>
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
