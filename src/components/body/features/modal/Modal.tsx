import { createPortal } from "react-dom"

export default function Modal({ children }: any) {
  return (
    createPortal(children, document.getElementById('modalRoot') as Element)
  )
}