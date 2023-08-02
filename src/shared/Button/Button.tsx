import {ButtonProp} from './Button.props'

const Button = (prop: ButtonProp)=> {
    return <button type={prop.type  || "button"}>
        {prop.children}
    </button>
} 

export default Button