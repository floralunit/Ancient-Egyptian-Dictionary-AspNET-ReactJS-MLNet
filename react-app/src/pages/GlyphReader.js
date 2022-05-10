import React, { useState } from "react";
import axios from "axios";

export const GlyphReader = () => {
    const [fileSelected, setFileSelected] = useState();
    const [prediction, setPrediction] = useState(null);

    const saveFileSelected= (e) => {
        setFileSelected(e.target.files[0]);
    };

    const importFile= async (e) => {
        setPrediction("Загрузка...");
        const formData = new FormData();
        formData.append("file", fileSelected);
        try {
            const res = await axios.post("https://api.ancient-egyptian-helper.ru/api/glyphreader", formData);
            setPrediction(res.data);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <div className={"glyphreader"}>
            <input type="file" onChange={saveFileSelected} />
            <input type="button" value="upload" onClick={importFile} />
                {prediction}
        </div>
    );
};