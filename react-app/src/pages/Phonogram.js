import {useEffect, useState} from "react";
import "../components/StickyTableStyle.css";
import "../components/FilterBar.css"
import "../components/TabsStyle.css"
import FilterBarPhonogram from "../components/FilterBarPhonogram";
import ReactLoading from "react-loading";

export function Phonogram() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [allData, setData] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()

    useEffect(() => {
        fetch("https://api.ancient-egyptian-helper.ru/api/phonograms/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    const filteredData = result.filter((item) => {
                        if ((item.type || '').toLowerCase().includes('alphabet')) {
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
    const handleFilterGlyph = (glyph) => {
        const filteredData = items.filter((item) => {
            if ((item.glyph || '').toLowerCase().includes(glyph.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterCode = (gardinerCode) => {
        const filteredData = items.filter((item) => {
            if ((item.gardinerCode || '').toLowerCase().includes(gardinerCode.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterTranslit = (transliteration) => {
        const filteredData = items.filter((item) => {
            const fullTranslit = `${item.transliteration} ${item.manuelCotage}`;
            if ((fullTranslit || '').toLowerCase().includes(transliteration.toLowerCase())) {
                return item;
            }
        });
        setData(filteredData);
    };

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
        let type;
        switch (index) {
            case 1:
                type = 'alphabet';
                break;
            case 2:
                type = 'biliteral';
                break;
            case 3:
                type = 'triliteral';
                break;
            default:
                break;
        }
        const filteredData = items.filter((item) => {
            if ((item.type || '').toLowerCase().includes(type)) {
                return item;
            }
        });
        setData(filteredData);
    };
    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={"loadingDiv"}><ReactLoading type={"spinningBubbles"} color={"#673923"} height={'5%'}
                                                           width={'5%'} className={"loadingBar"}/></div>;
    } else {
        return (
            <div className={"phonograms"}>
                <div className={"empty"}/>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <div style={{background: '#FBEEC1', borderRadius: '10px', padding: '2vh'}}>
                                <h2 align={"center"} className={"black"}>Фонограммы</h2>
                                <hr/>
                                <div>
                                    Среди египетских иероглифов различают две основные группы символов: звуковые
                                    знаки (фонограммы) и смысловые знаки (идеограммы).
                                    Фонограммы или звуковые знаки бывают трёх типов:
                                    <ol>
                                        <li style={{margin: '0.5em'}}><i>Односогласные или алфавитные знаки</i>,
                                            которые обозначают один согласный звук, например f , r.
                                            <br/>ПРИМЕЧАНИЕ: алфавитными этот тип знаков можно назвать только
                                            условно, поскольку алфавита в нашем понимании этого слова у египтян
                                            не было.
                                        </li>
                                        <li style={{margin: '0.5em'}}><i>Двусогласные знаки</i>, обозначающие
                                            два согласных звука, например m + n (или кратко, mn); p + r (pr).
                                        </li>
                                        <li style={{margin: '0.5em'}}><i>Трёхсогласные знаки</i>, обозначающие
                                            три согласных звука, например, nfr ; Htp.
                                        </li>
                                    </ol>
                                </div>
                                <FilterBarPhonogram
                                    onGlyphFilter={handleFilterGlyph}
                                    onCodeFilter={handleFilterCode}
                                    onTranslitFilter={handleFilterTranslit}
                                />
                            </div>
                        </div>
                        <div className={"col"}>
                            <div style={{margin: '0 auto', width: '90vh'}}>
                                <div className="bloc-tabs" style={{margin: '2vh auto'}}>
                                    <button
                                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                                        onClick={() => toggleTab(1)}
                                    >
                                        Алфавит
                                    </button>
                                    <button
                                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                                        onClick={() => toggleTab(2)}
                                    >
                                        Двухсогласные знаки
                                    </button>
                                    <button
                                        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                                        onClick={() => toggleTab(3)}
                                    >
                                        Трехсогласные знаки
                                    </button>
                                </div>
                                <table className="content-table"
                                       style={{minHeight: '40vh', margin: '0 auto', width: '90vh'}}>
                                    <thead>
                                    <tr>
                                        <th>Иероглиф</th>
                                        <th>Код Гардинера</th>
                                        <th>Транслитерация</th>
                                        <th>Manuel de Codage</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allData.map(item =>
                                        <tr key={item.id}>
                                            <td style={{fontSize: '4em'}}>{item.glyph}</td>
                                            <td>{item.gardinerCode}</td>
                                            <td>{item.transliteration}</td>
                                            <td>{item.manuelCotage}</td>
                                        </tr>)}
                                    </tbody>

                                </table>
                                <div className={"empty"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}