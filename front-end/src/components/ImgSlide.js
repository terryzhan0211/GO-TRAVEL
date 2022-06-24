import React, {useState} from 'react'
import { PostData } from './PostData'
import {BiChevronsLeft,BiChevronsRight} from 'react-icons/bi'
import './ImgSlide.css';
const ImgSlide = ({slides}) => {
const [current,setCurrent] = useState(0)
const length = slides.length

  return (
    <div>
        <div className='slider'>
            <BiChevronsLeft className='left-arrow'  />
            <BiChevronsRight className='right-arrow' />
            {PostData.map((slide,index) => {
            return (
                <img src={slide.image} alt="image" className='image'/>
            ) 
            })}

        </div>
      
    </div>
  )
}

export default ImgSlide
