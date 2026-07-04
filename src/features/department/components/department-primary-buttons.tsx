import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useContexts } from './departments-provider'

export function DepartmentsPrimaryButtons() {
  const { setOpen } = useContexts()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Department</span> <Plus size={18} />
      </Button>
    </div>
  )
}
