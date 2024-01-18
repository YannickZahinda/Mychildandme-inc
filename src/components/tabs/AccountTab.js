import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import avatarman from 'src/assets/images/avatar-profile-man.jpg'
import moment from 'moment'

const AccountTab = ({ account }) => {
  return (
    <>
      <div className="container account-container">
        <div className="row account-wrapper">
          <div className="col-lg-12">
            <div className="section-account-info mt-5">
              <h4 className="event-headline text-bold mt-5 mb-3">Thông tin cá nhân</h4>
              <table>
                <tbody>
                  <tr>
                    <th>Họ và tên</th>
                    <td>{account?.full_name}</td>
                  </tr>
                  <tr>
                    <th>Ngày sinh</th>
                    <td>{moment(account?.date_of_birth).format('DD/MM/YYYY')}</td>
                  </tr>
                  <tr>
                    <th>Giới tính</th>
                    <td>{account?.gender}</td>
                  </tr>
                  <tr>
                    <th>Dân tộc</th>
                    <td>{account?.ethnicity}</td>
                  </tr>
                  <tr>
                    <th>Quốc tịch</th>
                    <td>{account?.nationality}</td>
                  </tr>
                  <tr>
                    <th>Tôn giáo</th>
                    <td>{account?.religion}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ email</th>
                    <td>{account?.mail_address}</td>
                  </tr>
                  <tr>
                    <th>Số điện thoại</th>
                    <td>{account?.phone_number}</td>
                  </tr>
                  <tr>
                    <th>Địa chỉ liên hệ</th>
                    <td>{account?.address}</td>
                  </tr>
                  <tr>
                    <th>Tiểu sử</th>
                    <td>{account?.biography}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountTab
