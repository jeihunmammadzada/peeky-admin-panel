import React from 'react'
import Image from 'next/image';
import notFound from '@/public/assets/images/404.svg';

const NotFound = () => {
  return (
    <div>
        <div className="chartjs-wrapper-demo custom-align pie-chart">
          <Image src={notFound} height={200} width={200} alt='Not Found' />
        </div>
    </div>
  )
}

export default NotFound