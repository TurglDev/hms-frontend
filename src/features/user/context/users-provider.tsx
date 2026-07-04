import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import type { User } from '../types/user.types'

type UsersDialogType = 
  'add-user' 
  | 'edit-user' 
  | 'reset-password' 
  | 'assign-department' 
  | 'add-address' 
  | 'edit-address'
  | 'add-next-of-kin'
  | 'edit-next-of-kin'

type UsersContextType = {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const UsersContext = React.createContext<UsersContextType | null>(null)

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContexts = () => {
  const staffsContext = React.useContext(UsersContext)

  if (!staffsContext) {
    throw new Error('useContexts has to be used within <UsersContext>')
  }

  return staffsContext
}
