import React, { PureComponent } from "react";

import "./CountryList.scss";

export default class CountryList extends PureComponent {
    static maxSelectedCountries = 4;

    state = {
        searchText: "",
        selectedCountriesNames: [],
        selectedError: "",
    };

    handleSearch = (event) => {
        this.setState({ searchText: event.target.value });
    };

    handleChange = (event) => {
        const countryName = event.target.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            this.setState({ selectedCountriesNames: [...this.state.selectedCountriesNames, countryName] });
        } else {
            const countryIndex = this.state.selectedCountriesNames.findIndex((name) => name === countryName);
            const newSelectedCountriesNames = [...this.state.selectedCountriesNames];
            newSelectedCountriesNames.splice(countryIndex, 1);
            this.setState({ selectedCountriesNames: newSelectedCountriesNames });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.selectedCountriesNames.length > 1) {
            this.props.onCompare(this.state.selectedCountriesNames);
            this.setState({ selectedError: "" });
        } else {
            this.props.onCompare([]);
            this.setState({ selectedError: "You must select a minimum of two countries to comparison!" });
        }
    };

    render() {
        return (
            <>
                {this.state.selectedError && (
                    <div className="compare-error" role="alert">
                        {this.state.selectedError}
                    </div>
                )}
                <div className="list-container">
                    <h2>Country List</h2>

                    <form className="form" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            className="form__search"
                            name="search"
                            value={this.state.searchText}
                            onChange={this.handleSearch}
                            placeholder="Search..."
                        />
                        <ul className="list">
                            {this.props.countries
                                .filter((country) =>
                                    country.name.toLowerCase().includes(this.state.searchText.toLowerCase().trim())
                                )
                                .map((country) => (
                                    <li className="list__item" key={country.name}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name={country.name}
                                                value={country.name}
                                                onChange={this.handleChange}
                                                checked={this.state.selectedCountriesNames.includes(country.name)}
                                                disabled={
                                                    !this.state.selectedCountriesNames.includes(country.name) &&
                                                    this.state.selectedCountriesNames.length >=
                                                        CountryList.maxSelectedCountries
                                                }
                                            />
                                            {country.name}
                                        </label>
                                        <br></br>
                                    </li>
                                ))}
                        </ul>

                        <button className="form__btn" type="submit">
                            Compare
                        </button>
                    </form>
                </div>
            </>
        );
    }
}
