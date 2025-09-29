import React from 'react'

const Footer = () => {
  return (
        <footer className='w-full flex flex-col items-center bottom-0 left-0 bg-gray-200 py-4 px-10 mt-10'>
        <div>&copy; Tasks Creation Application</div>
        <div className='flex'>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
        </div>
</footer>
  )
}

export default Footer
