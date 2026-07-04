import { DepartmentDeleteDialog } from './departments-delete-dialog'
import { DepartmentForm } from './departments-form'
import { useContexts } from './departments-provider'

export function DepartmentsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useContexts()
  return (
    <>
      <DepartmentForm
        key='department-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <DepartmentForm
            key={`department-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <DepartmentDeleteDialog
            key={`department-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
