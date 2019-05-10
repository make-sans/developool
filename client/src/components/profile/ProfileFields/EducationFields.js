import React, { Component } from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import validateDateInput from '../../../utils/validation/validateDateInput';
import Education from '../ProfileData/Education';

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
      //set state to profile values
      this.setState({
        education: profile.education
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
    let validatedErrors = {};
    if (data.instituteName.length < 3)
      validatedErrors.instituteName =
        'Institute name must be at least 3 characters';
    if (data.instituteName.length > 100)
      validatedErrors.instituteName =
        'Institute name must be max 100 characters';
    if (data.degree.length < 3)
      validatedErrors.degree = 'Degree must be at least 3 characters';
    if (data.degree.length > 100)
      validatedErrors.degree = 'Degree must be max 100 characters';
    if (data.fieldOfStudy.length < 3)
      validatedErrors.fieldOfStudy =
        'Field of study must be at least 3 characters';
    if (data.fieldOfStudy.length > 100)
      validatedErrors.fieldOfStudy =
        'Field of study must be max 100 characters';
    if (data.description.length > 300)
      validatedErrors.description = 'Description must be max 300 characters';
    const dateErrors = validateDateInput(data.fromDate, data.endDate);
    validatedErrors = { ...validatedErrors, ...dateErrors };
    return validatedErrors;
  };
  // Education
  addEducation = e => {
    e.preventDefault();
    const validatedErrors = this.validateEducationInput(
      this.state.educationInput
    );
    if (Object.keys(validatedErrors).length > 0) {
      this.setState({ errors: validatedErrors });
    } else {
      //add education to parent
      const education = {
        instituteName: this.state.educationInput.instituteName,
        degree: this.state.educationInput.degree,
        fieldOfStudy: this.state.educationInput.fieldOfStudy,
        fromDate: this.state.educationInput.fromDate,
        endDate: this.state.educationInput.endDate,
        description: this.state.educationInput.description
      };
      this.props.addEducation(e, education);
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
    this.props.removeEducation(i);
    this.setState({
      education: this.state.education.filter((edu, j) => i !== j)
    });
  };
  render() {
    const { errors } = this.state;

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
        {this.state.education.length > 0 ? (
          <div className="row mt-3">
            {this.state.education.map((edu, i) => (
              <div key={i} className="col-md-6 mb-3">
                <Education
                  edu={edu}
                  i={i}
                  isRemovable
                  onRemoveClick={() => this.removeEducation(i)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center">No education added</p>
        )}
      </div>
    );
  }
}
