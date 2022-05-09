import {useEffect, useState} from "react";
import "../components/StickyTableStyle.css";
import "../components/FilterBar.css"
import "../components/TabsStyle.css"
import FilterBarDictionary from "../components/FilterBarDictionary";

export function Dictionary() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [allData, setData] = useState([]);
    const [categoriums, setCategoriums] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()

    useEffect(() => {
        fetch("https://api.ancient-egyptian-helper.ru/api/glyphs/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    const filteredData = result.filter((item) => {
                        if ((item.categoria||'') === 'A') {
                            return item;
                        }
                    });
                    setData(filteredData);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    useEffect(() => {
        fetch("https://api.ancient-egyptian-helper.ru/api/categoriums/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
/*                    const convert = JSON.parse(result);*/
                    const convert = [];
                    const keys = Object.keys(result);
                    keys.forEach(function(key){
                        convert.push(result[key]);
                    });
                    setCategoriums(convert);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    const handleFilterGlyph = (glyph) => {
        const filteredData = items.filter((item) => {
            if ((item.glyphUnicode||'').toLowerCase().includes(glyph.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterCode = (gardinerCode) => {
        const filteredData = items.filter((item) => {
            if ((item.gardinerCode||'').toLowerCase().includes(gardinerCode.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterTranslit = (transliteration) => {
        const filteredData = items.filter((item) => {
            const fullTranslit = `${item.transliteration} ${item.phonogram}`;
            if ((fullTranslit||'').toLowerCase().includes(transliteration.toLowerCase())) {
                return item;
            }
        });
        setData(filteredData);
    };
    const handleFilterDesc = (description) => {
        const filteredData = items.filter((item) => {
            const fullDesc = `${item.description} ${item.notes}`;
            if ((fullDesc||'').toLowerCase().includes(description.toLowerCase())) {
                return item;
            }
        });
        setData(filteredData);
    };

    const [toggleState, setToggleState] = useState('A');
    const [categoriaName, setCategoriaName] = useState('Мужчина и его занатия');

    const toggleTab = (categoria) => {
        setToggleState(categoria);

        const filteredData = items.filter((item) => {
            if ((item.categoria||'') === categoria) {
                return item;
            }
        });
        setData(filteredData);
        let cat = categoriums.find(item => item.categoria === categoria);
        setCategoriaName('Категория ' + categoria + ': ' + cat.name);
    };
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className={"dictionary"}>
                <div className={"empty"}/>

                <div className={"filterbar"}>
                    <h2 align={"center"} className={"black"}>Словарь древнеегипетских иероглифов</h2>
                    <table>
                        <td style={{padding: '0.5vh'}}>
                            <div >
                                <i>Список знаков Гардинера</i> - это список распространенных египетских иероглифов, составленный Аланом Гардинером. Он считается стандартным справочником при изучении древнеегипетских иероглифов.
                                <br /><br />Гардинер перечисляет только общие формы египетских иероглифов, но он включает обширные подкатегории, а также вертикальные и горизонтальные формы для многих иероглифов.
                                Он включает формы изменения размера, чтобы помочь с чтением иероглифов в бегущих блоках текста. В отличие от этого, например, справочник Баджа содержит около 1000 иероглифов, перечисленных на 50 страницах, но без изменений размера.
                            </div>
                        </td>
                        <td width={"40%"}>
                            <FilterBarDictionary
                                onGlyphFilter={handleFilterGlyph}
                                onCodeFilter={handleFilterCode}
                                onTranslitFilter={handleFilterTranslit}
                                onDescFilter={handleFilterDesc}
                            />
                        </td>
                    </table>
                </div>
                <div style={{margin: '0 auto', width: '180vh'}}>
                        <h5 className={"headerTab"}>{categoriaName}</h5>
                    <div className="bloc-tabs">
                        <button
                            className={toggleState === 'A' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('A')}>A
                        </button>
                        <button
                            className={toggleState === 'B' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('B')}>B
                        </button>
                        <button
                            className={toggleState === 'C' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('C')}>C
                        </button>
                        <button
                            className={toggleState === 'D' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('D')}>D
                        </button>
                        <button
                            className={toggleState === 'E' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('E')}>E
                        </button>
                        <button
                            className={toggleState === 'F' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('F')}>F
                        </button>
                        <button
                            className={toggleState === 'G' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('G')}>G
                        </button>
                        <button
                            className={toggleState === 'H' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('H')}>H
                        </button>
                        <button
                            className={toggleState === 'I' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('I')}>I
                        </button>
                        <button
                            className={toggleState === 'K' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('K')}>K
                        </button>
                        <button
                            className={toggleState === 'L' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('L')}>L
                        </button>
                        <button
                            className={toggleState === 'M' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('M')}>M
                        </button>
                        <button
                            className={toggleState === 'N' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('N')}>N
                        </button>
                        <button
                            className={toggleState === 'O' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('O')}>O
                        </button>
                        <button
                            className={toggleState === 'P' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('P')}>P
                        </button>
                        <button
                            className={toggleState === 'Q' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('Q')}>Q
                        </button>
                        <button
                            className={toggleState === 'R' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('R')}>R
                        </button>
                        <button
                            className={toggleState === 'S' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('S')}>S
                        </button>
                        <button
                            className={toggleState === 'T' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('T')}>T
                        </button>
                        <button
                            className={toggleState === 'U' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('U')}>U
                        </button>
                        <button
                            className={toggleState === 'V' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('V')}>V
                        </button>
                        <button
                            className={toggleState === 'W' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('W')}>W
                        </button>
                        <button
                            className={toggleState === 'X' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('X')}>X
                        </button>
                        <button
                            className={toggleState === 'Y' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('Y')}>Y
                        </button>
                        <button
                            className={toggleState === 'Z' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('Z')}>Z
                        </button>
                        <button
                            className={toggleState === 'Aa' ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab('Aa')}>Aa
                        </button>
                    </div>
                    <table className="content-table" style={{minHeight: '40vh', margin: '0 auto', width: '180vh'}}>
                        <thead>
                        <tr>
                            <th>Иероглиф</th>
                            <th>Юникод</th>
                            <th>Код Гардинера</th>
                            <th>Описание</th>
                            <th>Фонограмма</th>
                            <th>Транслитерация</th>
                            <th>Заметки</th>
                        </tr>
                        </thead>
                        <tbody>
                        {allData.map(item =>
                            <tr key={item.gardinerCode}>
                                <td style={{fontSize: '4em'}}>{item.glyphUnicode}</td>
                                <td>{item.unicodeString}</td>
                                <td>{item.gardinerCode}</td>
                                <td>{item.description}</td>
                                <td>{item.phonogram}</td>
                                <td>{item.transliteration}</td>
                                <td>{item.notes}</td>
                            </tr>)}
                        </tbody>

                    </table>
                    <div className={"empty"}/>
                </div>
            </div>
        );
    }
}