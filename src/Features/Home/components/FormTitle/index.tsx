export const FormTitle = (props: { title: string; center?: boolean }) => {
    return (
        <h3
            className={`user-select-none fw-bold${
                props.center && ' text-center'
            }`}
        >
            {props.title}
        </h3>
    );
};
