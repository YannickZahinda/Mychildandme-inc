const ArticleDetailCard = ({ image, headline, contents, displayType }) => {
  return (
    <div>
      {displayType === 1 ? (
        <div className="row gap-0">
          <div className="col-lg-6 text-justify">
            <div className="event-headline event-detail-headline mb-2">{headline}</div>
            <div>{contents}</div>
          </div>
          <div className="col-lg-6">
            <img src={image} className="article-detail-img" alt=""></img>
          </div>
        </div>
      ) : displayType === 2 ? (
        <div className="row gap-0">
          <div className="col-lg-6 ">
            <img src={image} className="article-detail-img" alt=""></img>
          </div>
          <div className="col-lg-6 text-justify">
            <div className="event-headline event-detail-headline mb-2">{headline}</div>
            <div>{contents}</div>
          </div>
        </div>
      ) : displayType === 3 ? (
        <>
          <div className="row gap-0">
            <div className="col-lg-12 mb-3">
              <img src={image} className="article-detail-img" alt=""></img>
            </div>
            <div className="col-lg-12 text-justify">
              <div className="event-headline event-detail-headline mb-2">{headline}</div>
              <div>{contents}</div>
            </div>
          </div>
        </>
      ) : (
        displayType === 4 && (
          <>
            <div className="row gap-0">
              <div className="col-lg-12 text-justify  mb-3">
                <div className="event-headline event-detail-headline mb-2">{headline}</div>
                <div>{contents}</div>
              </div>
              <div className="col-lg-12 ">
                <img src={image} className="article-detail-img" alt=""></img>
              </div>
            </div>
          </>
        )
      )}
    </div>
  )
}

export default ArticleDetailCard
