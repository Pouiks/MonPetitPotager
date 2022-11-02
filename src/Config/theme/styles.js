import pxToRem from '../../Services/pxToRem';

const Styles = {
    radius : {
        sm : `${pxToRem(5)}`,
        nm : `${pxToRem(10)}`,
        md: `${pxToRem(15)}`,
        lg: `${pxToRem(20)}`,
        xl: `${pxToRem(30)}`,
        xxl: `${pxToRem(50)}`,
        circ : '50%'
    },
    boxShadow : {
        sm: `0 0.1rem 0.2rem rgba(0, 0, 0, 0.15), 0 1.5rem 1.5rem -1rem rgba(0, 0, 0, 0.21)`,
        md: `0 0.2rem 0.4rem rgba(0, 0, 0, 0.17), 0 1.5rem 1.5rem -1rem rgba(0, 0, 0, 0.25)`,
        lg: `0 0.2rem 0.4rem rgba(0, 0, 0, 0.19), 0 1.5rem 1.5rem -1rem rgba(0, 0, 0, 0.29)`,
        xl: `0 0 0.8rem 0 rgba(0,0,0,0.25)`,
        hover:`0 0.1rem 0.2rem rgba(0, 0, 0, 0.19), 0 1.5rem 1.5rem -1rem rgba(0, 0, 0, 0.39)`,
    },
    border:{
        sm : `${pxToRem(0.5)}`,
        nm : `${pxToRem(1)}`,
        md: `${pxToRem(2)}`,
        lg: `${pxToRem(3)}`,
        none: 'none',
    },
    padding :{
        sm : `${pxToRem(5)}`,
        nm : `${pxToRem(10)}`,
        md: `${pxToRem(15)}`,
        lg: `${pxToRem(20)}`,
        xl: `${pxToRem(30)}`,
        xxl: `${pxToRem(60)}`,
        xxxl: `${pxToRem(90)}`,

    },
    margin :{
        sm : `${pxToRem(5)}`,
        nm : `${pxToRem(10)}`,
        md: `${pxToRem(15)}`,
        lg: `${pxToRem(20)}`,
        xl: `${pxToRem(30)}`,
        xxl: `${pxToRem(40)}`,
        auto: 'auto',
        zero: 0,
    },
    textDecoration: {
        underline:'underline',
        none: 'none',
    },

    textTransform:{ 
        uppercase: 'uppercase',
        lowercase: 'lowercase'
    },
    fontStyle: {
        italic: 'italic',
    },
    textAlign:{
        left: 'left',
        right: 'right',
        center: 'center',
    }, 
    width:{
        auto: 'auto',
        fitcontent: 'fit-content',
    }

}

export default Styles