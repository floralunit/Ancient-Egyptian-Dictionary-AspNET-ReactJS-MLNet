import React from 'react'
import '../styles/App.css'

export function About() {
    return (
        <div className="about">
            <div className={"empty"}/>
            <div className={"filterbar"} style={{maxWidth: '120vh'}}>
                <h2 align={"center"} className={"black"}>Древнеегипетский справочник</h2>
                <hr/>
                <div>
                    <img src={require('../images/favicon.ico')} style={{float: 'right'}} height={"120px"}/>
                    Древнеегипетский справочник призван стать вашим помощником изучении и практике перевода с древнеегипетского языка.<p/>
                    Используйте словарь иероглифов для поиска нужного вам иероглифа и объяснения его значения.
                    На сайте также присутсвует справочник древнеегипетских божеств и фараонов, чтобы вся нужная вам информация была в одном месте.<p/>
                    Вы можете воспользоваться расшифратором иероглифов по фото, способным по вашему изображению выдать информацию об иероглифе.
                    Расшифратор находится в активной разработке и будет улучшаться!<p/>
                </div>
                <hr/>
                <div style={{fontSize: '2vh'}}>
                    <a style={{color: '#673923'}}>Developed by:</a> Anna Yaskunova (tg: @floralunit, vk: @floralunit) <p/>
                </div>
            </div>
        </div>
    );
}
