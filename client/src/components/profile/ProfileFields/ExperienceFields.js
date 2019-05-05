import React, { Component } from 'react'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'
import validateDateInput from '../../../utils/validation/validateDateInput'

export default class ExperienceFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pastExperience: [],
            experienceInput: {
                company: '',
                title: '',
                location: '',
                fromDate: '',
                endDate: '',
                description: ''
            },
            errors: {}
        };
    }
    componentDidMount() {
        const { profile } = this.props;
        if (profile) {
            console.log('profile supplied - its an update');
            //set state to profile values
            this.setState({
                pastExperience: profile.pastExperience,
            });
        }
    }
    onChangeExperience = e => {
        this.setState({
            experienceInput: {
                ...this.state.experienceInput,
                [e.target.name]: e.target.value
            }
        });
    };
    validateExperienceInput = data => {
        let validatedErrors = {}
        if (data.company.length < 3) validatedErrors.company = 'Company name must be at least 3 characters'
        if (data.company.length > 100) validatedErrors.company = 'Company name must be max 100 characters'
        if (data.title.length < 3) validatedErrors.title = 'Title must be at least 3 characters'
        if (data.title.length > 100) validatedErrors.title = 'Title must be max 100 characters'
        if (data.location.length < 3) validatedErrors.location = 'Location must be at least 3 characters'
        if (data.location.length > 100) validatedErrors.location = 'Location must be max 100 characters'
        if (data.description.length > 300) validatedErrors.description = 'Description must be max 300 characters'
        const dateErrors = validateDateInput(data.fromDate, data.endDate)
        validatedErrors = { ...validatedErrors, ...dateErrors }
        return validatedErrors;
    }
    // Experience
    addExperience = e => {
        e.preventDefault();
        const validatedErrors = this.validateExperienceInput(this.state.experienceInput);
        if (Object.keys(validatedErrors).length > 0) {
            this.setState({ errors: validatedErrors })
        }
        else {
            //add experience to parent
            const experience = {
                company: this.state.experienceInput.company,
                title: this.state.experienceInput.title,
                location: this.state.experienceInput.location,
                fromDate: this.state.experienceInput.fromDate,
                endDate: this.state.experienceInput.endDate,
                description: this.state.experienceInput.description
            }
            this.props.addExperience(e, experience)
            this.setState({
                pastExperience: [
                    ...this.state.pastExperience,
                    {
                        company: this.state.experienceInput.company,
                        title: this.state.experienceInput.title,
                        location: this.state.experienceInput.location,
                        fromDate: this.state.experienceInput.fromDate,
                        endDate: this.state.experienceInput.endDate,
                        description: this.state.experienceInput.description
                    }
                ],
                experienceInput: {
                    company: '',
                    title: '',
                    location: '',
                    fromDate: '',
                    endDate: '',
                    description: ''
                },
                errors: {}

            });
        }

    };

    removeExperience = i => {
        this.props.removeExperience(i)
        this.setState({
            pastExperience: this.state.pastExperience.filter((exp, j) => i !== j)
        });
    };
    render() {
        const { errors } = this.state
        return (
            < div className="experience mt-4" >
                <h4>Experience</h4>
                <div className="row">
                    <div className="col">
                        <TextFieldGroup
                            label="Company name"
                            placeholder="Company name"
                            name="company"
                            type="text"
                            value={this.state.experienceInput.company}
                            onChange={this.onChangeExperience}
                            error={errors.company}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextFieldGroup
                            label="Title"
                            placeholder="Title"
                            name="title"
                            type="text"
                            value={this.state.experienceInput.title}
                            onChange={this.onChangeExperience}
                            error={errors.title}
                        />
                    </div>
                    <div className="col">
                        <TextFieldGroup
                            label="Location"
                            placeholder="Location"
                            name="location"
                            type="text"
                            value={this.state.experienceInput.location}
                            onChange={this.onChangeExperience}
                            error={errors.location}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextFieldGroup
                            label="From"
                            placeholder="From"
                            name="fromDate"
                            type="date"
                            value={this.state.experienceInput.fromDate}
                            onChange={this.onChangeExperience}
                            error={errors.fromDate}
                        />
                    </div>
                    <div className="col">
                        <TextFieldGroup
                            label="To"
                            placeholder="To"
                            name="endDate"
                            type="date"
                            value={this.state.experienceInput.endDate}
                            onChange={this.onChangeExperience}
                            error={errors.endDate}
                        />
                    </div>
                </div>
                <TextAreaFieldGroup
                    label="Description"
                    placeholder="Description"
                    name="description"
                    type="text"
                    value={this.state.experienceInput.description}
                    onChange={this.onChangeExperience}
                    error={errors.description}
                />
                <button className="btn btn-secondary" onClick={this.addExperience}>
                    Add experience
</button>
                {
                    this.state.pastExperience.length > 0 ? (<table className="table">
                        <thead>
                            <tr>
                                <th>Company name</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Description</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pastExperience.map((exp, i) => (
                                <tr key={i}>
                                    <td>{exp.company}</td>
                                    <td>{exp.title}</td>
                                    <td>{exp.location}</td>
                                    <td>{exp.fromDate}</td>
                                    <td>{exp.endDate}</td>
                                    <td>{exp.description}</td>
                                    <td>
                                        <i
                                            onClick={() => this.removeExperience(i)}
                                            className="fas fa-times hover"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>) : (
                            <p className="text-muted">No past experience added</p>
                        )
                }
            </div >
        )
    }
}
