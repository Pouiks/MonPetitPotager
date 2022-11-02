import pxToRem from '../../Services/pxToRem'

const fonts = {
    family: {
        sans:'DM sans, sans-serif'
    },

    weight : {
        regular : '400',
        medium: '500',
        bold: '700'
    },
    size: {
        h1: `${pxToRem(30)}`,
        h2: `${pxToRem(25)}`,
        h3: `${pxToRem(20)}`,
        description: `${pxToRem(16)}`,
        paragraph:`${pxToRem(14)}`,
        itemMenu: `${pxToRem(18)}`,
    },
    lineHeight: {

    }
}

export default fonts