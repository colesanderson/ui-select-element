// Core
import React, { useEffect } from 'react';

// Components
import Select from '../select';

// Style
import './app.css';

// Static
import sprite from '../../static/svg/sprite-dist/sprite.svg';

function App() {
    useEffect(() => {
        // Create Sprite Sheet, fetch and insert in the body. The reason why
        // doing this approach is because when you add SVG sprite to React
        // component and it will increase bundle size.
        fetch(sprite)
            .then((response) => response.text())
            .then((text) => {
                const spriteSheet = document.getElementById('sprite');
                spriteSheet.innerHTML = text;
                spriteSheet.hidden = true;
                document.body.appendChild(spriteSheet);
            })
            .catch(() => {
                throw new Error('Cannot load SVG');
            });
    });

    const options = [
        {
            label: 'Google Chrome',
            disabled: false,
            default: false,
            icon: 'chrome'
        },
        {
            label: 'Gift',
            disabled: false,
            default: true,
            icon: 'gift'
        },
        {
            label: 'GitHub',
            disabled: true,
            default: false,
            icon: 'github'
        },
        {
            label: 'Star',
            disabled: true,
            default: false,
            icon: 'star'
        },
        {
            label: 'Feather',
            disabled: false,
            default: false,
            icon: 'feather'
        },
        {
            label: 'Plus',
            disabled: false,
            default: false,
            icon: 'plus'
        }
    ];

    return (
        <div className="App">
            <h1 className="App__header">Select component</h1>

            <p>
                Information about accessiblity: You can use both a mouse and the
                keyboard to use the Select component.
            </p>

            <div>
                <span>For keyboard use: </span>
                <ul>
                    <li>Press the space bar to open the select options</li>
                    <li>Press Up or Down to choose an option</li>
                    <li>
                        Press Enter or Space to select the current focused
                        option
                    </li>
                    <li>Press Tab to select the option and exit the menu</li>
                    <li>Press Escape to close the select options.</li>
                </ul>
            </div>

            <label className="App-label">Dropdown with icons</label>

            <Select selectName="question" options={options} />
        </div>
    );
}

export default App;
