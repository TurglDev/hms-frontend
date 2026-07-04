import type { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTableFilter<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <Input
        placeholder="Search..."
        value={(table.getState().globalFilter as string) ?? ''}
        onChange={(event) => table.setGlobalFilter(event.target.value)}
        className="max-w-sm"
    />
  )
}
