import React, { PureComponent } from "react";

import "./CountryText.scss";

export default class CountryText extends PureComponent {
    render() {
        const sortedCountries = this.props.selectedCountries.sort((firstCountry, secondCountry) =>
            firstCountry.population > secondCountry.population ? -1 : 1
        );

        const largestCountry = sortedCountries[0];
        const smallestCountry = sortedCountries[sortedCountries.length - 1];
        const difference = largestCountry.population - smallestCountry.population;

        return (
            <div className="country-description">
                <p>
                    Most populated country is: <span>{largestCountry.name}</span> with{" "}
                    <span>{largestCountry.population}</span> inhabitants.
                </p>

                <p>
                    Most least populated country is: <span>{smallestCountry.name}</span> with{" "}
                    <span>{smallestCountry.population} </span>
                    inhabitants.
                </p>
                <p>
                    Difference of population is: <span>{difference}</span> inhabitants.
                </p>
            </div>
        );
    }
}
