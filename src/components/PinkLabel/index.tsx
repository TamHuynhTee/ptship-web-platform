export const ColorLabel = (props: { for: string; title: string }) => {
    return (
        <label htmlFor={props.for} className="form-label color-label">
            {props.title}
        </label>
    );
};
