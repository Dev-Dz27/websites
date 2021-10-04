import cx from 'clsx'
import { motion } from 'framer-motion'

const CardWithGlow = ({ children, blurDataURL = '', isImage = false }) => {
  const cardVariants = {
    // hover: {
    //   scale: 1.05,
    // },
    // initial: {
    //   scale: 1,
    // },
  }

  const glowVariants = {
    // hover: {
    //   opacity: 0.8,
    // },
    // initial: {
    //   scale: 1.05,
    //   opacity: 0,
    // },
  }

  const bgLight = 'from-gray-700 via-gray-900 to-black'
  const bgDark = 'dark:from-gray-700 dark:via-gray-900 dark:to-gray-500'

  return (
    <motion.div
      className={cx(
        'relative'
        // 'overflow-hidden relative',
        // 'w-2/4 h-3/4'
      )}
      // initial="initial"
      // whileHover="hover"
      initial="hover"
      whileHover="initial"
    >
      <motion.div
        className={cx(
          'absolute top-0 left-0 w-full h-full blur-lg rounded-xl',
          // 'bg-gradient-to-r',
          // // // 'dark:from-pink-500 dark:via-red-500 dark:to-yellow-500',
          // // 'dark:from-gray-500 dark:via-gray-300 dark:to-gray-100',
          // // 'from-gray-700 via-gray-900 to-black'
          // bgLight,
          // bgDark,
          !!blurDataURL ? '' : `${bgLight} ${bgDark}`,
          ''
        )}
        variants={glowVariants}
        transition={{
          ease: 'easeOut',
          delay: 0,
        }}
        style={
          !!blurDataURL
            ? {
                background: `url(${blurDataURL})`,
                backgroundSize: 'cover',
              }
            : {}
        }
      />
      <motion.div
        className={cx(
          ' relative',
          'h-full',
          // 'mb-0 px-10 py-10',
          'rounded-xl',
          !isImage && 'bg-white'
          // 'backdrop-opacity-75',
          // 'hover:opacity-95'
        )}
        variants={cardVariants}
        transition={{
          ease: 'easeOut',
          delay: 0,
          duration: 0.25,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
export default CardWithGlow
