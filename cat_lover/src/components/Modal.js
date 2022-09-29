import React from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

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
        className=' absolute top-0 left-0 h-screen w-screen flex justify-center items-center  bg-black/50 z-10'
      >
        <motion.div
          variants={modalAnimation}
          initial='hidden'
          animate='visible'
          exit='exit'
          className=' flex flex-col items-center z-10 w-[90%] h-[600px] md:w-[700px]  lg:w-[50%] bg-white p-5 rounded overflow-y-scroll'
        >
          <div className='border relative'>
            <img
              src={singleCatInfo.url}
              alt={singleCatInfo.id}
              className='w-9/12  object-cover m-auto'
            />
            {singleCatInfo.breeds.length === 0 ? (
              <p className='border w-full text-center'>
                This is the cat description
              </p>
            ) : (
              <p className='w-full text-center'>
                This is a breedThis is a breedThis is a breedThis is a breed
              </p>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              className='absolute top-0 right-0'
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
