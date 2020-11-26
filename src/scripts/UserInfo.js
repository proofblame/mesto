export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }
    getUserInfo() {
        const userData = {
            name: this._name.textContent,
            job: this._job.textContent
        }

        return userData;
    }

    setUserInfo(formData) {
        this._name.textContent = formData.name;
        this._job.textContent = formData.job;
    }
}