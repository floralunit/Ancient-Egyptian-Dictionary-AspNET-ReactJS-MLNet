import {useEffect, useState} from "react";
import FilterBar from "../components/FilterBar";
import "./StickyTableStyle.css";
import "../components/FilterBar.css"

export function God() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [allData, setData] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()

    useEffect(() => {
        fetch("https://api.ancient-egyptian-helper.ru/api/gods/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    setData(result);
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
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
            if ((item.gardinerCode||'').toLowerCase().includes(gardinerCode.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterGlyph = (hieroglyphic) => {
        const filteredData = items.filter((item) => {
            if ((item.hieroglyphic||'').toLowerCase().includes(hieroglyphic.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
/*    const handleFilterTranslit = (transliteration) => {
        const filteredData = items.filter((item) => {
            if ((item.transliteration||'').toLowerCase().includes(transliteration.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterView = (view) => {
        const filteredData = items.filter((item) => {
            if ((item.view||'').toLowerCase().includes(view.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };*/
    const handleFilterDescription = (description) => {

        const filteredData = items.filter((item) => {
            const fullDesc = `${item.description} ${item.type} ${item.view}`;
            if ((fullDesc||'').toLowerCase().includes(description.toLowerCase())) {
                return item;
            }
        });
        setData(filteredData);
    };

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className={"gods"}>
                <div className={"empty"}/>
                <div className={"filterbar"}>
                    <h2 align={"center"} className={"black"}>Древнеегипетские божества</h2>
                    <table >
                        <td width={"40%"}>
                            <FilterBar
                                onNameFilter={handleFilterName}
                                onCodeFilter={handleFilterCode}
                                onGlyphFilter={handleFilterGlyph}
                                onDescFilter={handleFilterDescription}
                            />
                        </td>
                        <td style={{padding: '0.5vh'}}>
                            <div >
                                <img src={require('../images/osiris.jpg')} style={{float: 'right', margin: '1vh'}} height={"200vh"}/>
                                Древнеегипетские божества - это боги и богини, которым поклонялись в Древнем Египте. Верования и ритуалы, окружающие этих богов, составили ядро древнеегипетской религии, возникшей где-то в доисторические времена.
                                Божества олицетворяли природные силы и явления, и египтяне поддерживали и умиротворяли их с помощью подношений и ритуалов, чтобы эти силы продолжали функционировать в соответствии с маат, или божественным порядком.
                                После основания египетского государства около 3100 года до нашей эры полномочия по выполнению этих задач контролировались фараоном, который утверждал, что является представителем богов и управлял храмами, где проводились ритуалы.
                            </div>
                        </td>
                    </table>
                </div>
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
                        <td style={{fontSize: '2em'}}>{item.hieroglyphic}</td>
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