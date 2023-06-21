import React, { useState, lazy, Suspense } from 'react'
import './App.sass'
import { Route, Routes, useNavigate } from 'react-router-dom'

/*
 * Import NewUserPage from './pages/newUserPage/NewUserPage'
 * import axios from 'axios'
 */
import Header from './components/header/Header'
// Import ProfilePage from '../src/pages/profilePage/ProfilePage'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { type GradeState, selectGrade, setFilter } from './models/gradeFilter/gradeSlice'

/*
 * Import RegPage from './pages/regPage/RegPage'
 * import LoginPage from './pages/loginPage/LoginPage'
 */
import { PrivateRoute } from './authApp/_components'
import NewUserPage from './pages/newUserPage/NewUserPage'

import { ResumeFixPage } from './pages/resumeFixPage/ResumeFixPage'
import { JobLetterPage } from './pages/jobLetterPage/jobLetterPage'
import { loadState } from './utils/utils'
import ValidatedLoginForm from './authApp/login/Formik'
import ValidatedRegForm from './authApp/register/FormikReg'
import { ReactComponent as NodeSvg } from '../src/static/images/svg-hex.svg'
import { PushSpinner } from 'react-spinners-kit'
import { SvgNoiseBack } from './components/svgNoiseBack/svgNoiseBack'
import { Preloader } from './components/preloader/Preloader'

const HomePage = lazy(async () => await import('./pages/homePage/HomePage'))

const ProfilePage = lazy(async () => await import('./pages/profilePage/ProfilePage'))
const JobsPage = lazy(async () => await import('./pages/jobsPage/JobsPage'))
const ProfileUser = lazy(async () => await import('./authApp/profile/profileUser'))

/*
 * Import { PrivateRoute } from './components/privateRoute/PrivateRoute'
 * import { history } from './authApp/_helpers'
 */

function App (): JSX.Element {
  const headerGrade = useAppSelector(selectGrade)
  const dispatch = useAppDispatch()
  const history = useNavigate()
  const [
    inputData,
    changeInputData
  ] = useState('')
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)
  React.useEffect(() => {
    // const script = document.createElement('script')
    //
    // script.src = 'https://d3js.org/d3.v6.js'
    // script.async = true
    // script.type = 'text/javascript'
    // document.body.appendChild(script)
    //
    // return () => {
    //   document.body.removeChild(script)
    // }
  }, [])

  const [isMainSearch, setIsMainSearch] = React.useState(true)
  const [takeInput, setTakeInput] = React.useState('')

  function change (inputData: { value: string, isTechSearch: boolean }): void {
    // If (inputData.includes('python')) {
    // CoursesPage()
    // // @ts-expect-error errors
    if (inputData.isTechSearch) {
      setTakeInput(inputData.value)
      setIsMainSearch(true)
      changeInputData(inputData.value)
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      history('/search')
    } else {
      setIsMainSearch(false)
      changeInputData(inputData.value)
      history('/searchjob')
    }

    /*
     * FetchUser(inputData)
     * }
     */
  }

  function setGrade (grade: GradeState): void {
    dispatch(setFilter(grade))
  }

  React.useEffect(() => {
    // const div1 = document.getElementById('backBlueNoise')
    // const div2 = document.getElementById('backDarkBlueNoiseLeft')
    // setLoad(loadState.load)
    // if (div1 && div2) {
    //   div1.style.visibility = 'hidden'
    //   div2.style.visibility = 'hidden'
    // }
    // const bgImg1 = new Image()
    // const bgImg2 = new Image()
    // bgImg1.onload = function () {
    //   const div1 = document.getElementById('backBlueNoise')
    //   const div2 = document.getElementById('backDarkBlueNoiseLeft')
    //   if (div1) {
    //     // div1.style.backgroundImage = 'url(' + bgImg1.src + ')'
    //     if (div2) {
    //       // div1.style.visibility = 'visible'
    //       // div2.style.visibility = 'visible'
    //       setLoad(loadState.res)
    //     }
    //   }
    // }
    // bgImg2.onload = function () {
    //   const div1 = document.getElementById('backBlueNoise')
    //   const div2 = document.getElementById('backDarkBlueNoiseLeft')
    //   if (div2) {
    //     // div2.style.backgroundImage = 'url(' + bgImg2.src + ')'
    //     if (div1) {
    //       // div1.style.visibility = 'visible'
    //       // div2.style.visibility = 'visible'
    //
    //     }
    //   }
    // }
    setLoad(loadState.res)
    // bgImg1.src = 'static/img.webp'
    // bgImg2.src = 'static/img_5.webp'
  }, [])

  const routes = (
    <React.Fragment>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading === loadState.load}
          size={30}
        />
      </div>
      <SvgNoiseBack/>
      <Header
        takeInput={takeInput}
        isMainSearch={isMainSearch}
        changeData={change}
        setGrade={setGrade}
      />
      {window.innerWidth > 1000 && <>
        <Routes>
          {/* Private */}
          <Route
            element={
              <PrivateRoute>
                <Suspense fallback={<Preloader loading={loadState.load}/>}>
                <ProfilePage chooseRoadmap={change}/>
                </Suspense>
              </PrivateRoute>
            }
            path="/favorites"
          />
          <Route
            element={
              <PrivateRoute>
                <Suspense fallback={<Preloader loading={loadState.load}/>}>
                <ProfileUser/>
                </Suspense>
              </PrivateRoute>
            }
            path="/profile"
          />
          {/* Public */}
          <Route
            element={<NewUserPage/>}
            path="/"
          />
          <Route
            element={
              <Suspense fallback={<></>}>
                <HomePage
                  sendJob={change}
                  headerGrade={headerGrade}
                  inputData={inputData}
                />
              </Suspense>
          }
            path={'/search'}
          />
          <Route
            element={
              <Suspense fallback={<></>}>
            <JobsPage
              inputData={inputData}
              sendJob={change}
            />
              </Suspense>
              }
            path="/searchJob"
          />
          <Route
            element={<JobLetterPage
            />}
            path="/jobLetter"
          />
          <Route
            element={<ResumeFixPage
            />}
            path="/resumeFix"
          />
          <Route
            element={
              <ValidatedLoginForm/>
            }
            path="/login"
          />
          <Route
            element={<ValidatedRegForm/>}
            path="/signup"
          />
        </Routes></>}
      {window.innerWidth <= 1000 && <>
        <Routes>
          {/* Private */}
          {/* <Route */}
          {/*  element={ */}
          {/*    <PrivateRoute> */}
          {/*      <ProfilePage chooseRoadmap={change}/> */}
          {/*    </PrivateRoute> */}
          {/*  } */}
          {/*  path="/favorites" */}
          {/* /> */}
          {/* <Route */}
          {/*  element={ */}
          {/*    <PrivateRoute> */}
          {/*      <ProfileUser/> */}
          {/*    </PrivateRoute> */}
          {/*  } */}
          {/*  path="/profile" */}
          {/* /> */}
          {/* Public */}
          <Route
            element={<NewUserPage/>}
            path="/"
          />
          {/* <Route */}
          {/*  element={<HomePage */}
          {/*    sendJob={change} */}
          {/*    headerGrade={headerGrade} */}
          {/*    inputData={inputData} */}
          {/*  />} */}
          {/*  path={'/search'} */}
          {/* /> */}
          {/* <Route */}
          {/*  element={<JobsPage */}
          {/*    inputData={inputData} */}
          {/*    sendJob={change} */}
          {/*  />} */}
          {/*  path="/searchJob" */}
          {/* /> */}
          <Route
            element={<JobLetterPage
            />}
            path="/jobLetter"
          />
          <Route
            element={<ResumeFixPage
            />}
            path="/resumeFix"
          />
          {/* <Route */}
          {/*  element={ */}
          {/*    <ValidatedLoginForm/> */}
          {/*  } */}
          {/*  path="/login" */}
          {/* /> */}
          {/* <Route */}
          {/*  element={<ValidatedRegForm/>} */}
          {/*  path="/signup" */}
          {/* /> */}
        </Routes></>}
      </React.Fragment>
  )

  /*
         * React.useEffect(() => {
         *     changeData(dataGraph)
         * }, [dataGraph])
         * const routes = (
         *     <React.Fragment>
         *         <Header changeData={change} setGrade={setGrade}/>
         *         <Switch>
         *             <Route path="/search" render={() => <HomePage data={data} inputData={inputData} headerGrade={headerGrade}/>}/>
         *             <Route path="/profile" component={ProfilePage}/>
         *             <Route path="/" component={NewUserPage}/>
         *         </Switch>
         *     </React.Fragment>
         * )
         */
  return (
        <React.Fragment>
      {(window.innerWidth > 0)
        ? routes
        : <>
        <div className='mockPhone'>{'Мобильная версия скоро будет доступна\n'}</div>
        <NodeSvg className='firstNode'/></>}
        </React.Fragment>
  )
}

export default App
