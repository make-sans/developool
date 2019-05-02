import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SuggestInput from '../common/SuggestInput';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SKILLS = [
    'C#',
    'JavaScript',
    'React.js',
    'Node.js',
    'Kotlin',
    'HTML/CSS'
];
const INTERESTS = ['Movies', 'Music', 'Sports', 'Anime', 'Games'];

class ProfileFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            interests: [],
            skills: [],
            education: [],
            educationInput: { instituteName: '', degree: '', fieldOfStudy: '', fromDate: '', endDate: '', description: '' },
            pastExperience: [],
            experienceInput: { company: '', title: '', location: '', fromDate: '', endDate: '', description: '' },
            projects: [],
            github: '',
            facebook: '',
            linkedin: '',
            twitter: '',
            instagram: '',
            errors: {}
        };
    }
    componentDidMount() {
        const { profile } = this.props;
        if (profile) {
            console.log('profile supplied - its an update');

            //set state to profile values
            this.setState({
                firstName: profile.firstName,
                lastName: profile.lastName,
                interests: profile.interests,
                skills: profile.skills,
                education: profile.education,
                pastExperience: profile.pastExperience,
                projects: profile.projects,
                github: profile.github,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                twitter: profile.twitter,
                instagram: profile.instagram
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onSkillSelected = (e, res) => {
        if (this.state.skills.indexOf(res.suggestion) === -1) {
            this.setState({ skills: [...this.state.skills, res.suggestion] });
        }
    };
    onInterestSelected = (e, res) => {
        if (this.state.interests.indexOf(res.suggestion) === -1) {
            this.setState({ interests: [...this.state.interests, res.suggestion] });
        }
    };
    removeSkill = (e, i) => {
        this.setState({
            skills: this.state.skills.filter(skill => skill !== e.target.innerText)
        });
    };
    removeInterest = (e, i) => {
        this.setState({
            interests: this.state.interests.filter(
                interest => interest !== e.target.innerText
            )
        });
    };
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onChangeEducation = e => {
        this.setState({
            educationInput: { ...this.state.educationInput, [e.target.name]: e.target.value }
        })
    }
    onChangeExperience = e => {
        this.setState({
            experienceInput: { ...this.state.experienceInput, [e.target.name]: e.target.value }
        })
    }

    // Education
    addEducation = (e) => {
        e.preventDefault()
        this.setState({
            education: [...this.state.education, { instituteName: this.state.educationInput.instituteName, degree: this.state.educationInput.degree, fieldOfStudy: this.state.educationInput.fieldOfStudy, fromDate: this.state.educationInput.fromDate, endDate: this.state.educationInput.endDate, description: this.state.educationInput.description }]
            , educationInput: { instituteName: '', degree: '', fieldOfStudy: '', fromDate: '', endDate: '', description: '' },
        });
    };

    removeEducation = (i) => {
        this.setState({
            education: this.state.education.filter((edu, j) => i !== j)
        });
    };

    // Experience
    addExperience = (e) => {
        e.preventDefault()
        this.setState({
            pastExperience: [...this.state.pastExperience, { company: this.state.experienceInput.company, title: this.state.experienceInput.title, location: this.state.experienceInput.location, fromDate: this.state.experienceInput.fromDate, endDate: this.state.experienceInput.endDate, description: this.state.experienceInput.description }], experienceInput: { company: '', title: '', location: '', fromDate: '', endDate: '', description: '' },
        });
    };

    removeExperience = (i) => {
        this.setState({
            pastExperience: this.state.pastExperience.filter((exp, j) => i !== j)
        });
    };




    render() {
        const { errors } = this.state;
        const skillList = this.state.skills.map(skill => (
            <li
                key={skill}
                className="skill-list-item hover"
                onClick={this.removeSkill}
            >
                {skill}
            </li>
        ));
        const interestList = this.state.interests.map(interest => (
            <li
                key={interest}
                className="interest-list-item hover"
                onClick={this.removeInterest}
            >
                {interest}
            </li>
        ));
        return (
            <form onSubmit={e => this.props.onSubmit(e, this.state)}>
                <TextFieldGroup
                    label="First name"
                    placeholder="First name"
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.onChange}
                    error={errors.firstName}
                />
                <TextFieldGroup
                    label="Last name"
                    placeholder="Last name"
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.onChange}
                    error={errors.lastName}
                />
                <div className="form-group">
                    <label>Skills</label>
                    <SuggestInput
                        suggestions={SKILLS}
                        onSelected={this.onSkillSelected}
                        placeholder={'What skills do you have?'}
                    />
                    {errors.skills && <div className="invalid-feedback d-block">{errors.skills}</div>}
                </div>
                <ul className="skill-interest-list">{skillList}</ul>
                <div className="form-group">
                    <label>Interests</label>
                    <SuggestInput
                        suggestions={INTERESTS}
                        onSelected={this.onInterestSelected}
                        placeholder={'What are your interests?'}
                    />
                    {errors.interests && <div className="invalid-feedback d-block">{errors.interests}</div>}

                </div>
                <ul className="skill-interest-list">{interestList}</ul>

                {/* Education field */}
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
                                error={errors.education}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><TextFieldGroup
                            label="Degree"
                            placeholder="Degree"
                            name="degree"
                            type="text"
                            value={this.state.educationInput.degree}
                            onChange={this.onChangeEducation}
                            error={errors.education}
                        /></div>
                        <div className="col"><TextFieldGroup
                            label="Field of study"
                            placeholder="Field of study"
                            name="fieldOfStudy"
                            type="text"
                            value={this.state.educationInput.fieldOfStudy}
                            onChange={this.onChangeEducation}
                            error={errors.education}
                        /></div>
                    </div>
                    <div className="row">
                        <div className="col"> <TextFieldGroup
                            label="From"
                            placeholder="From"
                            name="fromDate"
                            type="date"
                            value={this.state.educationInput.fromDate}
                            onChange={this.onChangeEducation}
                            error={errors.education}
                        /></div>
                        <div className="col"><TextFieldGroup
                            label="To"
                            placeholder="To"
                            name="endDate"
                            type="date"
                            value={this.state.educationInput.endDate}
                            onChange={this.onChangeEducation}
                            error={errors.education}
                        /></div>
                    </div>
                    <TextAreaFieldGroup
                        label="Description"
                        placeholder="Description"
                        name="description"
                        type="text"
                        value={this.state.educationInput.description}
                        onChange={this.onChangeEducation}
                        error={errors.education}
                    />
                    <button className="btn btn-secondary" onClick={this.addEducation}>Add education</button>
                    <table className='table'>
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
                                    <td><i onClick={() => this.removeEducation(i)} class="fas fa-times hover"></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Experience field */}
                <div className="experience mt-4">
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
                                error={errors.experience}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col"><TextFieldGroup
                            label="Title"
                            placeholder="Title"
                            name="title"
                            type="text"
                            value={this.state.experienceInput.title}
                            onChange={this.onChangeExperience}
                            error={errors.experience}
                        /></div>
                        <div className="col"><TextFieldGroup
                            label="Location"
                            placeholder="Location"
                            name="location"
                            type="text"
                            value={this.state.experienceInput.location}
                            onChange={this.onChangeExperience}
                            error={errors.experience}
                        /></div>
                    </div>
                    <div className="row">
                        <div className="col"> <TextFieldGroup
                            label="From"
                            placeholder="From"
                            name="fromDate"
                            type="date"
                            value={this.state.experienceInput.fromDate}
                            onChange={this.onChangeExperience}
                            error={errors.experience}
                        /></div>
                        <div className="col"><TextFieldGroup
                            label="To"
                            placeholder="To"
                            name="endDate"
                            type="date"
                            value={this.state.experienceInput.endDate}
                            onChange={this.onChangeExperience}
                            error={errors.experience}
                        /></div>
                    </div>
                    <TextAreaFieldGroup
                        label="Description"
                        placeholder="Description"
                        name="description"
                        type="text"
                        value={this.state.experienceInput.description}
                        onChange={this.onChangeExperience}
                        error={errors.experience}
                    />
                    <button className="btn btn-secondary" onClick={this.addExperience}>Add experience</button>
                    <table className='table'>
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
                                    <td><i onClick={() => this.removeExperience(i)} class="fas fa-times hover"></i></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='social mt-4'>
                    <InputGroup
                        placeholder="Github Profile URL"
                        name="github"
                        icon="fab fa-github"
                        value={this.state.github}
                        onChange={this.onChange}
                        error={errors.github}
                    />
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>

                <div className="form-row mt-3 justify-content-end">
                    <div className="col-auto">
                        <Link to={this.props.cancelRoute} className="btn btn-secondary">
                            Cancel
            </Link>
                    </div>
                    <div className="col-auto">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </div>
            </form>
        );
    }
}

ProfileFields.propTypes = {
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {}
)(ProfileFields);
