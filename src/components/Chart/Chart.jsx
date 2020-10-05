import React, { PureComponent } from "react";
import "./Chart.scss";

import { ResponsiveContainer, BarChart, Bar, YAxis, LabelList, Legend, Cell } from "recharts";

export default class Chart extends PureComponent {
    getData = () => {
        const color = ["#00441d", "#00783b", "#4dae65", "#71c185"];
        let sum = this.props.selectedCountries.reduce(
            (accumulator, currentValue) => accumulator + currentValue.population,
            0
        );
        let data = [];

        this.props.selectedCountries.map((country, index) => {
            return data.push({
                name: country.name,
                population: country.population,
                percentageOfPopulation: `${this.percentageOfPopulation(sum, country.population)} %`,
                color: color[index],
            });
        });

        return data;
    };

    percentageOfPopulation = (sum, population) => {
        return Math.round((population / sum) * 100);
    };

    payload = () => {
        let arr = [];
        this.getData().map((data) => {
            return arr.push({ value: data.name, type: "square", color: data.color });
        });
        return arr;
    };

    render() {
        const data = this.getData();

        return (
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={data} margin={{ top: 50, right: 30, left: 30, bottom: 30 }}>
                        <YAxis />

                        <Legend verticalAlign="top" height={50} payload={this.payload()} offset="100" />

                        <Bar dataKey="population">
                            <LabelList dataKey="percentageOfPopulation" position="insideTop" fill="#ffffff" />
                            {data.map((d, index) => (
                                <Cell key={`cell-${index}`} fill={d.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }
}
