import './styles/Ingredients.css'
import { useState } from 'react'

function Ingredients() {
    var [isVisible] = useState(true)

    var ingredients = [
        { name: 'Свинина (ребра)', amount: '500 г' },
        { name: 'Буряк', amount: '2 шт' },
        { name: 'Капуста', amount: '300 г' },
        { name: 'Картопля', amount: '3 шт' },
        { name: 'Морква', amount: '1 шт' },
        { name: 'Цибуля', amount: '1 шт' },
        { name: 'Томатна паста', amount: '2 ст.л' },
        { name: 'Часник', amount: '3 зубчики' },
        { name: 'Соняшникова олія', amount: '3 ст.л' },
        { name: 'Лавровий лист', amount: '2 шт' },
        { name: 'Сіль та перець', amount: 'за смаком' },
        { name: 'Сметана для подачі', amount: '100 г' },
    ]

    return (
        <div className="ingredients">
            <div className="ingredients-header">
                <h2>Інгредієнти</h2>
            </div>

            {isVisible && (
                <ul className="ingredients-list">
                    {ingredients.map(function(item, index) {
                        return (
                            <li key={index} className="ingredient-item">
                                <span className="ingredient-name">{item.name}</span>
                                <span className="ingredient-amount">{item.amount}</span>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default Ingredients