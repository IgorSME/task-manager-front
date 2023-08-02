import { NavLink } from 'react-router-dom'
import {LinkButtonProp} from './LinkButton.props'

const LinkButton = (prop: LinkButtonProp)=> {
    return <NavLink to={prop.link}>
 {prop.children}
    </NavLink>
    
} 

export default LinkButton