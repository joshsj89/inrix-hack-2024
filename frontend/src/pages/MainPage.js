import "./stylesheets/MainPage.css"
import TrashMap from "../Components/Map";
import SideBar from "../Components/SideBar";

const MainPage = () => {
    return(
        <div class="container">
            <div id="map"><TrashMap /></div>
            <div id="sideBar"><SideBar /></div>
        </div>
    )
}

export default MainPage;