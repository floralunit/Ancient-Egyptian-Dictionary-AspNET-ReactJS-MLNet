import { useEffect, useState } from "react";
import FilterBarGod from "../components/filters/FilterBarGod";
import "../styles/StickyTableStyle.css";
import "../styles/FilterBar.css"
import ReactLoading from "react-loading";
import { API_URL } from "../global-const.js";
import data from "../jsons/gods.json";

export function God() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [allData, setData] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()

    // useEffect(() => {
    //     fetch(`${API_URL}/gods/all`)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setIsLoaded(true);
    //                 setItems(result);
    //                 setData(result);
    //             },
    //             // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    //             // чтобы не перехватывать исключения из ошибок в самих компонентах.
    //             (error) => {
    //                 setIsLoaded(true);
    //                 setError(error);
    //             }
    //         )
    // }, [])
    useEffect(() => {
        if (allData.length === 0) {
            setIsLoaded(true);
            setItems(data);
            setData(data);
        };
    })
    const handleFilterName = (name) => {
        const filteredData = items.filter((item) => {
            if (item.name.toLowerCase().includes(name.toLowerCase())) {
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
    const handleFilterGlyph = (hieroglyphic) => {
        const filteredData = items.filter((item) => {
            if ((item.hieroglyphic || '').toLowerCase().includes(hieroglyphic.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterDescription = (description) => {

        const filteredData = items.filter((item) => {
            const fullDesc = `${item.description} ${item.type} ${item.view}`;
            if ((fullDesc || '').toLowerCase().includes(description.toLowerCase())) {
                return item;
            }
        });
        setData(filteredData);
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className={"loadingDiv"}><ReactLoading type={"spinningBubbles"} color={"#673923"} height={'5%'} width={'5%'} className={"loadingBar"} /></div>;
    } else {
        return (
            <div className={"gods"}>
                <div className={"empty"} />
                <div className={"filterbar"}>
                    <h2 align={"center"} className={"black"}>Древнеегипетские божества</h2>
                    <hr />
                    <table>
                        <td style={{ padding: '0.5vh', verticalAlign: 'middle' }}>
                            <div >
                                <img src={require('../images/osiris.jpg')} style={{ float: 'right', margin: '2vh 4vh' }} height={"200vh"} />
                                Древнеегипетские божества - это боги и богини, которым поклонялись в Древнем Египте. Верования и ритуалы, окружающие этих богов, составили ядро древнеегипетской религии, возникшей где-то в доисторические времена.
                                Божества олицетворяли природные силы и явления, и египтяне поддерживали и умиротворяли их с помощью подношений и ритуалов, чтобы эти силы продолжали функционировать в соответствии с маат, или божественным порядком.
                                После основания египетского государства около 3100 года до нашей эры полномочия по выполнению этих задач контролировались фараоном, который утверждал, что является представителем богов и управлял храмами, где проводились ритуалы.
                            </div>
                        </td>
                        <td width={"40%"}>
                            <FilterBarGod
                                onNameFilter={handleFilterName}
                                onCodeFilter={handleFilterCode}
                                onGlyphFilter={handleFilterGlyph}
                                onDescFilter={handleFilterDescription}
                            />
                        </td>
                    </table>
                </div>
                <div className={"empty"} />
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Код Гардинера</th>
                            <th>Иероглифическое написание</th>
                            <th>Транслитерация</th>
                            <th>Категория</th>
                            <th>Функции</th>
                            <th>Описание</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map(item =>
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.gardinerCode}</td>
                                <td style={{ fontSize: '2em' }}>{item.hieroglyphic}</td>
                                <td>{item.transliteration}</td>
                                <td>{item.type}</td>
                                <td>{item.description}</td>
                                <td>{item.view}</td>
                            </tr>)}
                    </tbody>

                </table>
            </div>
        );
    }
}