import React, { Component } from 'react';
import Screen from './components/Screen';
import Loader from './components/Loader';
import charaImg from './sprites/chara.png';
import sheetImg from './sprites/sheet.png';


export default class App extends Component {
    constructor(props) {
        super(props)

        const sheets = [
            {
                name: 'chara',
                src: charaImg,
                spriteWidth: 20,
                spriteHeight: 20,
            },
            {
                name: 'sheet',
                src: sheetImg,
                spriteWidth: 16,
                spriteHeight: 16,
            },
        ];
        const sprites = Array(1).fill(0).map((_,i)=>i).map(i=>({
            key: Math.random(),
            sheet: sheets.find(s=>s.name==='chara'),
            sprite: 0,
            x: i+50,
            y: Math.random()*50,
        }))

        this.state = { sheets, sprites };
    }

    loop() {
        this.setState({
            sprites: this.state.sprites.map(s => ({
                ...s,
                x: s.x+Math.sin(Date.now()/300),
                sprite: Math.floor(Date.now() / 500) % 3
            }))
        })
        window.requestAnimationFrame(() => this.loop());
    }

    render() {
        return (
            <div style={{backgroundColor:'grey', width: 600, height: 600}}>
                <Loader sheets={this.state.sheets} onready={() => this.loop()} render={() => (
                    <Screen sprites={this.state.sprites}/>
                )}/>
            </div>
        );
    }
}
