// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch(teamsApiUrl)
    const fetchedData = await response.json()
    const updatedData = fetchedData.teams.map(team => ({
      name: team.id,
      teamId: team.team_id,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({isLoading: false, teamsData: updatedData})
  }

  renderTeamList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {teamsData.map(each => (
          <TeamCard teamDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    ;<div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="team-list-container">
          <div className="heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamList()}
        </div>
      </div>
    )
  }
}
export default Home
