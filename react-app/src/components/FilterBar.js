import { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({
                       onNameFilter,
                       onCodeFilter,
                       onTranslitFilter,
                       onGlyphFilter,
                       onDescFilter,
                       onViewFilter,
                   }) => {
    const [filters, setFilters] = useState({
        name: "",
        gardinerCode: "",
        hieroglyphic: "",
        transliteration: "",
        description: "",
        view: ""
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
            case "transliteration":
                onTranslitFilter(value);
                break;
            case "description":
                onDescFilter(value);
                break;
            case "view ":
                onViewFilter(value);
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
{/*            <div className="col-sm-12 my-2">
                <label htmlFor="transliteration">Поиск по транслитерации</label>
                <input
                    type="text"
                    className="form-control"
                    id="transliteration"
                    onChange={handleInput("transliteration")}
                />
            </div>*/}

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
{/*            <div className="col-sm-12 my-2">
                <label htmlFor="view">Поиск по описанию</label>
                <input
                    type="text"
                    className="form-control"
                    id="view"
                    onChange={handleInput("view")}
                />
            </div>*/}
        </div>
    );
};

export default FilterBar;