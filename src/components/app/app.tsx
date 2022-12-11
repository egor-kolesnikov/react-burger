import React, { useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import style from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Modal from '../UI/modal/modal'
import { useSelector, useDispatch } from '../../hooks'
import { getIngredients } from '../../services/actions/burger-ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'
import { clearOrder } from '../../services/actions/order-details'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from '../../pages/login/login'
import Register from '../../pages/register/register'
import ForgotPassword from '../../pages/forgot-password/forgot-password'
import ResetPassword from '../../pages/reset-password/reset-password'
import Profile from '../../pages/profile/profile'
import ProtectedRoutes from '../../hocs/protected-routes'
import NotFound404 from '../../pages/not-found-404/not-found-404'
import { checkAuth } from '../../services/actions/auth'
import Person from '../../pages/person/person'
import { selectOrder } from '../../services/selectors'
import Feed from '../../pages/feed/feed'
import OrderInfo from '../order-info/order-info'
import OrdersList from '../orders-list/orders-list'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  let background = location.state?.background

  const order = useSelector(selectOrder)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(checkAuth())
  }, [dispatch])

  const closeModal = () => {
    order && dispatch(clearOrder())
    navigate(-1)
  }

  const mainPage = (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  )

  return (
    <>
      <AppHeader />
      <main className={style.main}>
        <Routes location={background || location}>
          <Route index element={mainPage}></Route>
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientDetails title="Детали ингредиента" />}
          ></Route>
          <Route path="/login" element={<ProtectedRoutes onlyAuth={false} />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<OrderInfo />} />
          <Route
            path="/register"
            element={<ProtectedRoutes onlyAuth={false} />}
          >
            <Route index element={<Register />} />
          </Route>
          <Route
            path="/forgot-password"
            element={<ProtectedRoutes onlyAuth={false} />}
          >
            <Route index element={<ForgotPassword />} />
          </Route>
          <Route
            path="/reset-password"
            element={<ProtectedRoutes onlyAuth={false} />}
          >
            <Route index element={<ResetPassword />} />
          </Route>
          <Route
            path="/profile/*"
            element={<ProtectedRoutes onlyAuth={true} />}
          >
            <Route path="*" element={<Profile />}>
              <Route index element={<Person />} />
              <Route
                path="orders"
                element={<OrdersList statusShowed={true} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound404 />}></Route>
        </Routes>
      </main>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal closeModal={closeModal} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/modal-order"
            element={<ProtectedRoutes onlyAuth={true} />}
          >
            {order && (
              <Route
                index
                element={
                  <Modal closeModal={closeModal}>
                    <OrderDetails />
                  </Modal>
                }
              />
            )}
          </Route>
          <Route
            path="/feed/:id"
            element={
              <Modal closeModal={closeModal}>
                <OrderInfo isModal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
