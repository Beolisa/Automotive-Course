'use strict'
//Class User đại diện cho thông tin của người dùng:
class User {
    constructor(
        firstname,
        lastname,
        username,
        password,
        pageSize = 10,
        category = "technology"
    ) {
        this.firstname = firstname
        this.lastname = lastname
        this.username = username
        this.password = password
        this.pageSize = pageSize
        this.category = category
    }
}


class Task {
    constructor(task, owner, isDone) {
        this.task = task
        this.owner = owner
        this.isDone = isDone
    }
}