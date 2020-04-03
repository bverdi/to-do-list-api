const getUserInfo = (json) => {
  const user = {};
  if (json.elements) {
    if (json.elements[0].elements) {
      if (json.elements[0].elements[0].name) {
        if (json.elements[0].elements[0].name == 'get_user') {
          if (json.elements[0].elements[0].elements) {
            if (json.elements[0].elements[0].elements[0].name) {
              if (json.elements[0].elements[0].elements[0].name == 'user') {
                for (let i = 0; i < json.elements[0].elements[0].elements[0].elements.length; i++) {
                  const element = json.elements[0].elements[0].elements[0].elements[i];
                  if (element.elements)
                    user[element.name] = element.elements[0].text;
                }
              }
            }
          }
        }
      }
    }
  }
  return user;
};

const getCourseInfo = (json) => {
  const course = {};
  if (json.elements) {
    if (json.elements[0].elements) {
      if (json.elements[0].elements[0].name) {
        if (json.elements[0].elements[0].name == 'get_course') {
          if (json.elements[0].elements[0].elements) {
            if (json.elements[0].elements[0].elements[0].name) {
              if (json.elements[0].elements[0].elements[0].name == 'course') {
                for (let i = 0; i < json.elements[0].elements[0].elements[0].elements.length; i++) {
                  const element = json.elements[0].elements[0].elements[0].elements[i];
                  if (element.elements)
                    course[element.name] = element.elements[0].text;
                }
              }
            }
          }
        }
      }
    }
  }
  return course;
};

const getCourseInfoFail = (json) => {
  const course = {};
  if (json.elements) {
    if (json.elements[0].elements) {
      if (json.elements[0].elements[0].name) {
        if (json.elements[0].elements[0].name == 'get_course') {
          if (json.elements[0].elements[0].elements) {
            if (json.elements[0].elements[0].elements[0].name) {
              if (json.elements[0].elements[0].elements[0].name) {
                for (let i = 0; i < json.elements[0].elements[0].elements[0].elements.length; i++) {
                  const element = json.elements[0].elements[0].elements[0].elements[i];
                  if (element.elements)
                    course[element.name] = element.elements[0].text;
                }
              }
            }
          }
        }
      }
    }
  }
  return course;
};

const getResponse = (json) => {
  const response = {};
  if (json.elements) {
    if (json.elements[0].elements) {
      if (json.elements[0].elements[0].elements) {
        if (json.elements[0].elements[0].elements[0].name) {
          if (json.elements[0].elements[0].elements[0].name) {
            for (let i = 0; i < json.elements[0].elements[0].elements.length; i++) {
              const element = json.elements[0].elements[0].elements[i];
              if (element.elements)
                response[element.name] = element.elements[0].text;
            }
          }
        }
      }
    }
  }
  return response;
};

module.exports = {
  getUserInfo,
  getCourseInfo,
  getCourseInfoFail,
  getResponse
};