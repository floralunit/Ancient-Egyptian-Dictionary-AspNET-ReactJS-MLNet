import { useState } from "react";
import "../../styles/FilterBar.css";

const FilterBarGod = ({
                       onNameFilter,
                       onCodeFilter,
                       onGlyphFilter,
                       onDescFilter,
                   }) => {
    const [filters, setFilters] = useState({
        name: "",
        gardinerCode: "",
        hieroglyphic: "",
        description: "",
    });

    const handleInput = (field) => (event) => {
        const { value } = event.target;

        setFilters({
            ...filters,
            [field]: value,
        });

        switch (field) {
            case "name":
                onNameFilter(value);
                break;
            case "gardinerCode":
                onCodeFilter(value);
                break;
            case "hieroglyphic":
                onGlyphFilter(value);
                break;
            case "description":
                onDescFilter(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
                <form>
                    <label htmlFor="name" >Поиск по имени</label>
                    <input
                        name="name"
                        className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                        type = "text"
                        placeholder = "Введите имя бога или его часть"
                        onChange = {handleInput("name")}
                    />
                </form>
            <form >
                <label htmlFor="code" >Поиск по коду Гардинера</label>
                <input
                    name="code"
                    className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                    type = "text"
                    placeholder = "Введите код Гардинера или его часть"
                    onChange = {handleInput("gardinerCode")}
                />
            </form>
            <form>
                <label htmlFor="hieroglyphic" >Поиск по иероглифическому написанию</label>
                <input
                    name="hieroglyphic"
                    className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                    type = "text"
                    placeholder = "Введите иероглифы с помощью символов Юникода"
                    onChange = {handleInput("hieroglyphic")}
                />
            </form>
            <form>
                <label htmlFor="description" >Поиск по функциям и описанию</label>
                <input
                    name="description"
                    className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                    type = "text"
                    placeholder = "Введите часть описания или функций"
                    onChange = {handleInput("description")}
                />
            </form>
        </div>
    );
};

export default FilterBarGod;