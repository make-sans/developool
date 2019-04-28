import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, editProfile } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import ProfileFields from './ProfileFields';

class EditProfile extends Component {
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
            instagram: ''
        };
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onEditProfileSubmit = (e, state) => {
        e.preventDefault();
        // setup the edits
        const editedProfile = {
            firstName: state.firstName,
            lastName: state.lastName,
            interests: state.interests,
            skills: state.skills,
            education: state.education,
            pastExperience: state.pastExperience,
            projects: state.projects,
            github: state.github,
            facebook: state.facebook,
            linkedin: state.linkedin,
            twitter: state.twitter,
            instagram: state.instagram
        }

        this.props.editProfile(editedProfile, this.props.history);

    };
    render() {
        const { profile, loading } = this.props.profile;

        let profileContent;
        if (loading) {
            profileContent = <Spinner />;
        }
        else {
            if (!profile) {
                profileContent = <h2>Oh oh..</h2>;
            }
            else {
                profileContent = <ProfileFields profile={profile} cancelRoute='/profile' onSubmit={this.onEditProfileSubmit} />;
            }
        }


        return (
            <div className="edit-profile">
                <div className="row align-items-center mt-5">
                    <div className="col-md-7 m-auto">
                        <h1 className="display-4 text-center">Edit your profile</h1>
                        <p className="lead text-center" />
                        {profileContent}
                    </div>
                </div>
            </div>
        );
    }
};

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    editProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, editProfile })(EditProfile);
