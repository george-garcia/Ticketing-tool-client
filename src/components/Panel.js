import classNames from "classnames";
import './Panel.css';

const Panel = ({ children, className, ...rest }) => {
    const finalClassNames = classNames('panel',
        className);

    return <div {...rest} className={finalClassNames}>{children}</div>
}

export default Panel;