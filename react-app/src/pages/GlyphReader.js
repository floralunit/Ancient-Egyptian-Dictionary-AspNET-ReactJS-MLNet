import React, {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";
import "../components/GlyphReaderStyle.scss";
import ReactLoading from "react-loading";

export const GlyphReader = () => {
    const [fileSelected, setFileSelected] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [glyph, setGlyph] = useState([]);
    const [loading, setLoading] = useState(null);


    const saveFileSelected = (e) => {
        setFileSelected(e.target.files[0]);
        setSelectedImage(e.target.files[0]);
    };

    const importFile = async (e) => {
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
        <div className={"glyphreader"} >
            <div className={"empty"}/>
            <div className={"container"}>
                <div className={"row"} style={{background: '#FBEEC1', borderRadius: '10px'}}>
                    <h2 align={"center"} style={{display: 'table', margin: '0 auto', color: "black"}}>Расшифратор иероглифов по фото</h2>
                    <div className={"col"}>
                        <div className="file-upload">
                            {!selectedImage && (
                                <div>
                                <div className="image-upload-wrap">
                                    <input className="file-upload-input" type='file' onChange={saveFileSelected}
                                           accept="image/*"/>
                                    <div className="drag-text">
                                        <h4>Выберите или перетащите картинку</h4>
                                    </div>
                                </div>
                                    <div style={{margin: '3vh 0'}}>
                                        Примеры фотографий:
                                        <p style={{margin: '1vh 0'}}>
                                            <img src={require('../images/birth(42).jpg')} alt="Фотография 1" width="120vh" height="120vh" style={{margin: '0 1vh'}}/>
                                            <img src={require('../images/owl(49).jpg')} alt="Фотография 2" width="120vh" height="120vh" style={{margin: '0 1vh'}}/>
                                            <img src={require('../images/ankh (49).jpg')} alt="Фотография 3" width="120vh" height="120vh" style={{margin: '0 1vh'}}/>
                                            <img src={require('../images/he (48).jpg')} alt="Фотография 4" width="120vh" height="120vh" style={{margin: '0 1vh'}}/>
                                            <img src={require('../images/corpse (50).jpg')} alt="Фотография 4" width="120vh" height="120vh" style={{margin: '0 1vh'}}/>
                                        </p>
                                    </div>
                                </div>
                            )}
                            {selectedImage && (
                                <div className="file-upload-content">
                                    <img className="file-upload-image" alt="your image"
                                         src={URL.createObjectURL(selectedImage)}/>
                                    <div className="image-title-wrap">
                                        <button type="button" className="remove-image"
                                                onClick={() => setSelectedImage(null)}>Удалить <span
                                            className="image-title">{selectedImage.name}</span></button>
                                        <button className="file-upload-btn" type="button"
                                                onClick={importFile}>Расшифровать
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={"col"} style={{border: 'black', borderStyle:'solid', borderWidth: '2px', margin: '2vh', borderRadius: '10px'}}>
                        <div >
                            <h5 align={"center"} style={{margin: '0vh'}}><u>Результат расшифровки</u></h5>
                            {loading && (
                                <ReactLoading  type={"spinningBubbles"} color={"#673923"} height={'5%'} width={'5%'}  className={"loadingBar"}/>
                                )}
                            {!loading && (
                                <div>
                            <div style={{fontSize: '6em', display: 'table', margin: '0 auto'}}>
                                {glyph.glyphUnicode}
                            </div>
                            <div style={{display: 'table', margin: '0 auto', color: '#b02818'}}>
                                {glyph.gardinerCode}
                            </div>
                            <div>
                                <u>Описание:</u> <p style={{color: '#b02818'}}>{glyph.description}</p>
                                </div>
                                    <div>
                                        <u>Фонограмма:</u> <p style={{color: '#b02818'}}>{glyph.phonogram}</p>
                                    </div>
                                    <div>
                                        <u>Транслитерация:</u> <p style={{color: '#b02818'}}>{glyph.transliteration}</p>
                                    </div>
                                    <div>
                                        <u>Заметки:</u> <p style={{color: '#b02818'}}>{glyph.notes}</p>
                            </div>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};