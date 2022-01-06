import React from 'react'

function Reviews(props) {
  let date = String(props.review.date).slice(0,10);
    return (
        <div className='reviewItems'> 
          <h4 className="reviewPersonName">{props.review.name}</h4>
          <p className="reviewComment">{props.review.comment}</p>
          <p className="reviewDate">{date}</p>
        </div>
    )
}

export default Reviews
