import React from 'react'
import style from './style.module.scss'
import { Button } from '@mui/material'
import ComstomButton from '../button/button'

const UserPage = () => {
  return (
    <div className={style.Container}>
      <img src='/userDp.png'  className={style.userDp}/>
      <span className={style.name}> Name : Piyush</span>
      <span className={style.name}> My Contact : 8545846780</span>
      <ComstomButton buttonType={"logout"} />
    </div>
  )
}

export default UserPage
