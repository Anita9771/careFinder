import ReactDOM from "react-dom";
import { SearchRegion } from "../pages";
import Hospital from "../components/Hospital";
import { mount } from "enzyme";
import Pagination from "../components/Pagination";
import { CirclesWithBar } from "react-loader-spinner";

/*
Code Analysis

Objective:
The SearchRegion function is a React component that displays a list of hospitals filtered by region. The main objective of the function is to fetch hospital data from Firebase Firestore, filter the data based on the searched region, and display the filtered data in a paginated format.

Inputs:
- None explicitly passed as arguments, but the function uses the useLocation hook from react-router-dom to get the searched region from the previous page.

Flow:
1. The function initializes state variables for hospitals, filteredHospitals, isLoading, currentPage, and totalPages.
2. The function uses the useLocation hook to get the searched region from the previous page.
3. The function uses the onSnapshot function from Firebase Firestore to fetch hospital data and update the hospitals state variable.
4. The function uses the useEffect hook to filter the hospitals based on the searched region and update the filteredHospitals state variable.
5. The function uses the Pagination component to display the filtered hospitals in a paginated format.
6. The function returns a JSX element that displays the NavbarMain component, a loading spinner if data is still loading, and the filtered hospitals in a table format.

Outputs:
- A JSX element that displays the NavbarMain component, a loading spinner if data is still loading, and the filtered hospitals in a table format.
- Pagination component that allows the user to navigate through the filtered hospitals.
- State variables for hospitals, filteredHospitals, isLoading, currentPage, and totalPages.

Additional aspects:
- The function uses the styled-components library to style the components.
- The function uses the react-router-dom library to handle routing.
- The function uses the firebase/firestore library to interact with Firebase Firestore.
- The function uses the types/hospitals.ts file to define the NewHospitalType interface.
*/

describe("SearchRegion_function", () => {
  // Tests that the component renders without crashing
  it("test_rendering_without_crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SearchRegion />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // Tests that the component displays a list of hospitals
  it("test_display_list_of_hospitals", () => {
    const wrapper = mount(<SearchRegion />);
    expect(wrapper.find(Hospital)).toHaveLength(5);
  });

  // Tests that the component filters hospitals based on searched region
  it("test_filters_hospitals_based_on_searched_region", () => {
    const wrapper = mount(<SearchRegion />);
    wrapper.setState({ searchedValue: "lagos" });
    expect(wrapper.find(Hospital)).toHaveLength(2);
  });

  // Tests that the component displays pagination component
  it("test_displays_pagination_component", () => {
    const wrapper = mount(<SearchRegion />);
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });

  // Tests that the component displays a message when no hospitals are found
  it("test_no_hospitals_found", () => {
    const wrapper = mount(<SearchRegion />);
    wrapper.setState({ filteredHospitals: [] });
    expect(wrapper.find("h2").text()).toEqual("No hospitals found");
  });

  // Tests that the component displays a loading spinner when data is being fetched
  it("test_loading_spinner_displayed_when_data_is_being_fetched", () => {
    const wrapper = mount(<SearchRegion />);
    expect(wrapper.find(CirclesWithBar)).toHaveLength(1);
  });
});
