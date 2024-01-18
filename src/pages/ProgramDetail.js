import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { donationApi } from 'src/api/services'
import ProgramContent from 'src/components/donation/ProgramContent'
const ProgramDetailPage = () => {
  const { id } = useParams()
  const [program, setProgram] = useState(null)

  useEffect(() => {
    const getProgram = async () => {
      try {
        const response = await donationApi.getDonationProgramDetail(id)
        setProgram(response.result)
      } catch (error) {
        console.log(error)
        window.location.href = 'http://localhost:3001/donation/programs'
      }
    }
    id && getProgram()
  }, [id])
  console.log(program)
  return (
    <>
      <section
        className="donation-banner-area"
        style={{ backgroundImage: 'url(' + program?.post?.banner_image_url + ')' }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">{program?.purpose}</h1>
              <h4 className="text__white">{program?.post?.summary}</h4>
            </div>
          </div>
        </div>
      </section>
      <ProgramContent program={program} />
    </>
  )
}
export default ProgramDetailPage
