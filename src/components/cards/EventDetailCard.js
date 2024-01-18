const EventDetailCard = ({ image, headline, contents, reverse }) => {
  return (
    <div>
      {reverse ? (
        <div className="row gap-0">
          <div className="col-lg-6 pr-4 text-justify">
            <div className="event-headline event-detail-headline mb-3">{headline}</div>
            <div>{contents}</div>
          </div>
          <div className="col-lg-6 pl-0">
            <img src={image} className="vol-event-detail-img" alt=""></img>
          </div>
        </div>
      ) : (
        <div className="row gap-0">
          <div className="col-lg-6 pr-0">
            <img src={image} className="vol-event-detail-img" alt=""></img>
          </div>
          <div className="col-lg-6 pl-4 text-justify">
            <div className="event-headline event-detail-headline mb-3">{headline}</div>
            <div>{contents}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetailCard
