import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as courseAction from '../../action/CourseAction';
import CourseList from './CourseList';



export class CourseListContainer extends React.Component {

    constructor() {
        super();

        this.state = { selectedCourseId: undefined };

        this.handleAddCourse = this.handleAddCourse.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);
    }


    componentDidMount() {
        this.props.action.getCoursesAction()
            .catch(error => {
                toastr.error(error);
            });
    }



    handleAddCourse() {
        this.props.history.push('/course');
    }

    handleRowSelect(row, isSelected) {
        if (isSelected) {
            this.setState({ selectedCourseId: row.id });
        }
    }



    render() {
        const { courses } = this.props;

        if (!courses) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col">
                        <h1>Courses</h1>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleAddCourse}
                            >
                                <i className="fa fa-plus" aria-hidden="true" /> New
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <CourseList courses={courses} handleRowSelect={this.handleRowSelect} />
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    courses: state.coursesReducer.courses
});



const mapDispatchToProps = dispatch => ({
    action: bindActionCreators(courseAction, dispatch)

});



CourseListContainer.propTypes = {
    courses: PropTypes.array,
    action: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};



export default connect(mapStateToProps, mapDispatchToProps)(CourseListContainer);
