import React, { useState, useEffect } from "react";
import axios, {AxiosResponse} from "axios";
import "../components/GlyphReaderStyle.scss";

export const GlyphReader = () => {
    const [fileSelected, setFileSelected] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [glyph, setGlyph] = useState([]);
    const [loading, setLoading] = useState(null);


    const saveFileSelected= (e) => {
        setFileSelected(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };

    const importFile= async (e) => {
        setLoading("Загрузка...");
        const formData = new FormData();
        formData.append("file", fileSelected);
        try {
            const res = await axios.post("https://api.ancient-egyptian-helper.ru/api/glyphreader", formData);
            axios
                .get(`https://api.ancient-egyptian-helper.ru/api/glyphs/find/${res.data}`, {
                    responseType: "json",
                })
                .then(function (response) {
                    setGlyph(response.data);
                });
            setLoading(null);
        } catch (ex) {
            console.log(ex);
        }
    };
    return (
        <div className={"glyphreader"}>
            <div className={"empty"}></div>
            <div className={"mainDiv"}>
                {selectedImage && (
                    <div>
                        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        <br />
                        <button onClick={()=>setSelectedImage(null)}>Remove</button>
                    </div>
                )}
            <input type="file" onChange={saveFileSelected} />
            <input type="button" value="upload" onClick={importFile} />
                {loading}
                {glyph.gardinerCode}
        </div>
        </div>
    );
};