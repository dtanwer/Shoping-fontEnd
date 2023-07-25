import { useState } from 'react'
import './index.css'
import { Carousel, Image } from 'antd';
function CarouselProduct({ data }) {
    const [visible, setVisible] = useState(false);
    return (
        <div className='carousel'>
            <Carousel autoplay>
                {
                    data?.map((item, i) => {
                        return (
                            <div className='imgDiv' key={i}>
                                <Image
                                    preview={{ visible: false }}
                                    width={800}
                                    src={item}
                                    onClick={() => setVisible(true)}
                                />
                            </div>
                        )
                    })
                }
            </Carousel>
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                    {
                        data?.map((item, i) => {
                            return (
                                <Image src={item} key={i} />
                            )
                        })
                    }
                </Image.PreviewGroup>
            </div>
        </div>
    )
}

export default CarouselProduct
