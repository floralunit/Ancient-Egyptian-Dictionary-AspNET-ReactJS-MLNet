import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";

export function God() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Примечание: пустой массив зависимостей [] означает, что
    // этот useEffect будет запущен один раз
    // аналогично componentDidMount()
    useEffect(() => {
        fetch("https://localhost:7059/api/gods/all")
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
            <div className={"gods1"}>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Код Гардинера</th>
                    <th>Вид</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item =>
                    <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.gardinerCode}</td>
                        <td>{item.view}</td>
                    </tr>)}
                </tbody>

            </Table>
            </div>
        );
    }
}