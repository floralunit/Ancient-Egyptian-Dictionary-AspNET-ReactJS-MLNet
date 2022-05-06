import {useEffect, useState} from "react";
import "./StickyTableStyle.css";

export function God() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className={"gods"}>
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
                {items.map(item =>
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