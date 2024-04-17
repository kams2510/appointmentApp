// Write your code here
import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointment extends Component {
  state = {
    appointmentList: [],
    appointmentId: '',
    appointmentDate: '',
    appointmentTitle: '',
    isStarred: false,
  }

  forInputDate = e => {
    this.setState({appointmentDate: e.target.value})
  }

  forTitleInput = e => {
    this.setState({appointmentTitle: e.target.value})
  }

  forAddAppointment = e => {
    e.preventDefault()
    const {appointmentDate, appointmentTitle, appointmentList} = this.state
    const options = {weekday: 'long'}

    const date = new Date(appointmentDate)
    const newDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.toLocaleDateString('en-US', options)}`
    const newAppointment = {
      appointmentId: uuidv4(),
      appointmentTitle,
      appointmentDate: newDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      appointmentDate: '',
      appointmentTitle: '',
    }))
    console.log(appointmentList)
  }

  starredListBtn = () => {
    const {appointmentList} = this.state
    const starredList = appointmentList.filter(each => each.isStarred === true)
    console.log(starredList)
    this.setState({appointmentList: starredList})
  }

  starredBtn = id => {
    const {appointmentList} = this.state
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.appointmentId) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
    console.log('starred paa')
  }

  render() {
    const {appointmentDate, appointmentList, appointmentTitle} = this.state
    console.log(appointmentList)
    return (
      <div className="container">
        <div className="card">
          <form className="input-container" onSubmit={this.forAddAppointment}>
            <div className="input-container-card">
              <h1 className="heading">Add Appointment</h1>
              <label>
                Title <br />{' '}
                <input
                  type="text"
                  className="title-input"
                  placeholder="Enter your title"
                  onChange={this.forTitleInput}
                  value={appointmentTitle}
                />
              </label>
              <br />
              <label>
                Date <br />{' '}
                <input
                  type="date"
                  className="date-input"
                  onChange={this.forInputDate}
                  value={appointmentDate}
                />
              </label>
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </form>
          <hr />
          <div>
            <h1>Appointments</h1>
            <button type="button" onClick={this.starredListBtn}>
              starred
            </button>
          </div>
          <ul>
            {appointmentList.map(each => (
              <AppointmentItem
                appointmentDetail={each}
                key={each.appointmentId}
                starredBtn={this.starredBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointment
