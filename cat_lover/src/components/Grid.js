import React, { useState, useEffect } from 'react'
import CatBox from './CatBox'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from './Modal'

function Grid({ catData }) {
  console.log(catData)
  const [isOpen, setIsOpen] = useState(false)
  const [singleCatInfo, setSingleCatInfo] = useState([])

  useEffect(() => {
    // The following code fixes a bug in which the screen scrolls when the popup is active
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isOpen])

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        singleCatInfo={singleCatInfo}
      />
      <div className='myGrid'>
        <AnimatePresence>
          {catData.map((cat) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.5, type: 'spring' } }}
              key={cat.id}
              onClick={() => {
                setSingleCatInfo(cat)
              }}
              layout
            >
              <CatBox
                url={cat.url}
                breeds={cat.breeds}
                id={cat.id}
                openModal={() => setIsOpen(true)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Grid
