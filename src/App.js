import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";

function App() {
  const [courses, setCourses] = useState(null);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3004/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const name = useRef(null);
  const email = useRef(null);
  const mobile = useRef(null);
  const course = useRef(null);
  const qualification = useRef(null);

  const saveUserData = () => {
    let newEnquiry = {
      name: name.current.value,
      email: email.current.value,
      mobile: mobile.current.value,
      course: course.current.value,
      qualification: qualification.current.value,
    };
    axios
      .post("http://localhost:3004/enquiries", newEnquiry)
      .then((response) => console.log(response));
  };

  return (
    <div className="App">
      <h1>Courses List</h1>
      <Link to="/allInquires">Goto All Inquiries</Link>
      {courses &&
        courses.map((i) => (
          <section className="blog-area-view">
            <section className="blog-area-view-text">
              <h2 className="title">{i.course_title}</h2>
              <p className="desc">{i.course_description}</p>
              <p className="desc">{i.duration}</p>
              <p className="desc">{i.tuition_fee}</p>
              <p className="author">- {i.instructor}</p>
              <button
                onClick={() => {
                  setForm(true);
                  setSel(i.course_title);
                }}
              >
                Enquire
              </button>
            </section>
            <img
              className="image-preview-view"
              src={i.image_link}
              alt={i.course_title}
            />
          </section>
        ))}

      {form && (
        <section className="pop-registration">
          <section className="user-registration">
            <form action="#">
              <h1>Inquiry Form</h1>
              <div>
                <label htmlFor="">Name</label>
                <input
                  ref={name}
                  type="text"
                  id="fullName"
                  placeholder="Enter FullName"
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  ref={email}
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label htmlFor="">Mobile</label>
                <input
                  ref={mobile}
                  type="text"
                  id="mobile"
                  placeholder="Enter Mobile"
                />
              </div>
              <div>
                <label htmlFor="">Course</label>
                <select
                  id="course"
                  name="course"
                  placeholder="Select a Course"
                  ref={course}
                >
                  {courses &&
                    courses.map((i) => (
                      <option
                        key={i.course_title}
                        value={i.course_title}
                        selected={sel === i.course_title}
                      >
                        {i.course_title}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Qualification</label>
                <input
                  ref={qualification}
                  type="text"
                  id="qualification"
                  placeholder="Enter Your Qualification"
                />
              </div>
              <div>
                <button
                  onClick={() => {
                    saveUserData();
                    setForm(false);
                  }}
                  type="button"
                  id="save"
                  className="btn btn-success"
                >
                  Save
                </button>
                <button
                  onClick={() => setForm(false)}
                  type="button"
                  className="cancel btn btn-danger"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </section>
      )}
    </div>
  );
}

export default App;
