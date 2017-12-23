class LocalToken {

  /**
   * Save a token string in Local Storage
   *
   * @param {string} token
   */
  static saveLocalToken(token) {
    localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static getLocalToken() {
    let localToken = localStorage.getItem('token');

    if (localToken !== null) {
      return localToken;
    } else {
      return null;
    }
  };

  /**
   * Remove a token from Local Storage.
   *
   */
  static removeLocalToeken() {
    localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  }

}

export default LocalToken;
