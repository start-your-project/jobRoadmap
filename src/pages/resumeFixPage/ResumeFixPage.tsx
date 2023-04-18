import React, { useState } from 'react'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { useAppDispatch } from '../../app/hooks'
import { getResResume } from '../../models/resume/resumeFixSlice'
import { useNavigate } from 'react-router-dom'
import { PushSpinner } from 'react-spinners-kit'
import './resumeFixPage.css'
import { loadState } from '../../utils/utils'
import styles from '../newUserPage/NewUserPage.module.css'
import styleSearch from '../../components/search/Search.module.css'
import { ErrorModal } from '../../components/errorModal/errorModal'
// eslint-disable-next-line no-template-curly-in-string
pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js'
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const ResumeFixPage = () => {
  const [
    loading,
    setLoad
  ] = React.useState(loadState.base)

  const nav = useNavigate()
  const [errMessage, setErrMessage] = React.useState('что-то пошло не так')
  const [file, setFile] = useState('')
  const dispatch = useAppDispatch()
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [data, setData] = React.useState([])
  const [selectedJob, setSelectedJob] = React.useState(null)
  const handleJobSelect = (event) => {
    if (!event.target.value.trim()) {
      setSelectedJob(null)
    } else {
      setLoad(loadState.base)
      setSelectedJob(event.target.value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // eslint-disable-next-line no-debugger
    const formData = new FormData()
    // @ts-expect-error qwer
    formData.append('file', selectedFile)
    try {
      setLoad(loadState.load)
      void dispatch(getResResume({ file: formData.get('file'), role: selectedJob, n_tech: 5 }))
        .then(data => {
          // eslint-disable-next-line no-debugger

          if (data.payload.errMessage) {
            setErrMessage(data.payload.errMessage)
            setLoad(loadState.error)
          } else {
            setLoad(loadState.res)
            setData(data.payload)
          }
        }).catch(() => { setLoad(loadState.error) })
    } catch (error) {
      // eslint-disable-next-line no-debugger

      setLoad(loadState.error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const renderResumeRes = (data) => {
    if (data) {
      return (
          <div className='rec'><span> Ваши навыки: {data[0].learned.join(' ') }</span><span> Что стоит изучить: {data[0]['to learn'].join(' ') }</span></div>
      )
    }
  }

  React.useEffect(() => { pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js` })
  return (
    <div className='resumePage'>
      <div className='resumeInput'>

      <form className='resumeBlock' onSubmit={handleSubmit}>
        <span>добавьте резюме PDF</span>
        <input placeholder='выбрать файл' type="file" onChange={handleFileSelect} accept=".pdf" />
        <span>введите вашу специальность</span>
        <input className={styleSearch.search} type="text" onChange={handleJobSelect}/>
        <input className={styles.tag + ' submit'} type="submit" id='inputScan' value="сканировать резюме" style={ (selectedJob && selectedFile) ? { visibility: 'visible' } : { visibility: 'hidden' }} />
        { (loading === loadState.error) && <div className='errDesr'>{errMessage}</div>}
      </form>
      </div>
      <div className='preloader'>
        <PushSpinner
          color="#686769"
          id="preloader"
          loading={loading === loadState.load}
          size={30}
        />
      </div>
      {(loading === loadState.res) &&
          <>
              <div className='allrecs'>{renderResumeRes(data)}</div></>
      }
    </div>
  )
}
