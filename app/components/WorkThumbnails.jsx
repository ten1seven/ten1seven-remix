// src/components/WorkThumbnails.jsx

import WorkThumbnail from './WorkThumbnail'

const WorkThumbnails = ({ classes, thumbnails, loading }) => {
  return (
    <ul className={'work-grid ' + classes}>
      {thumbnails.map((work) => {
        return <WorkThumbnail thumbnail={work.node} loading={loading} />
      })}
    </ul>
  )
}

export default WorkThumbnails
