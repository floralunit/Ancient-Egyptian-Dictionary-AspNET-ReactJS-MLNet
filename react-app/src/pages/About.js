import React from 'react'

export function About() {
    return (
        <div className="about">
            <div className={"empty"}/>
            <div style={{background: '#FBEEC1', borderRadius: '10px', padding: '2vh', margin: 'auto 30vh'}}>
                <h2 align={"center"} className={"black"}>Древнеегипетский справочник</h2>
                <hr/>
                <div style={{fontSize: '2.5vh'}}>
                    <img src={require('../images/favicon.ico')} style={{float: 'right', margin: '2vh 4vh'}} height={"200vh"}/>
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
