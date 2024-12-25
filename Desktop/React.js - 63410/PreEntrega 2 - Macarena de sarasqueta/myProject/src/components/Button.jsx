export default function Button(props) {
    const {textButtom, color, disabled, children} = props;
    
    const displayText = children === undefined ? textButtom : children;

    return (
        <button style = {{backgroundColor : color}} disabled = {disabled} className = {`btn-${color}`}>
        {displayText}
        </button>
    );
}