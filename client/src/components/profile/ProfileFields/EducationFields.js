import React, { Component } from 'react'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'

export default class EducationFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            education: [],
            educationInput: {
                instituteName: '',
                degree: '',
                fieldOfStudy: '',
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
                education: profile.education,
            });
        }
    }
    onChangeEducation = e => {
        this.setState({
            educationInput: {
                ...this.state.educationInput,
                [e.target.name]: e.target.value
            }
        });
    };
    validateEducationInput = data => {
        let validatedErrors = {}
        if (data.instituteName.length < 3) validatedErrors.instituteName = 'Institute name must be at least 3 characters'
        if (data.degree.length < 3) validatedErrors.degree = 'Degree must be at least 3 characters'
        if (data.fieldOfStudy.length < 3) validatedErrors.fieldOfStudy = 'Field of study must be at least 3 characters'
        return validatedErrors;
    }
    // Education
    addEducation = e => {
        e.preventDefault();
        const validatedErrors = this.validateEducationInput(this.state.educationInput);
        if (Object.keys(validatedErrors).length > 0) {
            this.setState({ errors: validatedErrors })
        }
        else {
            //add education to parent
            const education = {
                instituteName: this.state.educationInput.instituteName,
                degree: this.state.educationInput.degree,
                fieldOfStudy: this.state.educationInput.fieldOfStudy,
                fromDate: this.state.educationInput.fromDate,
                endDate: this.state.educationInput.endDate,
                description: this.state.educationInput.description
            }
            this.props.addEducation(e, education)
            this.setState({
                education: [
                    ...this.state.education,
                    {
                        instituteName: this.state.educationInput.instituteName,
                        degree: this.state.educationInput.degree,
                        fieldOfStudy: this.state.educationInput.fieldOfStudy,
                        fromDate: this.state.educationInput.fromDate,
                        endDate: this.state.educationInput.endDate,
                        description: this.state.educationInput.description
                    }
                ],
                educationInput: {
                    instituteName: '',
                    degree: '',
                    fieldOfStudy: '',
                    fromDate: '',
                    endDate: '',
                    description: ''
                },
                errors: {}
            });
        }

    };

    removeEducation = i => {
        this.props.removeEducation(i)
        this.setState({
            education: this.state.education.filter((edu, j) => i !== j)
        });
    };
    render() {
        const { errors } = this.state

        return (
            <div className="education mt-4">
                <h4>Education</h4>
                <div className="row">
                    <div className="col">
                        <TextFieldGroup
                            label="Insitute name"
                            placeholder="Institute name"
                            name="instituteName"
                            type="text"
                            value={this.state.educationInput.instituteName}
                            onChange={this.onChangeEducation}
                            error={errors.instituteName}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextFieldGroup
                            label="Degree"
                            placeholder="Degree"
                            name="degree"
                            type="text"
                            value={this.state.educationInput.degree}
                            onChange={this.onChangeEducation}
                            error={errors.degree}
                        />
                    </div>
                    <div className="col">
                        <TextFieldGroup
                            label="Field of study"
                            placeholder="Field of study"
                            name="fieldOfStudy"
                            type="text"
                            value={this.state.educationInput.fieldOfStudy}
                            onChange={this.onChangeEducation}
                            error={errors.fieldOfStudy}
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
                            value={this.state.educationInput.fromDate}
                            onChange={this.onChangeEducation}
                            error={errors.fromDate}
                        />
                    </div>
                    <div className="col">
                        <TextFieldGroup
                            label="To"
                            placeholder="To"
                            name="endDate"
                            type="date"
                            value={this.state.educationInput.endDate}
                            onChange={this.onChangeEducation}
                            error={errors.endDate}
                        />
                    </div>
                </div>
                <TextAreaFieldGroup
                    label="Description"
                    placeholder="Description"
                    name="description"
                    type="text"
                    value={this.state.educationInput.description}
                    onChange={this.onChangeEducation}
                    error={errors.description}
                />
                <button className="btn btn-secondary" onClick={this.addEducation}>
                    Add education
          </button>
                {this.state.education.length > 0 ? (<table className="table">
                    <thead>
                        <tr>
                            <th>Institute name</th>
                            <th>Degree</th>
                            <th>Field of study</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Description</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.education.map((edu, i) => (
                            <tr key={i}>
                                <td>{edu.instituteName}</td>
                                <td>{edu.degree}</td>
                                <td>{edu.fieldOfStudy}</td>
                                <td>{edu.fromDate}</td>
                                <td>{edu.endDate}</td>
                                <td>{edu.description}</td>
                                <td>
                                    <i
                                        onClick={() => this.removeEducation(i)}
                                        className="fas fa-times hover"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>) : (
                        <p className="text-muted">No education added</p>
                    )}

            </div>
        )
    }
}
