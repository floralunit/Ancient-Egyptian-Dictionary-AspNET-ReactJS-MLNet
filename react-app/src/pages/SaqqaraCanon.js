import {useEffect, useState} from "react";
import "../styles/StickyTableStyle.css";
import "../styles/FilterBar.css"
import ReactLoading from "react-loading";
import FilterBarPharaoh from "../components/filters/FilterBarPharaoh";

export function SaqqaraCanon() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [allData, setData] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()

    useEffect(() => {
        fetch("https://api.ancient-egyptian-helper.ru/api/pharaohs/saqqaracanon")
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
            const fullDesc = `${item.pharaohName} ${item.englishPharaohName} ${item.nameInList}`;
            if ((fullDesc||'').toLowerCase().includes(name.toLowerCase())) {
                return item;
            }
        });

        setData(filteredData);
    };
    const handleFilterTranslit = (transliteration) => {
        const filteredData = items.filter((item) => {
            if ((item.transliteration||'').toLowerCase().includes(transliteration.toLowerCase())) {
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
            <div className={"pharaohs"}>
                <div className={"empty"}/>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col"}>
                            <div style={{margin: '0 auto', width: '90vh'}}>
                                <table className="content-table"
                                       style={{minHeight: '40vh', margin: '0 auto', width: '90vh'}}>
                                    <thead>
                                    <tr>
                                        <th/>
                                        <th>Картуш</th>
                                        <th>Имя в списке</th>
                                        <th>Транслитерация</th>
                                        <th>Фараон (ссылка на Wiki)</th>
                                        <th>Фараон (ссылка на pharaoh.se)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allData.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td><img src={`https://pharaoh.se/i/sc/${item.id}.png`} height={"25vh"}/></td>
                                            <td>{item.nameInList}</td>
                                            <td>{item.transliteration}</td>
                                            <td><a href={item.wikiLink}>{item.pharaohName}</a></td>
                                            <td><a href={item.pharaohSeLink}>{item.englishPharaohName}</a></td>
                                        </tr>)}
                                    </tbody>

                                </table>
                                <div className={"empty"}/>
                            </div>
                        </div>
                        <div className={"col"}>
                            <div style={{background: '#FBEEC1', borderRadius: '10px', padding: '2vh'}}>
                                <h2 align={"center"} className={"black"}>Саккарский список</h2>
                                <hr/>
                                <FilterBarPharaoh
                                    onNameFilter={handleFilterName}
                                    onTranslitFilter={handleFilterTranslit}
                                />
                                <div>
                                    <i>Саккарский список</i> — перечень 58 египетских царей от Аджиба и Каа (I династия) до Рамзеса II (XIX династия), в правление которого он и был составлен.
                                    Происходит из гробницы зодчего Тунари, который руководил строительными работами Рамзеса II.
                                    Многие фараоны в списке пропущены составителем по не всегда ясным соображениям. Так, из всей III династии упоминаются только четыре правителя. Саккарский список, обнаруженный в 1861 году, находится в собрании Каирского музея.
                                    <p/>
                                    Иногда Саккарским списком называют полустёртый перечень фараонов VI династии, найденный в 1932 г. на крышке саркофага Анхесенпепи I — супруги фараона Пепи I.
                                    <p/>
                                    <img src={require('../images/saqqara.png')}  style={{margin:'1vh auto', display: 'block'}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}