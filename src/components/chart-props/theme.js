
const default_color = [
    '#7cb5ec',
    '#434348',
    '#90ed7d',
    '#f7a35c',
    '#8085e9',
    '#f15c80',
    '#e4d354',
    '#2b908f',
    '#f45b5b',
    '#91e8e1',
]

const guanyi = [
    '#4cb2ff',
    '#ffdb33',
    '#447ee9',
    '#ffa633',
    '#7ebc59',
    '#a593e0',
    '#a3c9c7',
    '#475f77',
]

const grid_light = [
    '#7cb5ec',
    '#f7a35c',
    '#90ee7e',
    '#7798BF',
    '#aaeeee',
    '#ff0066',
    '#eeaaee',
    '#55BF3B',
    '#DF5353',
    '#7798BF',
    '#aaeeee',
]

const dark_blue = [
    '#DDDF0D',
    '#55BF3B',
    '#DF5353',
    '#7798BF',
    '#aaeeee',
    '#ff0066',
    '#eeaaee',
    '#55BF3B',
    '#DF5353',
    '#7798BF',
    '#aaeeee',
]

const grid = [
    '#058DC7',
    '#50B432',
    '#ED561B',
    '#DDDF00',
    '#24CBE5',
    '#64E572',
    '#FF9655',
    '#FFF263',
    '#6AF9C4',
]

const sand_signika = [
    '#f45b5b',
    '#8085e9',
    '#8d4654',
    '#7798BF',
    '#aaeeee',
    '#ff0066',
    '#eeaaee',
    '#55BF3B',
    '#DF5353',
    '#7798BF',
    '#aaeeee',
]

const skies = [
    '#514F78',
    '#42A07B',
    '#9B5E4A',
    '#72727F',
    '#1F949A',
    '#82914E',
    '#86777F',
    '#42A07B',
]

const gradient_green = [
    '#C7CCAC',
    '#B2C6A1',
    '#9EBF96',
    '#89B98A',
    '#74B37F',
    '#60AC74',
    '#4BA669',
    '#36A05D',
    '#229952',
    '#0D9347',
]

const gradient_blue = [
    '#A3CCF8',
    '#99C2F3',
    '#8FB8EE',
    '#85AEE8',
    '#7BA4E3',
    '#729ADE',
    '#6890D9',
    '#5E86D3',
    '#547CCE',
    '#4A72C9',
]

const gradient_purple = [
    '#D3C3DB',
    '#C8B8D6',
    '#BDADD1',
    '#B3A2CC',
    '#A897C7',
    '#9D8CC3',
    '#9281BE',
    '#8876B9',
    '#7D6BB4',
    '#7260AF',
]

const gradient_grey = [
    '#CBD3DA',
    '#BEC7CF',
    '#B2BCC5',
    '#A5B0BA',
    '#99A4B0',
    '#8C99A5',
    '#808D9B',
    '#738190',
    '#677686',
    '#5A6A7B',
]

const gradient_golden = [
    '#FAD961',
    '#FACD59',
    '#F9C152',
    '#F9B44A',
    '#F9A842',
    '#F89C3B',
    '#F89033',
    '#F8832B',
    '#F77724',
    '#F76B1C',
]




const THEME_COLORS = {
    DEFAULT_COLOR: 'DEFAULT_COLOR',
    DARK_BLUE: 'DARK_BLUE',
    GRID: 'GRID',
    GRID_LIGHT: 'GRID_LIGHT',
    SAND_SIGNIKA: 'SAND_SIGNIKA',
    SKIES: 'SKIES',
    GUANYI: 'GUANYI',
    GRADIENT_BLUE: 'GRADIENT_BLUE',
    GRADIENT_GOLDEN: 'GRADIENT_GOLDEN',
    GRADIENT_GREEN: 'GRADIENT_GREEN',
    GRADIENT_GREY: 'GRADIENT_GREY',
    GRADIENT_PINK: 'GRADIENT_PINK',
    GRADIENT_PURPLE: 'GRADIENT_PURPLE',
}

const NORMAL_THEME_COLOR_TEMPLATE = {
    [THEME_COLORS.DEFAULT_COLOR]: default_color,
    [THEME_COLORS.GUANYI]: guanyi,
    [THEME_COLORS.DARK_BLUE]: dark_blue,
    [THEME_COLORS.GRID]: grid,
    [THEME_COLORS.GRID_LIGHT]: grid_light,
    [THEME_COLORS.SAND_SIGNIKA]: sand_signika,
    [THEME_COLORS.SKIES]: skies,
}
const ColoredTheme = NORMAL_THEME_COLOR_TEMPLATE

const GRADIENT_THEME_COLOR_TEMPLATE = {
    [THEME_COLORS.GRADIENT_BLUE]: gradient_blue,
    [THEME_COLORS.GRADIENT_GOLDEN]: gradient_golden,
    [THEME_COLORS.GRADIENT_GREEN]: gradient_green,
    [THEME_COLORS.GRADIENT_GREY]: gradient_grey,
    [THEME_COLORS.GRADIENT_PINK]: gradient_grey,
    [THEME_COLORS.GRADIENT_PURPLE]: gradient_purple,
}

const ALL_THEME_COLOR_TEMPLATE = {
    ...NORMAL_THEME_COLOR_TEMPLATE,
    ...GRADIENT_THEME_COLOR_TEMPLATE,
}

const getThemeColors = theme => (theme && ALL_THEME_COLOR_TEMPLATE[theme]) || ALL_THEME_COLOR_TEMPLATE.DEFAULT_COLOR

const getThemeColorsCustomized = (theme, customizedColors = []) => (
    customizedColors.reduce((result, c, i) => {
        if (c) {
            result[i] = c
        }
        return result
    }, getThemeColors(theme) || [])
)


export function getColors (rawData) {
    const { props } = rawData.data.chartMain
    const themeColor = (props && props.themeColor) || {}

    return getThemeColorsCustomized(themeColor.theme, themeColor.colors)
}