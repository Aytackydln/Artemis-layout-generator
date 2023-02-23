import { ReactElement, useState } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';

export type Props = {
    value: boolean,
    on: ReactElement,
    off: ReactElement,
    onToggled: (newValue: boolean) => void,
    buttonProps?: ButtonProps,
};

export function ToggleComponent(props: Props) {
    const [currentValue, setCurrentValue] = useState(props.value);

    return (
        <Button
            {...props.buttonProps}
            onClick={() => {
                setCurrentValue(!currentValue);
                props.onToggled(currentValue);
            }}
        >
            {currentValue ? props.on : props.off}
        </Button>
    );

}