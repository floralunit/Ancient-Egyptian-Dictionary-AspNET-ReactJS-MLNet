import { useState } from "react";
import "./FilterBar.css";

const FilterBarPharaoh = ({
                                onNameFilter,
                                onTranslitFilter,
                            }) => {
    const [filters, setFilters] = useState({
        transliteration: "",
        name: "",
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
            case "transliteration":
                onTranslitFilter(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <form>
                <label htmlFor="glyph" >Поиск по имени</label>
                <input
                    name="glyph"
                    className="input-reset ba b--black-20 pa1 br2 mb2 db w-100 grow helvetica black measure"
                    type = "text"
                    placeholder = "Введите имя фараона"
                    onChange = {handleInput("name")}
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
        </div>
    );
};

export default FilterBarPharaoh;