import React, { useState } from 'react'
import { ChatButton } from './ChatButton'
import { ChatWindow } from './ChatWindow'

export const GlobalChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen((prev) => !prev)
  const handleClose = () => setIsOpen(false)
  const handleMinimize = () => setIsOpen(false)

  return (
    <>
      <ChatWindow
        isOpen={isOpen}
        onClose={handleClose}
        onMinimize={handleMinimize}
      />
      <ChatButton isOpen={isOpen} onClick={toggleOpen} />
    </>
  )
}
