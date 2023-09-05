import RemoveButton from '@/components/RemoveButton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export default function TableOld ({ links }: { links: any }) {
  return (
    <table className='flex flex-col w-full border-collapse border border-slate-200 shadow-md'>
      <thead className='w-full bg-emerald-400 text-slate-500'>
        <tr className='w-full flex text-center'>
          <th className='border border-slate-600 flex-1 p-4'>#</th>
          <th className='border border-slate-600 flex-1 p-4'>Długie Url</th>
          <th className='border border-slate-600 flex-1 p-4'>Skrócone Url</th>
          <th className='border border-slate-600 flex-1 p-4'>Ilość Wejść</th>
          <th className='border border-slate-600 flex-1 p-4'>#</th>
        </tr>
      </thead>
      <tbody className='w-full'>
        {links.length > 0 ? (
          links.map((link: any, index: number) => (
            <tr
              className='w-full flex justify-center items-center text-center'
              key={link.id}
            >
              <td className='border border-slate-700 flex-1 py-4'>
                {index + 1}
              </td>
              <td className='border font-mono border-slate-700 flex-1 py-4'>
                <a href={link.longUrl} target='_blank'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Kliknij lub najedź</TooltipTrigger>
                      <TooltipContent>
                        <p>{link.longUrl}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </a>
              </td>
              <td className='border font-mono border-slate-700 flex-1 py-4'>
                <a
                  href={`${process.env.MAIN_URL}/${link.slug}`}
                  target='_blank'
                  placeholder={`${process.env.MAIN_URL}/${link.slug}`}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>Kliknij lub najedź</TooltipTrigger>
                      <TooltipContent>
                        <p>{`${process.env.MAIN_URL}/${link.slug}`}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </a>
              </td>
              <td className='border border-slate-600 flex-1 py-4'>
                {link.clicks}
              </td>
              <td className='border border-slate-700 flex-1 py-2'>
                <RemoveButton linkId={link.id} />
              </td>
            </tr>
          ))
        ) : (
          <tr className='w-full flex text-center'>
            <td className='border border-slate-700 flex-1 py-4'>
              Brak Skróconych Url
            </td>
          </tr>
        )}
        <tr className='w-full flex text-center'>
          <td className='border border-slate-700 flex-1'>Ohio</td>
          <td className='border border-slate-700 flex-1'>Columbus</td>
          <td className='border border-slate-700 flex-1'>Indianapolis</td>
          <td className='border border-slate-700 flex-1'>Indianapolis</td>
        </tr>
        <tr className='w-full flex text-center'>
          <td className='border border-slate-700 flex-1'>Michigan</td>
          <td className='border border-slate-700 flex-1'>Detroit</td>
          <td className='border border-slate-700 flex-1'>Indianapolis</td>
          <td className='border border-slate-700 flex-1'>Indianapolis</td>
        </tr>
      </tbody>
    </table>
  )
}
