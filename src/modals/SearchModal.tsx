import { createPortal } from "react-dom"

export default function SearchModal({ children }: any) {
  return (
    createPortal(children, document.getElementById('searchModal') as Element)
  )
}