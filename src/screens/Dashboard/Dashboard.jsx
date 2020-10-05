import React, { PureComponent } from "react";

import { getCountries } from "../../api/countries";
import CountryList from "../../components/CountyList/CountryList";
import CountryText from "../../components/CountryText/CountryText";
import Chart from "../../components/Chart/Chart";
import "./Dashboard.scss";

export default class Dashboard extends PureComponent {
    state = {
        countries: [],
        selectedCountries: [],
    };

    async componentDidMount() {
        try {
            const countries = await getCountries();
            this.setState({ countries });
        } catch (e) {
            console.log(e);
        }
    }

    handleCompare = (selectedCountriesNames) => {
        const selectedCountries = this.state.countries.filter((country) =>
            selectedCountriesNames.includes(country.name)
        );

        this.setState({ selectedCountries });
    };

    render() {
        return (
            <>
                <h1>Country Comparison</h1>
                <div className="wrapper">
                    {this.state.selectedCountries.length !== 0 && (
                        <CountryText selectedCountries={this.state.selectedCountries} />
                    )}
                    <CountryList countries={this.state.countries} onCompare={this.handleCompare} />
                </div>
                {this.state.selectedCountries.length !== 0 && (
                    <Chart selectedCountries={this.state.selectedCountries} />
                )}
                <button type="button" id="logout-btn" onClick={this.props.onLogout}>
                    Log out
                </button>
            </>
        );
    }
}
