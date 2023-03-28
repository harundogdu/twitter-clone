import {useEffect, useState} from "react";

interface IWindowSize {
    width: number | undefined;
    height: number | undefined;
}

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return windowSize;
};

export default useWindowSize;