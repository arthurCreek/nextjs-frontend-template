import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from '@/styles/Modal.module.css';

export interface Props {
    show: any,
    onClose: any,
    children?: any,
    title?: any
}

export default function Modal(props: Props) {
    const [isBrowser, setIsBrowser] = useState(false)

    useEffect(() => setIsBrowser(true), [])
  
    const handleClose = (e:any) => {
      e.preventDefault()
      props.onClose()
    }
  
    const modalContent = props.show ? (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <a href='#' onClick={handleClose}>
              <FaTimes />
            </a>
          </div>
          {props.title && <div>{props.title}</div>}
          <div className={styles.body}>{props.children}</div>
        </div>
      </div>
    ) : null
  
    if (isBrowser) {
        const containerModal = document.getElementById('modal-root');

      return containerModal ? ReactDOM.createPortal(
        modalContent,
        containerModal
      ) : null
    } else {
      return null
    }
  }