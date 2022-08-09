import React, {useState} from 'react';
import {mixColors} from './colors';

export function App() {
    const [fgColor, setFgColor] = useState('rgba(0,0,0,0.1)');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [result, setResult] = useState('none');
    const handleSubmit= (e) => {
        e.preventDefault();
        const result = mixColors(bgColor, fgColor);
        setResult(result);
    }

    return (
    <div>
        <h1>Mix colors by putting transparent colors one on top of the other</h1>
        <div>
            <form id="transform-colors" onSubmit={e => handleSubmit(e)}>
                <label>
                    Foreground Color:
                    <input
                        type="text"
                        placeholder="eg. #000000, rgb(0,0,0), rgba(0,0,0,0.1)"
                        value={fgColor}
                        onChange={e => setFgColor(e.target.value)}
                    />
                </label>
                <label>
                    Background color:
                    <input
                        type="text"
                        placeholder="#ffffff"
                        value={bgColor}
                        onChange={e => setBgColor(e.target.value)}
                    />
                </label>
                <label>
                    Result:
                    <div style={{backgroundColor: result}}>{result}</div>
                </label>
                <button type="submit" className="submit">Create color</button>
            </form>
        </div>
    </div>
    );
}
