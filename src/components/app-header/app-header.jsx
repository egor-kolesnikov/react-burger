import React from 'react'
import style from './app-header.module.css'
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, useMatch } from 'react-router-dom'

const AppHeader = React.memo(function () {
  const constructorMatchPath = useMatch({
    path: '/',
    end: true
  })
  const ordersMatchPath = useMatch({
    path: '/orders',
    end: false
  })
  const profileMatchPath = useMatch({
    path: '/profile',
    end: false
  })

  const setType = obj => (obj ? 'primary' : 'secondary')

  const classesArray = [
    'pl-5',
    'pr-5',
    'pb-4',
    'pt-4',
    'text',
    'text_type_main-default',
    'text_color_inactive',
    style.button
  ]
  const classes = classesArray.join(' ')

  const setActive = ({ isActive }) =>
    isActive ? `${classes} ${style.active}` : `${classes} ${style.inactive}`

  return (
    <header className={`${style.header} pt-4 pb-4`}>
      <div className={style.container}>
        <nav>
          <ul className={style.list}>
            <li className="ml-2">
              <NavLink to="/" className={setActive} end={true}>
                <BurgerIcon type={setType(constructorMatchPath)} />
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={setActive}>
                <ListIcon type={setType(ordersMatchPath)} />
                <span className="ml-2">Лента заказов</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div>
          <Logo />
        </div>
        <div className={style.profile}>
          <NavLink to="/profile" className={setActive}>
            <ProfileIcon type={setType(profileMatchPath)} />
            <span className="ml-2">Личный кабинет</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
})

export default AppHeader
