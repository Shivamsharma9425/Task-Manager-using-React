import { Suspense } from "react"; //use in dynamic rendering, it only renders the component when it is called. it also has a fallback attribute
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; //use so that we can connect our application with browserURL, 
import { StyleSheetManager } from "styled-components"; //to make styled components

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Suspense fallback={<div>Loading...</div>}>
		<BrowserRouter>
			<StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
				<App />
			</StyleSheetManager>
		</BrowserRouter>
	</Suspense>
);