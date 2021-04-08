/* eslint-disable no-unused-vars */

const black = 'hsl(0, 0%, 0%)';
const dark = 'hsl(0, 0%, 5%)';
const green = 'hsl(125, 40%, 44%)';
const orange = 'hsl(26, 86%, 54%)';
const red = 'hsl(357, 84%, 40%)';
const white = 'hsl(0, 0%, 100%)';
const light = 'hsl(0, 0%, 95%)';
const yellow = 'hsl(44, 100%, 56%)';

const purple0 = 'hsl(266, 78%, 15%)';
const purple1 = 'hsl(266, 53%, 30%)';
const purple2 = 'hsl(266, 33%, 44%)';
const purple3 = 'hsl(266, 20%, 60%)';
const purple4 = 'hsl(266, 20%, 80%)';
const purple5 = 'hsl(266, 20%, 95%)';
const purple = purple0;

const gold = 'hsl(32, 45%, 40%)';

const green0 = 'hsl(159, 100%, 26%)';

const blue0 = 'hsl(211, 78%, 15%)';
const blue1 = 'hsl(211, 100%, 30%)';
const blue2 = 'hsl(194, 100%, 30%)';
const blue3 = 'hsl(194, 100%, 40%)';

const gray0 = 'hsl(0, 0%, 20%)';
const gray1 = 'hsl(0, 0%, 40%)';
const gray2 = 'hsl(0, 0%, 78%)';
const darkgray = gray0;
const gray = gray1;

module.exports = [
    {
        id: 'dark',
        colors: {
            primary: black,
            secondary: gold,
            text: purple5,
            border: purple5,
            background: purple,
            links: blue3,
            // primaryOffset: '#ff1447',
            // textOffset: '#818a91',
            // backgroundOffset: '#f7f7f9',
        },
    },
    {
        id: 'light',
        colors: {
            primary: purple5,
            secondary: gold,
            text: dark,
            border: dark,
            background: purple3,
            links: blue1,
            // primaryOffset: '#ff2957',
            // textOffset: '#818a91',
            // backgroundOffset: '#252526',
        },
    },
];
