import React from 'react'
import './index.css';
import CategoryCard from '../categoryCard';
const Category = () => {
    const data = [
        {
            name: "All",
            img: "https://www.love-electronics.com/wp-content/uploads/2021/03/Banner-1.jpg"
        },
        {
            name: "Mobile",
            img: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
        },
        {
            name: "Grocery",
            img: "https://rukminim2.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
        },
        {
            name: "Faction",
            img: "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/0d75b34f7d8fbcb3.png?q=100"
        },
        {
            name: "Applince",
            img: "https://rukminim2.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
        },
    ]
    return (
        <div className='category'>
            {
                data.map((item,i)=>{
                    return(
                        <CategoryCard key={i} data={item} />
                    )
                })
            }
        </div>
    )
}

export default Category
