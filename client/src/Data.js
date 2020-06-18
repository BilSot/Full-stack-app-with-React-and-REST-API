import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, {username: username, password: password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error("Internal error");
    }
  }

  async getCourses(){
    const response = await this.api('/courses', 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  async getCourse(id){
    const response = await this.api(`/courses/${id}`, 'GET', null, false, null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return {error: 404};
    }
    else if(response.status === 500){
      return {error:500};
    }
  }

  async createCourse(course, username, password){
    const response = await this.api("/courses", 'POST', course, true, {username: username, password: password});
    if (response.status === 201) {
      return response.json().then(data => {
        return data.courseId;
      });
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else if(response.status === 500){
      return 500;
    }
  }

  async updateCourse(course, username, password){
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {username: username, password: password});
    if(response.status === 204){
      return 204;
    }else if(response.status === 404){
      return 404;
    }else if(response.status === 400){
      return response.json().then(data => {
        return data.errors;
      });
    }else if(response.status === 500){
      return 500;
    }
  }

  async deleteCourse(course, username, password){
    const response = await this.api(`/courses/${course.id}`, 'DELETE', course, true, {username: username, password: password});
    if(response.status === 204){
      return 204;
    }else if(response.status === 404){
      return 404;
    }else if(response.status === 500){
      return 500;
    }
  }
}
