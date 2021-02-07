import { produce } from 'immer';
import { useCallback, useState } from 'react';

function useObjectState({ initialValue = {}, notNeedSetState = true }) {
    const [objState, setObjState] = useState(initialValue);
    const handleObjState = useCallback(
        (path, value) =>
            setObjState(
                produce((draft) => {
                    _.set(draft, path, value);
                })
            ),
        []
    );
    if (notNeedSetState) return { objState, handleObjState };
    return { objState, setObjState, handleObjState };
}

export default useObjectState;
