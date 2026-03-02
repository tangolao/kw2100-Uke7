// @ts-ignore
import {createRoot} from "react-dom/client";

function Application() {
    return <div>A map Application</div>;
}

createRoot(document.getElementById("app")!).render(<Application />);