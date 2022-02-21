import React,{Fragment, useState} from 'react';
import { useHistory  } from 'react-router-dom';
import axios from "axios";

function logIn() {

const [name, setName] = useState("");
const [grade, setGrade] = useState("");
const [isparent, setIsparent] = useState("");
const [timezone, setTimezone] = useState("");
const [email, setemail] = useState("");
const [phone, setPhone] = useState("");
const [country_code, setCountry_code] = useState("");

///////////errr
const [nameErr, setNameErr] = useState("");
const [emailErr, setEmailErr] = useState("");
const [phoneErr, setPhoneErr] = useState("");
const history  = useHistory ();
// console.log(history);

const validateForm = () => {
    let formIsValid = true;
    
    if (name === "" || name === null) {
      formIsValid = false;
      setNameErr("* this field is require.");
    }
    if (email === "" || email === null || /\s\s+/g.test(email)) {
        formIsValid = false;
        setEmailErr("* this field is require.");
    }
      if (phone === "" || phone === null || /\s\s+/g.test(phone)) {
        formIsValid = false;
        setPhoneErr("* this field is require.");
    }
    
    return formIsValid;
  };

////////////select the Contry code
const countryList = [
  { name: 'USA', country_code: '+1' },
  { name: 'INDIA', country_code: '+91' },
  { name: 'UK', country_code: '+44' }
]

////////Register student 
async function updateStudentData() {
    var detailsUpdate = {
        email: email,
        name: name,
        grade: grade,
        timezone: timezone,
        country_code: country_code,
        phone: phone,
        isparent: isparent,
    };

    var formBody = [];
    for (var property in detailsUpdate) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(detailsUpdate[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    axios({
        method: 'post',
        url: 'https://her-shreersc-express-server.herokuapp.com/v1/admin/registerStudent',
        data: formBody
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

}

//  //////////////////////selecte Timezone
 const timeZoneHandele = () => {
    // console.log("msg");
    var selectH = false;
    var selectE = false;
    var selectA = false;
    if (timezone === "( UTC - 5 ) Eastern Standard Time") {
      selectE = true;
    }
    if (timezone === "UTC Western European Time") {
        selectH = true;
      }
      if (timezone === "( UTC + 5:30 ) Indian Standard Time") {
        selectA = true;
      }
      return (
        <>
          <option selected={selectE} value="( UTC - 5 ) Eastern Standard Time">( UTC - 5 ) Eastern Standard Time</option>
          <option selected={selectH} value="UTC Western European Time">UTC Western European Time</option>
          <option selected={selectA} value="( UTC + 5:30 ) Indian Standard Timee">( UTC + 5:30 ) Indian Standard Timee</option>
        </>
      )
    }

    //  //////////////////////selecte class
 const ClassHandler = () => {
    var selectH = false;
    var selectE = false;
    var selectA = false;
    if (isparent === "Hindi Language class") {
      selectE = true;
    }
    if (isparent === "Math") {
        selectH = true;
      }
      if (isparent === "Computer fundamental") {
        selectA = true;
      }
      return (
        <>
          <option selected={selectE} value="Hindi Language class">Hindi Language class</option>
          <option selected={selectH} value="Math">Math/Science</option>
          <option selected={selectA} value="Computer fundamental">Computer fundamental</option>
        </>
      )
}

const gradeHandele = () => {
    var selectH = false;
    var selectE = false;
    var selectA = false;
    if (grade === "+A") {
      selectE = true;
    }
    if (grade === "+B") {
        selectH = true;
      }
      if (grade === "+C") {
        selectA = true;
      }
      return (
        <>
          <option selected={selectE} value="+A">+A</option>
          <option selected={selectH} value="+B">+B</option>
          <option selected={selectA} value="+C">+C</option>
        </>
      )
}
///////////////////selecte contry name  
  const Country_List = countryList.map((country, i) => {
    var selectedContry = false;
    if (country_code !== "" && country_code !== null && country_code === country.country_code) {
      selectedContry = true;
    }
      return (
        <>
         <option selected={selectedContry} value={country.country_code}>{country.country_code}</option>
        </>
      )
  })

////////////////////Submit form data
const handlesubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
        updateStudentData({
            email,
            name,
            grade,
            timezone,
            country_code,
            phone,
            isparent,
          });
          history.push("/register");
    
    }
  };

  return <>
        <Fragment>
        <div class="container pt-3">
					<section className="container section">
								<div className="col-12 col-md-10 col-lg-6 mx-auto">
									<div className="card">
                        <form onSubmit={handlesubmit} className="needs-validation" name="Form" noValidate="" method='post' enctype="multipart/form-data">
                        <div className="card-body">
                          <div class="col-md-12 text-left">
                          </div>
                          <div className="col-md-12"> 
                              <div className="form-group">
                                  <label>Full name<span style={{color:"red"}}>*</span></label>                                 
                                  <input type="name" onChange={(e)=> setName(e.target.value)} value={name}  placeholder="Enter name" className="form-control" id="name" name="name" />
                                  {/* <input onChange={(e)=> settitle(e.target.value)} type="username" value={Name} placeholder="Enter name" className="form-control" id="username" name="username" ="" /> */}
                                  <span style={{ fontSize: "12px", color: "red" }}>
                                  {!name && nameErr}
                                </span>
                              </div>
                              <div className="form-group">
                                  <label>email<span style={{color:"red"}}>*</span></label>                                 
                                  <input onChange={(e)=> setemail(e.target.value)} type="email" value={email} placeholder="email" className="form-control" id="email" name="email" />
                                  <span style={{ fontSize: "12px", color: "red" }}>
                                  {!email && emailErr}
                                </span>
                              </div>
                          </div>
                          <div className="col-md-12"> 
                              <div className="form-group">
                                  <label>grade<span style={{color:"red"}}>*</span></label>                                 
                                  <select
                                      onChange={(e)=> setGrade(e.target.value)}

                                      className="form-control"
                                      name="grade"
                                      id="grade"
                                      >
                                      <option value="">Select timezone</option>
                                          {gradeHandele()}
                                      </select>
                             </div>
                          </div>
                          {/* <div className="col-md-12"> 
                              <div className="form-group">
                                  <label>Date of Birth<span style={{color:"red"}}>*</span></label>                                 
                                  <input type="date" id="birthday" name="birthday"></input>
                             </div>
                          </div> */}
                          
                          <div className="col-md-12"> 
                              <div className="form-group">
                                <button class="btn" type="button">
                                <select
                                  onChange={(e) => setCountry_code(e.target.value)}
                                  // value={countryList}
                                  className="form-control"
                                  name="country_code"
                                  id="country_code"
                                >
                                  <option value="">+1</option>
                                  {Country_List}
                                </select>
                                </button>
                                  <input onChange={(e)=> setPhone(e.target.value)} value={phone} type="number"  placeholder="Enter phone" className="form-control" id="phone" name="phone" />
                                  <span style={{ fontSize: "12px", color: "red" }}>
                                    {!phone && phoneErr}
                                  </span>
                              </div>
                          </div>
                          <div className="col-md-12"> 
                              <div className="form-group">
                                  <label>timezone</label>                                 
                                  {/* <input type="timezone" onChange={(e)=> setTimezone(e.target.value)} value={timezone} placeholder="Enter timezone" className="form-control" id="timezone" name="timezone" =""/> */}
                                      <select
                                      onChange={(e)=> setTimezone(e.target.value)}

                                      className="form-control"
                                      name="timezone"
                                      id="timezone"
                                      >
                                      <option value="">Select timezone</option>
                                          {timeZoneHandele()}
                                      </select>
                                  <div style={{color:"red",fontSize: "12px"}}></div>
                              </div>
                          </div>
                          <div className="col-md-12"> 
                              <div className="form-group">
                                  <label>Choose Class</label>                                 
                                  {/* <input type="timezone" onChange={(e)=> setTimezone(e.target.value)} value={timezone} placeholder="Enter timezone" className="form-control" id="timezone" name="timezone" =""/> */}
                                      <select
                                      onChange={(e)=> setIsparent(e.target.value)}

                                      className="form-control"
                                      name="isparent"
                                      id="isparent"
                                      >
                                      <option value="">Select class</option>
                                          {ClassHandler()}
                                      </select>

                                  <div style={{color:"red",fontSize: "12px"}}></div>
                              </div>
                          </div>
                            <button  type="submit" className="btn btn-primary" id="submitBtn">Register here</button>
                        </div>
                        </form>
                    </div>
                </div>
          </section>
        </div>
</Fragment>
  </>;
}

export default logIn;

