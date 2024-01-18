import React from 'react'

const Map = () => {
  return (
    <div>
      <section className="map-area">
        <div id="map">
          <iframe
            src="https://maps.google.com/maps?q=K142%20%C4%91%C6%B0%E1%BB%9Dng%20L%C3%AA%20V%C4%83n%20Hi%E1%BA%BFn,%20Ph%C6%B0%E1%BB%9Dng%20Khu%C3%AA%20M%E1%BB%B9,%20Qu%E1%BA%ADn%20Ng%C5%A9%20H%C3%A0nh%20S%C6%A1n,%20%C4%90%C3%A0%20N%E1%BA%B5ng&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            className="map"
            allowFullScreen=""
          ></iframe>
        </div>
      </section>

      <style jsx>{`
        .map {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}

export default Map
