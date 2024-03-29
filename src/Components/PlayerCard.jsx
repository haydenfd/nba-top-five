import React from 'react'

const img_url = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png';


export const PlayerCard = () => {
  return (
    <div className='w-full h-full flex flex-row space-x-2 items-center border-2 border-black'>
        <div className='h-full w-1/4 p-2'>
            <img src={img_url} className='w-full h-full' />

        </div>

        <h3 className='text-medium'>LeBron James</h3>

    </div>
  )
}

