import { useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender, ColumnDef, SortingState, ColumnFiltersState } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useLlmLinks, useUpdateLlmLink, useDeleteLlmLink } from '@/hooks/useLlmLinks'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'

export default function LlmLinksTablePage() {
  const { data = [], isLoading, error, refetch } = useLlmLinks()
  const updateMutation = useUpdateLlmLink()
  const deleteMutation = useDeleteLlmLink()
  const { toast } = useToast()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row, getValue }) => (
        <InlineTextCell
          value={getValue<string>()}
          onCommit={async (val) => handleUpdate(row.original.id, { name: val })}
        />
      )
    },
    {
      accessorKey: 'url',
      header: 'URL',
      cell: ({ row, getValue }) => (
        <InlineTextCell
          value={getValue<string>()}
          onCommit={async (val) => handleUpdate(row.original.id, { url: val })}
        />
      )
    },
    {
      accessorKey: 'model',
      header: 'Model',
      cell: ({ row, getValue }) => (
        <InlineTextCell
          value={getValue<string>()}
          onCommit={async (val) => handleUpdate(row.original.id, { model: val })}
        />
      )
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row, getValue }) => (
        <InlineTextCell
          value={getValue<string>()}
          onCommit={async (val) => handleUpdate(row.original.id, { description: val })}
        />
      )
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row, getValue }) => (
        <InlineArrayCell
          value={(getValue<string[] | null>() ?? [])}
          placeholder="cat1, cat2"
          onCommit={async (val) => handleUpdate(row.original.id, { category: val })}
        />
      )
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row, getValue }) => (
        <InlineArrayCell
          value={(getValue<string[] | null>() ?? [])}
          placeholder="tag1, tag2"
          onCommit={async (val) => handleUpdate(row.original.id, { tags: val })}
        />
      )
    },
    {
      accessorKey: 'isPopular',
      header: 'Popular',
      cell: ({ row, getValue }) => (
        <Checkbox
          checked={Boolean(getValue<boolean>())}
          onCheckedChange={async (checked) => handleUpdate(row.original.id, { isPopular: Boolean(checked) })}
        />
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(row.original.url)}
          >Copy URL</Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => handleDelete(row.original.id)}
          >Delete</Button>
        </div>
      )
    }
  ], [])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  async function handleUpdate(id: string, updates: any) {
    try {
      await updateMutation.mutateAsync({ id, ...updates })
      toast({ title: 'Updated', description: 'Row updated successfully' })
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Update failed', description: e?.message || 'Error updating row' })
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteMutation.mutateAsync(id)
      toast({ title: 'Deleted', description: 'Row deleted successfully' })
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Delete failed', description: e?.message || 'Error deleting row' })
    }
  }

  if (isLoading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6">Failed to load</div>

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">LLM Links Table</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>Refresh</Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          <Input
            placeholder="Filter by model..."
            value={(table.getColumn('model')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('model')?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer select-none">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: ' ▲', desc: ' ▼' }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

function InlineTextCell({ value, onCommit }: { value: string | null; onCommit: (v: string) => void }) {
  const [val, setVal] = useState(value ?? '')
  return (
    <Input
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => onCommit(val)}
    />
  )
}

function InlineArrayCell({ value, onCommit, placeholder }: { value: string[]; onCommit: (v: string[]) => void; placeholder?: string }) {
  const [text, setText] = useState((value ?? []).join(', '))
  return (
    <Input
      value={text}
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => onCommit(text.split(',').map(s => s.trim()).filter(Boolean))}
    />
  )
}


