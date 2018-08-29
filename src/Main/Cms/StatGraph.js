import React, { Component } from "react";
import { DatePicker, Button, Radio } from "antd";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from "recharts";
import {
  getRandomColor,
  getDaysInAweek,
  getDaysInMonth,
  generateRange
} from "../../helpers";
import { CMS_ACTIVITIES, DEFAULT_DAY } from "../../globals";
import moment from "moment";
const { MonthPicker, WeekPicker } = DatePicker;

class StatGraph extends Component {
  state = {
    filterMode: 1, //1-daily 2-monthly 3-weekly,
    filterDate: moment(),
    graphCategories: [],
    graphData: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ graphCategories: this.getDayCategories() });
  }

  handleChangeModel = e => {
    let graphCategories;
    switch (Number(e.target.value)) {
      case 1: {
        graphCategories = this.getDayCategories();
        break;
      }
      case 2: {
        graphCategories = this.getMonthCategories();
        break;
      }
      case 3: {
        graphCategories = this.getWeekCategories();
        break;
      }
      default: {
        graphCategories = this.getDayCategories();
        break;
      }
    }
    this.setState({ filterMode: Number(e.target.value), graphCategories });
  };

  setFilterDate = filterDate => this.setState({ filterDate });

  getDayCategories = () => {
    let days = DEFAULT_DAY;
    return days.map(day => ({
      name: `${day}${day > 12 ? "pm" : "am"}`,
      day
    }));
  };

  getDateFilters = () => {
    let date = moment(this.state.filterDate);
    return {
      day: date.date(),
      month: date.month(),
      week: date.week(),
      year: date.year()
    };
  };

  getWeekCategories = date => {
    return getDaysInAweek(date).map(d => ({
      date: new Date(d),
      name: moment(d)
        .format("LL")
        .split(",")[0]
    }));
  };

  getMonthCategories = (
    year = new Date().getFullYear(),
    month = new Date().getMonth()
  ) => {
    let daysInMonth = getDaysInMonth(year, month);
    let daysArr = generateRange(daysInMonth, true, false);
    return daysArr.map(day => ({
      name: day + 1,
      date: day
    }));
  };

  getDayCategories = () => {
    let days = DEFAULT_DAY;
    return days.map(day => ({
      name: `${day}${day > 12 ? "pm" : "am"}`,
      day
    }));
  };

  render() {
    let f;
    switch (this.state.filterMode) {
      case 1: {
        f = (
          <DatePicker
            onChange={this.setFilterDate}
            size="small"
            defaultValue={moment()}
            placeholder="Select date"
          />
        );
        break;
      }
      case 2: {
        f = (
          <MonthPicker
            defaultValue={moment()}
            onChange={this.setFilterDate}
            size="small"
            placeholder="Select month"
          />
        );
        break;
      }
      case 3: {
        f = (
          <WeekPicker
            defaultValue={moment()}
            onChange={this.setFilterDate}
            size="small"
            placeholder="Select week"
          />
        );
        break;
      }
      default: {
        f = (
          <DatePicker
            onChange={this.setFilterDate}
            size="small"
            placeholder="Select date"
          />
        );
        break;
      }
    }
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <Radio.Group
            style={{ marginRight: 30 }}
            size="small"
            value={this.state.filterMode}
            onChange={this.handleChangeModel}
          >
            <Radio.Button value={1}>Daily</Radio.Button>
            <Radio.Button value={2}>Monthly</Radio.Button>
            <Radio.Button value={3}>Weekly</Radio.Button>
          </Radio.Group>
          <div style={{ textAlign: "center", marginBottom: 10 }}>{f}</div>
        </div>
        <LineChart
          width={500}
          height={250}
          data={[]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {CMS_ACTIVITIES.map(act => (
            <Line
              type="monotone"
              key={act}
              dataKey={act}
              stroke={getRandomColor()}
            />
          ))}
        </LineChart>
      </div>
    );
  }
}

export default StatGraph;
