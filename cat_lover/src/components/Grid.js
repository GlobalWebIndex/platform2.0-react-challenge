import React from 'react'
import CatBox from './CatBox'
import { AnimatePresence, motion } from 'framer-motion'

function Grid({ catData }) {
  console.log(catData)
  return (
    <div className='myGrid'>
      <AnimatePresence>
        {catData.map((cat) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.5, type: 'spring' } }}
            key={cat.id}
            layout
          >
            <CatBox url={cat.url} breeds={cat.breeds} id={cat.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Grid
