import React, { useEffect, useState } from 'react'
import { donationApi } from 'src/api/services'
import {
  CFormSelect,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableHead,
} from '@coreui/react'
import numeral from 'numeral'
import moment from 'moment'
import img from 'src/assets/images/nu-cuoi.jpg'

const DonationListPage = () => {
  const [donations, setDonations] = useState([])
  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(1)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()

  const [pagination, setPagination] = useState({
    limit: 24,
    sortColumn: 'create_date_time',
    sortType: 'desc',
    page: 1,
  })

  useEffect(() => {
    const params = {
      limit: pagination.limit,
      sortColumn: pagination.sortColumn,
      sortType: pagination.sortType,
      page: page,
      year: year,
      month: month,
    }

    const getDonations = async () => {
      try {
        const response = await donationApi.getMonthlyDonation({ params })
        setDonations(response.result.records)
        setPage(response.result.page)
        setTotalPage(response.result.totalPage)
      } catch (error) {
        console.log(error)
      }
    }
    getDonations()
  }, [page, year, month])

  const renderMonthOptions = () => {
    const months = Array.from({ length: 12 }, (_, index) => index + 1)
    return months.map((m) => (
      <option key={m} value={m}>
        {m}
      </option>
    ))
  }

  const renderYearOptions = () => {
    const startYear = 2019
    const endYear = 2024
    const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)
    return years.map((y) => (
      <option key={y} value={y}>
        {y}
      </option>
    ))
  }
  const pageNumbers = []
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i)
  }
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage)
    }
  }
  return (
    <>
      <section className="donation-banner-area" style={{ backgroundImage: 'url(' + img + ')' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading mixer-heading z-100 text-center pl-5 pr-5">
              <h1 className="text__white mb-3">Danh sách nhà tài trợ hàng tháng</h1>
              <h4 className="text__white">
                Khoản tiền tài trợ của bạn, dù lớn hay nhỏ, đều quan trọng với chúng tôi trên hành
                trình mang lại nụ cười và tương lai cho trẻ em mồ côi, bị bỏ rơi và có hoàn cảnh đặc
                biệt khó khăn.
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form-area register-area pt-5">
        <div className="container">
          <div className="form-shared-wrap">
            <div className="text-center">
              <h1 className="h1__form__title">
                Danh sách tài trợ tháng{' '}
                <span>
                  <CFormSelect
                    className="border-0"
                    defaultValue={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    {renderMonthOptions()}
                  </CFormSelect>
                </span>{' '}
                Năm{' '}
                <span>
                  <CFormSelect
                    className="border-0"
                    defaultValue={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {renderYearOptions()}
                  </CFormSelect>
                </span>
              </h1>
            </div>
            {donations?.length > 0 && (
              <div className="mt-5">
                <CTable bordered responsive>
                  <CTableHead>
                    <tr>
                      <th>#</th>
                      <th>Tên nhà tài trợ</th>
                      <th>Số tiền</th>
                      <th>Thời gian</th>
                      <th>Chiến dịch tài trợ</th>
                    </tr>
                  </CTableHead>
                  <CTableBody>
                    {donations.map((donation, index) => (
                      <tr key={index}>
                        <td>{12 * (page - 1) + index + 1}</td>
                        <td>{donation?.donor_name}</td>
                        <td>{numeral(donation?.amount).format('0,0₫')} VND</td>
                        <td>{moment(donation?.donation_time).format('DD/MM/YYYY HH:mm:ss')}</td>
                        <td>{donation?.donation_purpose}</td>
                      </tr>
                    ))}
                  </CTableBody>
                </CTable>
                <CPagination className="justify-content-end">
                  <CPaginationItem
                    className="cursor-pointer"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </CPaginationItem>
                  {pageNumbers.map((pageNumber) => (
                    <CPaginationItem
                      className="cursor-pointer"
                      key={pageNumber}
                      active={pageNumber === page}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    className="cursor-pointer"
                    disabled={page === totalPage}
                    onClick={() => handlePageChange(page + 1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </CPaginationItem>
                </CPagination>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default DonationListPage
