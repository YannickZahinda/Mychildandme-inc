import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { donationApi } from 'src/api/services'
import ProgramCard from '../cards/ProgramCard'
import DonationProgramModal from '../modals/DonationProgramModal'
const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [programModal, setProgramModal] = useState(true)

  useEffect(() => {
    const getPrograms = async () => {
      try {
        const response = await donationApi.getDonationPrograms()
        setPrograms(response.result)
      } catch (error) {
        console.log(error)
      }
    }
    getPrograms()
  }, [])

  return (
    <>
      <section className="causes-area causes-area2">
        <div className="container">
          <div className="row blog-content-wrap">
            {programs?.map((program, index) => (
              <div className="col-lg-6">
                <ProgramCard program={program} key={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
export default Programs
