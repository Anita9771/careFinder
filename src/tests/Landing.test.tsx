import { shallow } from "enzyme";
import { Landing } from "../pages";

/*
Code Analysis

Objective:
The Landing function is the main component of the landing page of the CareFinder web application. Its objective is to render the landing page UI, handle user input for searching hospitals by region, and provide links to other pages of the application.

Inputs:
- None

Flow:
- The function initializes the search state using the useState hook.
- It uses the useNavigate hook from the react-router-dom library to handle navigation to the search-region page when the user searches for hospitals by region.
- The handleSearch function is called when the user clicks the search icon. It checks if the search input is not empty and navigates to the search-region page with the search input as a state.
- The function renders the UI for the landing page, including the navbar, hero section, search section, about section, services section, testimonials section, and footer section.

Outputs:
- The rendered UI for the landing page of the CareFinder web application.

Additional aspects:
- The function uses the FontAwesomeIcon component from the @fortawesome/react-fontawesome library to render icons.
- It uses the Link component from the react-router-dom library to provide links to other pages of the application.
- The function uses the Button and MainHeroDiv styled components from the styled-components library to style the UI.
- The function imports various images and icons from the assets folder.
*/

describe("Landing_function", () => {
  // Tests that the search input updates the state
  it("test_search_updates_state", () => {
    const wrapper = shallow(<Landing />);
    const input = wrapper.find(".search-input");
    input.simulate("change", { target: { value: "Lagos" } });
    expect(wrapper.find(".search-input").prop("value")).toEqual("Lagos");
  });

  // Tests that clicking the search icon navigates to the search page with the search state
  it("test_search_navigates_to_search_page", () => {
    const navigate = jest.fn();
    const wrapper = shallow(<Landing />);
    const searchIcon = wrapper.find(".search-icon");
    wrapper
      .find(".search-input")
      .simulate("change", { target: { value: "Lagos" } });
    searchIcon.simulate("click");
    expect(navigate).toHaveBeenCalledWith("/search-region", {
      state: { myData: "Lagos" },
    });
  });

  // Tests that clicking the 'Get Started' button scrolls to the services section
  it("test_get_started_button_scrolls_to_services_section", () => {
    const wrapper = shallow(<Landing />);
    const getStartedButton = wrapper.find(".hero-left-cta Button a");
    getStartedButton.simulate("click", {
      preventDefault: () => {},
      target: { getAttribute: () => "#services" },
    });
    expect(window.location.hash).toEqual("#services");
  });

  // Tests that clicking the 'Check cities around you' link navigates to the hospital list page
  it("test_check_cities_link_navigates_to_hospital_list_page", () => {
    const wrapper = shallow(<Landing />);
    const checkCitiesLink = wrapper.find(".hero-bottom Link");
    checkCitiesLink.simulate("click", {
      preventDefault: () => {},
    });
    expect(window.location.pathname).toEqual("/hospital-list");
  });

  // Tests that clicking the 'OUR SERVICES' button navigates to the locate hospital page
  it("test_our_services_button_navigates_to_locate_hospital_page", () => {
    const navigate = jest.fn();
    const wrapper = shallow(<Landing />);
    const ourServicesButton = wrapper.find(".about-right Button");
    ourServicesButton.simulate("click");
    expect(navigate).toHaveBeenCalledWith("/locate-hospital");
  });

  // Tests that clicking the 'Locate Hospitals' card navigates to the locate hospital page
  it("test_locate_hospitals_card_navigates_to_locate_hospital_page", () => {
    const navigate = jest.fn();
    const wrapper = shallow(<Landing />);
    const locateHospitalsCard = wrapper.find(".card").at(0);
    locateHospitalsCard.simulate("click");
    expect(navigate).toHaveBeenCalledWith("/locate-hospital");
  });
});
