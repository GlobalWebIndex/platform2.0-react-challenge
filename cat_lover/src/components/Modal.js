import React from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import CatInfo from './CatInfo'

function Modal({ isOpen, setIsOpen, singleCatInfo }) {
  // animation Settings
  const modalAnimation = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  }

  console.log({ singleCatInfo })

  if (!isOpen) return null

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className=' fixed top-0 left-0 bottom-0 right-0  flex justify-center items-center  bg-black/50 z-10'
      >
        <motion.div
          variants={modalAnimation}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='p-0  overflow-y-scroll rounded-lg z-10 w-[90%] h-fit max-h-[50vh]  md:w-[700px] lg:w-[50%] bg-white '
        >
          <div className='relative flex flex-col'>
            <div className='w-full bg-black'>
              <img
                src={singleCatInfo.url}
                alt={singleCatInfo.id}
                className='max-w-[300px] object-cover m-auto'
              />
            </div>

            <CatInfo breeds={singleCatInfo.breeds} />

            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              className='absolute top-0 right-0 text-white'
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
