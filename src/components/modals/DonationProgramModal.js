import React from 'react'
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'

const DonationProgramModal = ({ isVisible, setVisible, program }) => {
  return (
    <CModal
      backdrop="static"
      alignment="center"
      size="lg"
      visible={isVisible}
      onClose={() => setVisible()}
      className="program-modal"
    >
      <CModalHeader className="">
        <CModalTitle>
          <h1>Tài trợ cho gia đình</h1>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <img src="https://p.w3layouts.com/demos_new/18-01-2017/orphanage_home-demo_Free/771401107/web/images/6.jpg" />
          <h3 className="mt-3">Hỗ trợ chi phí cho một gia đình cụ thể trong trại trẻ.</h3>
          <p>
            Chỉ với 300.000đ/tháng và lâu dài nhất có thể, bạn đã có thể góp phần giúp trẻ em mồ
            côi, trẻ em bị bỏ rơi và trẻ em có hoàn cảnh khó khăn được sống trong một gia đình, có
            tuổi thơ hạnh phúc và có điều kiện sống tự lập, có trách nhiệm sau này.{' '}
          </p>
          <p>
            Tham gia&nbsp;Tài trợ cho gia đình, bạn cũng sẽ trở thành một phần trong gia đình của
            trẻ, cùng với mẹ SOS và Làng SOS địa phương nuôi dưỡng và giáo dục trẻ mỗi ngày - một
            gia đình luôn luôn bên cạnh trẻ trẻ, với tất cả sự tôn trọng và yêu thương.
          </p>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default DonationProgramModal
