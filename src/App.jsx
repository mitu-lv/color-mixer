import React, {useState} from 'react';
import {mixLayersOfColors} from './colors';

export function App() {
    const [layerOfColors, setLayerOfColors] = useState(['rgba(0,0,0,0.1)', '#ffffff'])
    const [result, setResult] = useState('none');
    const handleSubmit= (e) => {
        e.preventDefault();
        const result = mixLayersOfColors([...layerOfColors]);
        setResult(result);
    }

    function removeItem(e) {
        if (layerOfColors.length < 3) {
            return;
        }
        const index = Number(e.target.dataset.index);
        layerOfColors.splice(index, 1);
        setLayerOfColors([...layerOfColors]);
    }

    return (
        <div>
            <h1>Mix colors by putting transparent colors one on top of the other</h1>
            <div>
                <form id="transform-colors" onSubmit={e => handleSubmit(e)}>
                    <button type="button" className="add-button" onClick={e => { layerOfColors.unshift('rgba(0,0,0,0.1)');setLayerOfColors([...layerOfColors]);}}>+</button>
                    {layerOfColors.map((color, index) => (
                        <label key={index} className="row color-entry">
                            <div className="color" style={{backgroundColor: color}}></div>
                            <input
                                type="text"
                                placeholder="eg. #000000, rgb(0,0,0), rgba(0,0,0,0.1)"
                                value={color}
                                onChange={e => {layerOfColors[index] = e.target.value; setLayerOfColors([...layerOfColors]);}}
                            />
                            <button type="button" className="remove-button" data-index={index} onClick={removeItem}>-</button>
                        </label>
                    ))}
                    <button type="submit" className="submit">Create color</button>
                </form>
            </div>
            <div className="row">
                <div className="color" style={{backgroundColor: result}}></div><div>{result}</div>
            </div>
        </div>
    );
}
