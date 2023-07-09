import Hospital from "../Hospital";
import { shallow } from "enzyme";




/*
Code Analysis

Objective:
The objective of the Hospital function is to render a single hospital's information in a list format on a webpage. 

Inputs:
- hospital: an object of type NewHospitalType that contains information about a hospital, including its name, address, phone number, email, and region.

Flow:
1. The function receives the hospital object as input.
2. The function renders the hospital's information in a list format using JSX.
3. The function returns the JSX code to be displayed on the webpage.

Outputs:
- JSX code that displays the hospital's information in a list format on a webpage.

Additional aspects:
- The function uses the IProps interface to define the type of the hospital object input.
- The function imports CSS styles from an external file to style the list.
- The function uses the dangerouslySetInnerHTML attribute to render the hospital's address as HTML.
*/



describe('Hospital_function', () => {

    // Tests that hospital information is rendered correctly
    it('test_render_hospital_info', () => {
        const hospital = {
            Name: 'Test Hospital',
            Address: '123 Test St',
            Phone: '555-555-5555',
            Email: 'test@test.com',
            Region: 'Test Region'
        };
        const wrapper = shallow(<Hospital hospital={hospital} />);
        expect(wrapper.find('.list')).toHaveLength(1);
        expect(wrapper.find('span').at(0).text()).toEqual('Test Hospital');
        expect(wrapper.find('span').at(1).html()).toEqual('<div>123 Test St</div>');
        expect(wrapper.find('span').at(2).text()).toEqual('555-555-5555');
        expect(wrapper.find('span').at(3).text()).toEqual('test@test.com');
        expect(wrapper.find('span').at(4).text()).toEqual('Test Region');
    });

    // Tests that hospital name is rendered
    it('test_render_hospital_name', () => {
        const hospital = {
            Name: 'Test Hospital',
            Address: '123 Test St',
            Phone: '555-555-5555',
            Email: 'test@test.com',
            Region: 'Test Region'
        };
        const wrapper = shallow(<Hospital hospital={hospital} />);
        expect(wrapper.find('.list')).toHaveLength(1);
        expect(wrapper.find('span').at(0).text()).toEqual('Test Hospital');
    });

    // Tests that hospital address is rendered
    it('test_render_hospital_address', () => {
        const hospital = {
            Name: 'Test Hospital',
            Address: '123 Test St',
            Phone: '555-555-5555',
            Email: 'test@test.com',
            Region: 'Test Region'
        };
        const wrapper = shallow(<Hospital hospital={hospital} />);
        expect(wrapper.find('.list')).toHaveLength(1);
        expect(wrapper.find('span').at(1).html()).toEqual('<div>123 Test St</div>');
    });

    // Tests that hospital can be rendered with missing information
    it('test_render_hospital_missing_info', () => {
        const hospital = {
            Name: 'Test Hospital',
            Address: '',
            Phone: '',
            Email: '',
            Region: ''
        };
        const wrapper = shallow(<Hospital hospital={hospital} />);
        expect(wrapper.find('.list')).toHaveLength(1);
        expect(wrapper.find('span').at(0).text()).toEqual('Test Hospital');
        expect(wrapper.find('span').at(1).html()).toEqual('<div></div>');
        expect(wrapper.find('span').at(2).text()).toEqual('');
        expect(wrapper.find('span').at(3).text()).toEqual('');
        expect(wrapper.find('span').at(4).text()).toEqual('');
    });

    // Tests that hospital can be rendered with long information
    it('test_render_hospital_long_info', () => {
        const hospital = {
            Name: 'Test Hospital',
            Address: '123 Test St, Apt 1, Suite 100, Floor 2, Building A, Complex B',
            Phone: '555-555-5555',
            Email: 'test@test.com',
            Region: 'Test Region'
        };
        const wrapper = shallow(<Hospital hospital={hospital} />);
        expect(wrapper.find('.list')).toHaveLength(1);
        expect(wrapper.find('span').at(0).text()).toEqual('Test Hospital');
        expect(wrapper.find('span').at(1).html()).toEqual('<div>123 Test St, Apt 1, Suite 100, Floor 2, Building A, Complex B</div>');
        expect(wrapper.find('span').at(2).text()).toEqual('555-555-5555');
        expect(wrapper.find('span').at(3).text()).toEqual('test@test.com');
        expect(wrapper.find('span').at(4).text()).toEqual('Test Region');
    });

    // Tests that a horizontal line is rendered after each hospital
    it('test_render_hospital_hr', () => {
        const hospital = {
            Name: 'Test Hospital',
            Address: '123 Test St',
            Phone: '555-555-5555',
            Email: 'test@test.com',
            Region: 'Test Region'
        };
        const wrapper = shallow(<Hospital hospital={hospital} />);
        expect(wrapper.find('hr')).toHaveLength(1);
    });
});
