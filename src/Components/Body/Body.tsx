import React from 'react'
import {Button} from "@nextui-org/react";

const Body = () => {
  return (
    <div className='w-full'>
        <div className=' p-10 w-full'>
        </div>
        <div className='py-12 px-48 w-full flex justify-end items-center'>
            <Button color="default" className='p-6 text-lg rounded-none border-4 border-black hover:bg-gray-600 hover:text-white '>
                Submit
            </Button>  
        </div>
    </div>
  )
}

export default Body