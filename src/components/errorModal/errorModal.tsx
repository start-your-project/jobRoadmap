import './errorModal.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './../../pages/newUserPage/NewUserPage.module.css'
import stylesTag from '../Tag/Tag.module.css'

export const ErrorModal = ({ message }) => {
  const nav = useNavigate()
  return (
    <div className={'errorModal ' + styles.widjet}>
      <span>{message}</span>
      <button className={stylesTag.tag + ' ' + styles.newPageBtn} onClick={() => { nav('/') }
      }>перейти на главную страницу</button>
    </div>
  )
}
