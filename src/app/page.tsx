import Header from '@/components/header'
import { Separator } from '@/components/ui/separator'

export default function Home () {
  return (
    <main className='max-w-5xl m-auto px-4'>
      <Header />
      <section className='mt-10' id='funkcje'>
        <div className='w-full'>
          <h1 className='text-2xl p-8 font-semibold text-center'>
            Możliwości, które oferujemy:
          </h1>
        </div>
        <h2 className='p-4 text-center text-xl font-medium'>
          <span className='text-emerald-500 text-xl'>✔</span> Możliwość
          skracania linków
        </h2>
        <Separator orientation='horizontal' className='' />
        <h4 className='p-4 text-center text-xl font-medium'>
          <span className='text-emerald-500 text-xl'>✔</span> Analityka linków
          możesz śledzić ilość wejść w twój link
        </h4>
        <Separator orientation='horizontal' className='' />
        <h5 className='p-4 text-center text-xl font-medium'>
          <span className='text-emerald-500 text-xl'>✔</span> Możliwość
          podłączenia swojej aplikacji za pomocą API.
        </h5>
      </section>
      <section className='w-full mt-16' id='cena'>
        <h1 className='text-2xl p-8 font-semibold text-center'>
          Plany, które oferujemy:
        </h1>
        <div className='flex  border border-zinc-200 rounded-md p-4'>
          <div className='border-r border-zinc-200 flex-1 p-4 text-center'>
            <h1 className='text-xl py-6 uppercase font-bold'>Plan Darmowy</h1>
            <p className='text-lg font-semibold p-4'>Cena: 0zł</p>
            <p>Możliwość stworzenia 10 skróconych URL</p>
            <p className='text-red-500'>Brak możliwości korzystania z API.</p>
          </div>
          <div className='flex-1 p-4 text-center'>
            <h1 className='text-xl py-6 uppercase font-bold'>Plan Startowy</h1>
            <p className='text-lg font-semibold p-4'>Cena: 10zł/m</p>
            <p>Możliwość stworzenia 100 skróconych URL</p>
            <p className='text-emerald-600'>
              Możliwość stworzenia 100 skróconych URL za pośrednictwem API.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
