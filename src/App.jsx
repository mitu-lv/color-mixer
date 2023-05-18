import React, {useState, useEffect} from 'react';
import {mixLayersOfColors, hexToRgba} from './colors';

function getResult(layerOfColors) {
    const result = mixLayersOfColors([...layerOfColors]);
        const rgba = hexToRgba(result.substr(1,6));
        return {hex: result, rgb: `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`};
}

export function App() {
    const [layerOfColors, setLayerOfColors] = useState(['rgba(0,0,0,0.1)', '#ffffff'])
    const [result, setResult] = useState({hex: 'none', rgb: 'none'});
    const handleSubmit= (e) => {
        e.preventDefault();
        setResult(getResult(layerOfColors));
    }

    function removeItem(e) {
        if (layerOfColors.length < 3) {
            return;
        }
        const index = Number(e.target.dataset.index);
        layerOfColors.splice(index, 1);
        setLayerOfColors([...layerOfColors]);
    }

    function addItem(e) {
        layerOfColors.unshift('rgba(0,0,0,0.1)');
        setLayerOfColors([...layerOfColors]);
    }

    function updateItem(e) {
        const index = Number(e.target.dataset.index);
        layerOfColors[index] = e.target.value;
        setLayerOfColors([...layerOfColors]);
    }

    useEffect(() => {
        setResult(getResult(layerOfColors));
    }, []);


    return (
        <div>
            <div className="align-transform-colors">
                <h1>Mix colors by putting transparent colors one on top of the other</h1>
                <form id="transform-colors" onSubmit={e => handleSubmit(e)}>
                    <button type="button" className="add-button" onClick={addItem}>+</button>
                    {layerOfColors.map((color, index) => (
                        <label key={index} className="row color-entry">
                            <div className="color" style={{backgroundColor: color}}></div>
                            <input
                                type="text"
                                placeholder="eg. #000000, rgb(0,0,0), rgba(0,0,0,0.1)"
                                value={color}
                                data-index={index}
                                onChange={updateItem}
                            />
                            <button type="button" className="remove-button" data-index={index} onClick={removeItem}>-</button>
                        </label>
                    ))}
                    <button type="submit" className="submit">Create color</button>
                </form>
                <div className="row">
                    <div className="color" style={{backgroundColor: result.hex}}></div>
                    <div>{'hex: '}{result.hex}<br/>{'rgb: '}{result.rgb}</div>
                </div>
            </div>
        </div>
    );
}
