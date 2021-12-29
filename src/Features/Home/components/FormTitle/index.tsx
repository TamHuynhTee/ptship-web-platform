export const FormTitle = (props: {
    title: string;
    center?: boolean;
    bold?: boolean;
}) => {
    const { title, center, bold } = props;
    return (
        <h3
            className={`user-select-none fw-bold${center && ' text-center'}${
                bold && ' fw-bold'
            }`}
        >
            {title}
        </h3>
    );
};
