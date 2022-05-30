import React from 'react'
import { Dialog, CircleButton } from './lib'
import VisuallyHidden from '@reach/visually-hidden'

const ModalContext = React.createContext()


const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
function Modal(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />

}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick)
  })
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick)
  })
}

function ModalContentsBase(props) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props} />
}

function ModalContents({ title, children, ...props }) {
  return (
    <ModalContentsBase {...props}>
      <ModalDismissButton>
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ModalDismissButton>
            <CircleButton>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>×</span>
            </CircleButton>
          </ModalDismissButton>
        </div>
      </ModalDismissButton>
      <h3 css={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}


export { Modal, ModalContents, ModalDismissButton, ModalOpenButton, ModalContentsBase }