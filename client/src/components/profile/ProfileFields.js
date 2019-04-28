import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
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
            pastExperience: [],
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
                facebook: profile.github,
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
                        placeholder={'What skills are needed for this project?'}
                    />
                    {errors.skills && <div className="invalid-feedback d-block">{errors.skills}</div>}

                </div>
                <ul className="skill-interest-list">{skillList}</ul>
                <div className="form-group">
                    <label>Interests</label>

                    <SuggestInput
                        suggestions={INTERESTS}
                        onSelected={this.onInterestSelected}
                        placeholder={'What interests are suitable for this project?'}
                    />
                    {errors.interests && <div className="invalid-feedback d-block">{errors.interests}</div>}

                </div>
                <ul className="skill-interest-list">{interestList}</ul>

                <p>Education</p>
                <p>Experience</p>
                <div>
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
