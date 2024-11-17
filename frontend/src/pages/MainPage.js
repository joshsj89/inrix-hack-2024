import "./stylesheets/MainPage.css"
import TrashMap from "../Components/Map";

const MainPage = () => {
    return(
        <div class="container">
            <div id="titleBar">Our App Name</div>
            <div id="map"><TrashMap /></div>
        </div>
    )
}

export default MainPage;