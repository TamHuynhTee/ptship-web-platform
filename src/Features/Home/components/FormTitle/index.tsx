export const FormTitle = (props: {
    title: string;
    center?: boolean | false;
    bold?: boolean | false;
}) => {
    const { title, center, bold } = props;
    return (
        <h3
            className={`user-select-none ${center && 'text-center'} ${
                bold && 'fw-bold'
            }`}
        >
            {title}
        </h3>
    );
};
