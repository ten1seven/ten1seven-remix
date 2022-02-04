// src/components/WorkThumbnails.jsx

import WorkThumbnail from './WorkThumbnail'

const WorkThumbnails = ({ classes, thumbnails }) => {
  return (
    <ul className={'work-grid ' + classes}>
      {thumbnails.map((work) => {
        return <WorkThumbnail thumbnail={work.node} />
      })}
    </ul>
  )
}

export default WorkThumbnails
