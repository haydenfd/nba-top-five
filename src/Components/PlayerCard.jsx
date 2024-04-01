import React from 'react'

export const PlayerCard = ({id, name}) => {

  const generatePlayerImg = (id) => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`
  }

  return (
    <div className='w-full flex flex-row space-x-4 items-center text-center'>
        <img src={generatePlayerImg(id)} width={60} height={60} />
        <h3 className='text-xl'>{name}</h3>
    </div>
  )
}

