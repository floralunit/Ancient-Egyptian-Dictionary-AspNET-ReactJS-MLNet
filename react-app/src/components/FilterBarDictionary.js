import { useState } from "react";
import "./FilterBar.css";

const FilterBarDictionary = ({
                                onGlyphFilter,
                                onCodeFilter,
                                onTranslitFilter,
                                onDescFilter,
                            }) => {
    const [filters, setFilters] = useState({
        transliteration: "",
        gardinerCode: "",
        glyph: "",
        description: "",
    });

    const handleInput = (field) => (event) => {
        const { value } = event.target;

        setFilters({
            ...filters,
            [field]: value,
        });

        switch (field) {
            case "glyph":
                onGlyphFilter(value);
                break;
            case "gardinerCode":
                onCodeFilter(value);
                break;
            case "transliteration":
                onTranslitFilter(value);
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
                <label htmlFor="glyph" >Поиск по иероглифическому написанию</label>
                <input
                    name="glyph"
                    className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                    type = "text"
                    placeholder = "Введите иероглифы с помощью символов Юникода"
                    onChange = {handleInput("glyph")}
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
                <label htmlFor="transliteration" >Поиск по транслитерации</label>
                <input
                    name="transliteration"
                    className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                    type = "text"
                    placeholder = "Введите транслитерацию или ее часть"
                    onChange = {handleInput("transliteration")}
                />
            </form>
            <form>
                <label htmlFor="description" >Поиск по описанию </label>
                <input
                    name="description"
                    className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                    type = "text"
                    placeholder = "Введите слова для поиска в описании и заметках"
                    onChange = {handleInput("description")}
                />
            </form>
        </div>
    );
};

export default FilterBarDictionary;